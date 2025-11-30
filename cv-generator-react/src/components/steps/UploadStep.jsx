// src/components/steps/UploadStep.jsx
import { useState } from "react";
import { Box, Typography, Button, Alert } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { Document, Packer, Paragraph, TextRun } from "docx";
import * as pdfjsLib from "pdfjs-dist";

function UploadStep({
  setPersonal,
  setContact,
  setSkills,
  setSummary,
  setLanguages,
  setLinks,
}) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError("");
    }
  };

  const extractTextFromPDF = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      text += textContent.items.map((item) => item.str).join(" ") + "\n";
    }
    return text;
  };

  const extractTextFromDOCX = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const doc = await Document.load(arrayBuffer);
    let text = "";
    doc.getBody().forEach((paragraph) => {
      if (paragraph instanceof Paragraph) {
        paragraph.getRuns().forEach((run) => {
          if (run instanceof TextRun) {
            text += run.getText();
          }
        });
        text += "\n";
      }
    });
    return text;
  };

  const parseCVText = (text) => {
    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line);

    // Simple parsing logic - this can be improved
    let personal = { fullName: "", jobTitle: "", photoUrl: "" };
    let contact = {
      email: "",
      phone: "",
      country: "",
      city: "",
      postal: "",
      address: "",
    };
    let summary = "";
    let skills = "";
    let languages = [];
    let links = [];
    let experience = [];
    let education = [];

    let currentSection = "";

    for (let line of lines) {
      line = line.toLowerCase();

      if (line.includes("professional summary") || line.includes("summary")) {
        currentSection = "summary";
        continue;
      } else if (line.includes("experience") || line.includes("work")) {
        currentSection = "experience";
        continue;
      } else if (line.includes("education")) {
        currentSection = "education";
        continue;
      } else if (line.includes("skills")) {
        currentSection = "skills";
        continue;
      } else if (line.includes("languages")) {
        currentSection = "languages";
        continue;
      } else if (line.includes("contact") || line.includes("links")) {
        currentSection = "contact";
        continue;
      }

      if (currentSection === "summary") {
        summary += line + " ";
      } else if (currentSection === "skills") {
        skills += line + ", ";
      } else if (currentSection === "languages") {
        // Assume format: Language (Level)
        const match = line.match(/(.+)\s*\((.+)\)/);
        if (match) {
          languages.push({ name: match[1].trim(), level: match[2].trim() });
        }
      } else if (currentSection === "contact") {
        if (line.includes("@")) {
          contact.email = line;
        } else if (line.match(/\d/)) {
          contact.phone = line;
        } else if (line.includes("linkedin") || line.includes("github")) {
          links.push({ title: line.split(" ")[0], url: line });
        }
      } else if (!personal.fullName && line.split(" ").length <= 3) {
        personal.fullName = line;
      } else if (!personal.jobTitle && line.split(" ").length <= 5) {
        personal.jobTitle = line;
      }
    }

    // Clean up
    summary = summary.trim();
    skills = skills.replace(/, $/, "");

    return {
      personal,
      contact,
      summary,
      skills,
      languages: languages.map((l, idx) => ({ id: idx + 1, ...l })),
      links: links.map((l, idx) => ({
        id: idx + 1,
        title: l.title,
        url: l.url,
      })),
      experience,
      education,
    };
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setError("");

    try {
      let text = "";
      if (file.type === "application/pdf") {
        text = await extractTextFromPDF(file);
      } else if (
        file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        text = await extractTextFromDOCX(file);
      } else {
        throw new Error("Unsupported file type. Please upload PDF or DOCX.");
      }

      const parsedData = parseCVText(text);

      // Set the states
      setPersonal(parsedData.personal);
      setContact(parsedData.contact);
      setSummary(parsedData.summary);
      setSkills(parsedData.skills);
      setLanguages(
        parsedData.languages.length > 0
          ? parsedData.languages
          : [{ id: 1, name: "", level: "B2 - Upper intermediate" }]
      );
      setLinks(
        parsedData.links.length > 0
          ? parsedData.links
          : [{ id: 1, title: "", url: "" }]
      );
      // For experience and education, keep defaults or add parsed if any

      alert("CV uploaded and parsed successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="card">
      <Typography variant="h6" sx={{ mb: 1 }}>
        Upload Existing CV
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Upload a PDF or DOCX file to auto-fill your CV details.
      </Typography>
      <input
        type="file"
        accept=".pdf,.docx"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="cv-upload"
      />
      <label htmlFor="cv-upload">
        <Button
          variant="outlined"
          component="span"
          startIcon={<CloudUpload />}
          fullWidth
        >
          Choose File
        </Button>
      </label>
      {file && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          Selected: {file.name}
        </Typography>
      )}
      <Button
        variant="contained"
        onClick={handleUpload}
        disabled={!file || loading}
        sx={{ mt: 2 }}
        fullWidth
      >
        {loading ? "Processing..." : "Upload and Parse"}
      </Button>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
}

export default UploadStep;

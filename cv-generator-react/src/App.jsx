// src/App.jsx
import { useState } from "react";
import {
  Box,
  Drawer,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Tabs,
  Tab,
  Switch,
  Divider,
} from "@mui/material";
import {
  Person,
  ContactPage,
  Work,
  Star,
  School,
  Notes,
  Translate,
  Link as LinkIcon,
  PictureAsPdf,
} from "@mui/icons-material";

import HeaderStep from "./components/steps/HeaderStep";
import ContactStep from "./components/steps/ContactStep";
import ExperienceStep from "./components/steps/ExperienceStep";
import EducationStep from "./components/steps/EducationStep";
import SkillsStep from "./components/steps/SkillsStep";
import SummaryStep from "./components/steps/SummaryStep";
import LanguagesStep from "./components/steps/LanguagesStep";
import LinksStep from "./components/steps/LinksStep";

import ClassicTemplate from "./components/preview/ClassicTemplate";
import BlueTemplate from "./components/preview/BlueTemplate";
import SplitTemplate from "./components/preview/SplitTemplate";

const steps = [
  { id: 1, label: "Header", icon: <Person fontSize="small" /> },
  { id: 2, label: "Contact", icon: <ContactPage fontSize="small" /> },
  { id: 3, label: "Experience", icon: <Work fontSize="small" /> },
  { id: 4, label: "Education", icon: <School fontSize="small" /> },
  { id: 5, label: "Skills", icon: <Star fontSize="small" /> },
  { id: 6, label: "Summary", icon: <Notes fontSize="small" /> },
  { id: 7, label: "Languages", icon: <Translate fontSize="small" /> },
  { id: 8, label: "Links", icon: <LinkIcon fontSize="small" /> },
];

const languageLevels = [
  "Native",
  "C2 - Proficient",
  "C1 - Advanced",
  "B2 - Upper intermediate",
  "B1 - Intermediate",
  "A2 - Elementary",
  "A1 - Beginner",
];

const templates = [
  { id: "classic", name: "Classic" },
  { id: "blue", name: "Blue sidebar" },
  { id: "split", name: "Summary left" },
];

function App() {
  const [step, setStep] = useState(1);

  const [personal, setPersonal] = useState({
    fullName: "",
    jobTitle: "",
    photoUrl: "",
  });

  const [contact, setContact] = useState({
    email: "",
    phone: "",
    country: "",
    city: "",
    postal: "",
    address: "",
  });

  const [experience, setExperience] = useState([
    {
      id: 1,
      title: "",
      company: "",
      location: "",
      start: "",
      end: "",
      desc: "",
    },
  ]);

  const [education, setEducation] = useState([
    {
      id: 1,
      degree: "",
      school: "",
      location: "",
      start: "",
      end: "",
      desc: "",
    },
  ]);

  const [skills, setSkills] = useState("");
  const [summary, setSummary] = useState("");
  const [languages, setLanguages] = useState([
    { id: 1, name: "", level: "B2 - Upper intermediate" },
  ]);
  const [links, setLinks] = useState([{ id: 1, title: "", url: "" }]);

  const [templateTab, setTemplateTab] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState("classic");
  const [withPhoto, setWithPhoto] = useState(false);

  const maxStep = steps.length;

  /* ---------- derived data ---------- */

  const fullName = personal.fullName.trim();
  const jobTitle = personal.jobTitle.trim();

  const headerLine = [
    contact.postal && contact.city
      ? `${contact.postal} ${contact.city}`
      : contact.city,
    contact.country,
    contact.email,
    contact.phone,
  ]
    .filter(Boolean)
    .join(" • ");

  const expList = experience.filter((e) => e.title || e.company || e.desc);
  const eduList = education.filter((e) => e.degree || e.school || e.desc);
  const langList = languages.filter((l) => l.name);
  const linkList = links.filter((l) => l.title || l.url);
  const skillList = skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  /* ---------- helpers for list state ---------- */

  const updateListItem = (setList, id, field, value) => {
    setList((prev) =>
      prev.map((i) => (i.id === id ? { ...i, [field]: value } : i))
    );
  };

  const addListItem = (setList, blank) => {
    setList((prev) => [
      ...prev,
      { ...blank, id: prev.length ? prev[prev.length - 1].id + 1 : 1 },
    ]);
  };

  const removeListItem = (setList, id) => {
    setList((prev) => prev.filter((i) => i.id !== id));
  };

  const handlePrint = () => window.print();

  /* ---------- step content ---------- */

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <HeaderStep personal={personal} setPersonal={setPersonal} />;
      case 2:
        return <ContactStep contact={contact} setContact={setContact} />;
      case 3:
        return (
          <ExperienceStep
            experience={experience}
            setExperience={setExperience}
            updateListItem={updateListItem}
            addListItem={addListItem}
            removeListItem={removeListItem}
          />
        );
      case 4:
        return (
          <EducationStep
            education={education}
            setEducation={setEducation}
            updateListItem={updateListItem}
            addListItem={addListItem}
            removeListItem={removeListItem}
          />
        );
      case 5:
        return <SkillsStep skills={skills} setSkills={setSkills} />;
      case 6:
        return <SummaryStep summary={summary} setSummary={setSummary} />;
      case 7:
        return (
          <LanguagesStep
            languages={languages}
            setLanguages={setLanguages}
            updateListItem={updateListItem}
            addListItem={addListItem}
            removeListItem={removeListItem}
            languageLevels={languageLevels}
          />
        );
      case 8:
        return (
          <LinksStep
            links={links}
            setLinks={setLinks}
            updateListItem={updateListItem}
            addListItem={addListItem}
            removeListItem={removeListItem}
          />
        );
      default:
        return null;
    }
  };

  /* ---------- preview ---------- */

  const renderPreview = () => {
    const templateProps = {
      fullName,
      jobTitle,
      headerLine,
      summary,
      expList,
      eduList,
      skillList,
      langList,
      linkList,
    };

    if (selectedTemplate === "blue") {
      return (
        <BlueTemplate
          {...templateProps}
          withPhoto={withPhoto}
          photoUrl={personal.photoUrl}
          contact={contact}
        />
      );
    }
    if (selectedTemplate === "split") {
      return <SplitTemplate {...templateProps} />;
    }
    return <ClassicTemplate {...templateProps} />;
  };

  /* ---------- layout ---------- */

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* LEFT DRAWER: steps */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            borderRight: "none",
            background: "#fafafa",
            p: 2,
          },
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
          Your resume
        </Typography>
        <Stepper
          orientation="vertical"
          activeStep={step - 1}
          sx={{ flexGrow: 1 }}
        >
          {steps.map((s) => (
            <Step key={s.id} onClick={() => setStep(s.id)}>
              <StepLabel icon={s.icon}>{s.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Drawer>

      {/* CENTER: form + templates */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* top nav buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Button
            variant="outlined"
            size="small"
            disabled={step === 1}
            onClick={() => setStep((s) => Math.max(1, s - 1))}
          >
            Back
          </Button>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              size="small"
              startIcon={<PictureAsPdf fontSize="small" />}
              variant="outlined"
              onClick={handlePrint}
            >
              PDF
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={() => setStep((s) => (s < maxStep ? s + 1 : maxStep))}
            >
              Next
            </Button>
          </Box>
        </Box>

        {renderStepContent()}

        {/* templates card */}
        <Box className="card" sx={{ mt: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Templates
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="caption">With photo</Typography>
              <Switch
                size="small"
                checked={withPhoto}
                onChange={(e) => setWithPhoto(e.target.checked)}
              />
            </Box>
          </Box>
          <Tabs
            value={templateTab}
            onChange={(_, v) => setTemplateTab(v)}
            textColor="primary"
            indicatorColor="primary"
            sx={{ minHeight: 32, "& .MuiTab-root": { minHeight: 32 } }}
          >
            <Tab label="Styles" />
            <Tab label="Fonts" disabled />
            <Tab label="Colors" disabled />
          </Tabs>
          <Divider sx={{ my: 1 }} />
          {templateTab === 0 && (
            <Box sx={{ display: "flex", gap: 1.5, overflowX: "auto" }}>
              {templates.map((tpl) => (
                <Box
                  key={tpl.id}
                  sx={{
                    minWidth: 120,
                    borderRadius: 2,
                    border:
                      selectedTemplate === tpl.id
                        ? "2px solid #2563eb"
                        : "1px solid #e5e7eb",
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedTemplate(tpl.id)}
                >
                  <Box
                    sx={{
                      height: 80,
                      borderBottom: "1px solid #e5e7eb",
                      background:
                        tpl.id === "blue"
                          ? "linear-gradient(to right,#1f2937 30%,#ffffff 30%)"
                          : "#ffffff",
                    }}
                  />
                  <Box sx={{ p: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      {tpl.name}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>

      {/* RIGHT: preview */}
      <Box
        sx={{
          width: 430,
          p: 2,
          bgcolor: "#e5e5e5",
          display: { xs: "none", md: "block" },
          overflowY: "auto",
        }}
      >
        <div id="cvPreview" className="preview-wrapper">
          {renderPreview()}
        </div>
      </Box>
    </Box>
  );
}

export default App;

// ✅ HeaderStep.jsx
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LabeledText from "../common/LabeledText";

export default function HeaderStep({ personal, setPersonal }) {
  return (
    <Box className="card">
      <Typography variant="h6" sx={{ mb: 1 }}>
        Header
      </Typography>

      <Box className="grid-2">
        <LabeledText
          label="Full name"
          value={personal.fullName}
          onChange={(v) => setPersonal((p) => ({ ...p, fullName: v }))}
        />

        <LabeledText
          label="Job title"
          value={personal.jobTitle}
          onChange={(v) => setPersonal((p) => ({ ...p, jobTitle: v }))}
        />

        <LabeledText
          label="Photo URL (optional)"
          value={personal.photoUrl}
          onChange={(v) => setPersonal((p) => ({ ...p, photoUrl: v }))}
          fullWidth
        />
      </Box>
    </Box>
  );
}

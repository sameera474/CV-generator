// src/components/steps/SummaryStep.jsx
import { Box, Typography, TextField } from "@mui/material";

function SummaryStep({ summary, setSummary }) {
  return (
    <Box className="card">
      <Typography variant="h6" sx={{ mb: 1 }}>
        Professional summary
      </Typography>
      <TextField
        label="Summary"
        multiline
        minRows={6}
        size="small"
        fullWidth
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
    </Box>
  );
}

export default SummaryStep;

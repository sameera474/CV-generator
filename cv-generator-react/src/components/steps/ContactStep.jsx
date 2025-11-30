// src/components/steps/ContactStep.jsx
import { Box, Typography } from "@mui/material";
import LabeledText from "../common/LabeledText";

function ContactStep({ contact, setContact }) {
  return (
    <Box className="card">
      <Typography variant="h6" sx={{ mb: 1 }}>
        Contact information
      </Typography>
      <Box className="grid-2">
        <LabeledText
          label="Email"
          value={contact.email}
          onChange={(v) => setContact((c) => ({ ...c, email: v }))}
        />
        <LabeledText
          label="Telephone"
          value={contact.phone}
          onChange={(v) => setContact((c) => ({ ...c, phone: v }))}
        />
        <LabeledText
          label="Country"
          value={contact.country}
          onChange={(v) => setContact((c) => ({ ...c, country: v }))}
        />
        <LabeledText
          label="City"
          value={contact.city}
          onChange={(v) => setContact((c) => ({ ...c, city: v }))}
        />
        <LabeledText
          label="Address"
          value={contact.address}
          onChange={(v) => setContact((c) => ({ ...c, address: v }))}
          fullWidth
        />
        <LabeledText
          label="Postal code"
          value={contact.postal}
          onChange={(v) => setContact((c) => ({ ...c, postal: v }))}
        />
      </Box>
    </Box>
  );
}

export default ContactStep;

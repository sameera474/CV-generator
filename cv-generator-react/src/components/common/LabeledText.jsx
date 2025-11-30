// ✅ LabeledText.jsx
import TextField from "@mui/material/TextField";

export default function LabeledText({ label, value, onChange, ...rest }) {
  return (
    <TextField
      label={label}
      size="small"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    />
  );
}

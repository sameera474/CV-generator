// src/components/steps/LanguagesStep.jsx
import {
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { Delete, Add } from "@mui/icons-material";
import LabeledText from "../common/LabeledText";

function LanguagesStep({
  languages,
  setLanguages,
  updateListItem,
  addListItem,
  removeListItem,
  languageLevels,
}) {
  return (
    <Box className="card">
      <Typography variant="h6" sx={{ mb: 1 }}>
        Languages
      </Typography>
      {languages.map((l) => (
        <Box key={l.id} className="item-panel">
          <Box className="item-header">
            <Typography variant="subtitle1">{l.name || "Language"}</Typography>
            {languages.length > 1 && (
              <IconButton
                size="small"
                onClick={() => removeListItem(setLanguages, l.id)}
              >
                <Delete fontSize="small" />
              </IconButton>
            )}
          </Box>
          <Box className="grid-2">
            <LabeledText
              label="Language"
              value={l.name}
              onChange={(v) => updateListItem(setLanguages, l.id, "name", v)}
            />
            <TextField
              label="Level"
              size="small"
              select
              value={l.level}
              onChange={(e) =>
                updateListItem(setLanguages, l.id, "level", e.target.value)
              }
            >
              {languageLevels.map((lvl) => (
                <MenuItem key={lvl} value={lvl}>
                  {lvl}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>
      ))}
      <Button
        startIcon={<Add />}
        variant="outlined"
        fullWidth
        sx={{ mt: 1 }}
        onClick={() =>
          addListItem(setLanguages, {
            name: "",
            level: "B2 - Upper intermediate",
          })
        }
      >
        Add language
      </Button>
    </Box>
  );
}

export default LanguagesStep;

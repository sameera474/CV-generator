// src/components/steps/ExperienceStep.jsx
import { Box, Typography, IconButton, TextField, Button } from "@mui/material";
import { Delete, Add } from "@mui/icons-material";
import LabeledText from "../common/LabeledText";

function ExperienceStep({
  experience,
  setExperience,
  updateListItem,
  addListItem,
  removeListItem,
}) {
  return (
    <Box className="card">
      <Typography variant="h6" sx={{ mb: 1 }}>
        Professional experience
      </Typography>
      {experience.map((e) => (
        <Box key={e.id} className="item-panel">
          <Box className="item-header">
            <Typography variant="subtitle1">
              {e.title || "Job title"}
            </Typography>
            {experience.length > 1 && (
              <IconButton
                size="small"
                onClick={() => removeListItem(setExperience, e.id)}
              >
                <Delete fontSize="small" />
              </IconButton>
            )}
          </Box>
          <Box className="grid-2">
            <LabeledText
              label="Job title"
              value={e.title}
              onChange={(v) => updateListItem(setExperience, e.id, "title", v)}
            />
            <LabeledText
              label="Company"
              value={e.company}
              onChange={(v) =>
                updateListItem(setExperience, e.id, "company", v)
              }
            />
            <LabeledText
              label="Start"
              value={e.start}
              onChange={(v) => updateListItem(setExperience, e.id, "start", v)}
            />
            <LabeledText
              label="End"
              value={e.end}
              onChange={(v) => updateListItem(setExperience, e.id, "end", v)}
            />
            <LabeledText
              label="Location"
              value={e.location}
              onChange={(v) =>
                updateListItem(setExperience, e.id, "location", v)
              }
              fullWidth
            />
          </Box>
          <TextField
            label="Description (each bullet on new line)"
            multiline
            minRows={4}
            size="small"
            fullWidth
            sx={{ mt: 1 }}
            value={e.desc}
            onChange={(ev) =>
              updateListItem(setExperience, e.id, "desc", ev.target.value)
            }
          />
        </Box>
      ))}
      <Button
        startIcon={<Add />}
        variant="outlined"
        fullWidth
        sx={{ mt: 1 }}
        onClick={() =>
          addListItem(setExperience, {
            title: "",
            company: "",
            location: "",
            start: "",
            end: "",
            desc: "",
          })
        }
      >
        Add experience
      </Button>
    </Box>
  );
}

export default ExperienceStep;

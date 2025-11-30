// src/components/steps/EducationStep.jsx
import { Box, Typography, IconButton, TextField, Button } from "@mui/material";
import { Delete, Add } from "@mui/icons-material";
import LabeledText from "../common/LabeledText";

function EducationStep({
  education,
  setEducation,
  updateListItem,
  addListItem,
  removeListItem,
}) {
  return (
    <Box className="card">
      <Typography variant="h6" sx={{ mb: 1 }}>
        Education
      </Typography>
      {education.map((e) => (
        <Box key={e.id} className="item-panel">
          <Box className="item-header">
            <Typography variant="subtitle1">
              {e.degree || "Degree / Program"}
            </Typography>
            {education.length > 1 && (
              <IconButton
                size="small"
                onClick={() => removeListItem(setEducation, e.id)}
              >
                <Delete fontSize="small" />
              </IconButton>
            )}
          </Box>
          <Box className="grid-2">
            <LabeledText
              label="Degree / Program"
              value={e.degree}
              onChange={(v) => updateListItem(setEducation, e.id, "degree", v)}
            />
            <LabeledText
              label="Institution"
              value={e.school}
              onChange={(v) => updateListItem(setEducation, e.id, "school", v)}
            />
            <LabeledText
              label="Start"
              value={e.start}
              onChange={(v) => updateListItem(setEducation, e.id, "start", v)}
            />
            <LabeledText
              label="End"
              value={e.end}
              onChange={(v) => updateListItem(setEducation, e.id, "end", v)}
            />
            <LabeledText
              label="Location"
              value={e.location}
              onChange={(v) =>
                updateListItem(setEducation, e.id, "location", v)
              }
              fullWidth
            />
          </Box>
          <TextField
            label="Description"
            multiline
            minRows={3}
            size="small"
            fullWidth
            sx={{ mt: 1 }}
            value={e.desc}
            onChange={(ev) =>
              updateListItem(setEducation, e.id, "desc", ev.target.value)
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
          addListItem(setEducation, {
            degree: "",
            school: "",
            location: "",
            start: "",
            end: "",
            desc: "",
          })
        }
      >
        Add education
      </Button>
    </Box>
  );
}

export default EducationStep;

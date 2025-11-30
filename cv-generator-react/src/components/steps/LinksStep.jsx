// src/components/steps/LinksStep.jsx
import { Box, Typography, IconButton, Button } from "@mui/material";
import { Delete, Add } from "@mui/icons-material";
import LabeledText from "../common/LabeledText";

function LinksStep({
  links,
  setLinks,
  updateListItem,
  addListItem,
  removeListItem,
}) {
  return (
    <Box className="card">
      <Typography variant="h6" sx={{ mb: 1 }}>
        Links
      </Typography>
      {links.map((l) => (
        <Box key={l.id} className="item-panel">
          <Box className="item-header">
            <Typography variant="subtitle1">{l.title || "Link"}</Typography>
            {links.length > 1 && (
              <IconButton
                size="small"
                onClick={() => removeListItem(setLinks, l.id)}
              >
                <Delete fontSize="small" />
              </IconButton>
            )}
          </Box>
          <Box className="grid-2">
            <LabeledText
              label="Title"
              value={l.title}
              onChange={(v) => updateListItem(setLinks, l.id, "title", v)}
            />
            <LabeledText
              label="URL"
              value={l.url}
              onChange={(v) => updateListItem(setLinks, l.id, "url", v)}
            />
          </Box>
        </Box>
      ))}
      <Button
        startIcon={<Add />}
        variant="outlined"
        fullWidth
        sx={{ mt: 1 }}
        onClick={() =>
          addListItem(setLinks, {
            title: "",
            url: "",
          })
        }
      >
        Add link
      </Button>
    </Box>
  );
}

export default LinksStep;

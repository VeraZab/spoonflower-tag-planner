import { useState } from "react";
import { Box, Paper, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

export function CopyPasteText({
  text,
  tooltipText,
}: {
  text: string;
  tooltipText?: string;
}) {
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        padding: 2,
        borderRadius: "4px",
        justifyContent: "space-between",
        backgroundColor: "action.hover",
      }}
    >
      <Box sx={{ mr: 1 }}>{text}</Box>
      <Tooltip title={tooltipText || "Copy to Clipboard"}>
        {copiedToClipboard ? (
          <CheckIcon />
        ) : (
          <ContentCopyIcon
            sx={{ cursor: "pointer" }}
            onClick={() => {
              if (text.trim() !== "") {
                navigator.clipboard.writeText(text).then(() => {
                  setCopiedToClipboard(true);
                  setTimeout(() => {
                    setCopiedToClipboard(false);
                  }, 2000);
                });
              }
            }}
          />
        )}
      </Tooltip>
    </Paper>
  );
}

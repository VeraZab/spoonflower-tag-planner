import { useState } from "react";
import { Box, Button, Typography, Sheet, Tooltip } from "@mui/joy";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

import { Keyword } from "./Keyword.tsx";

import "./App.css";
import { Check } from "@mui/icons-material";

function App() {
  const initialKeywords = new Array(13).fill("");
  const [keywords, setKeywords] = useState<string[]>(initialKeywords);
  const [finalKeywordString, setFinalKeywordString] = useState("");
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  const tempKeywordString = keywords.filter((k) => k.trim() !== "").join(", ");
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "900px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography level="h1" sx={{ m: 3, mb: 4 }}>
          Spoonflower Keyword Planner
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ mr: 6 }}>
            {keywords.slice(0, 7).map((k, i) => (
              <Keyword
                key={i}
                keyword={k}
                keywords={keywords}
                keywordIndex={i}
                setKeywords={setKeywords}
              />
            ))}
          </Box>
          <Box>
            {keywords.slice(7).map((k, i) => (
              <Keyword
                key={i + 6}
                keyword={k}
                keywords={keywords}
                keywordIndex={i + 7}
                setKeywords={setKeywords}
              />
            ))}
          </Box>
        </Box>
        <Box sx={{ m: 4 }}>
          <Button
            variant="outlined"
            sx={{ mr: 2 }}
            onClick={() => {
              setKeywords([...initialKeywords]);
              setFinalKeywordString("");
            }}
          >
            Reset
          </Button>
          <Button
            disabled={
              !keywords.some((k) => Boolean(k)) &&
              tempKeywordString.length <= 284
            }
            onClick={() => {
              setFinalKeywordString(tempKeywordString);
            }}
          >
            Done!
          </Button>
        </Box>
        {finalKeywordString && (
          <Sheet
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              width: "100%",
              background: theme.palette.neutral[200],
              padding: 2,
              borderRadius: "4px",
              justifyContent: "space-between",
            })}
          >
            <Box sx={{ mr: 1 }}>{finalKeywordString}</Box>
            <Tooltip title="copy to clipboard">
              {copiedToClipboard ? (
                <CheckIcon />
              ) : (
                <ContentCopyIcon
                  onClick={() => {
                    if (finalKeywordString.trim() !== "") {
                      navigator.clipboard
                        .writeText(finalKeywordString)
                        .then(() => {
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
          </Sheet>
        )}
      </Box>
    </Box>
  );
}

export default App;

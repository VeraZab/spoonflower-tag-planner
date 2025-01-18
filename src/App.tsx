import "./App.css";
import { useState, ChangeEvent } from "react";
import {
  Box,
  Button,
  Typography,
  Sheet,
  Tooltip,
  useTheme,
  Textarea,
} from "@mui/joy";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

import { Keyword } from "./Keyword.tsx";

function App() {
  const theme = useTheme();
  const initialKeywords = new Array(13).fill("");
  const [keywords, setKeywords] = useState<string[]>(initialKeywords);
  const [finalKeywordString, setFinalKeywordString] = useState("");
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [wordSoup, setWordSoup] = useState("");

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
        <Typography level="h2" sx={{ m: 3, mb: 4, textAlign: "center" }}>
          Spoonflower Tags Planner
        </Typography>
        <Box sx={{ width: "95%", m: 2 }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", mt: 1, mb: 1 }}>
            Paste your keyword ideas soup here
          </Typography>
          <Textarea
            value={wordSoup}
            onChange={(e: ChangeEvent<HTMLAreaElement>) => {
              const value = e?.target.value;
              setWordSoup(value);
            }}
          />
          <Box></Box>
        </Box>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: "bold", mt: 1, mb: 1 }}>
            Plan your optimized tags here
          </Typography>
          <Box
            sx={{
              display: "flex",
              [theme.breakpoints.down("md")]: { flexDirection: "column" },
            }}
          >
            <Box sx={{ mr: 6, [theme.breakpoints.down("md")]: { mr: 0 } }}>
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
              width: "95%",
              background: theme.palette.neutral[200],
              padding: 2,
              borderRadius: "4px",
              justifyContent: "space-between",
              [theme.breakpoints.down("md")]: { width: "90%", mb: 6 },
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

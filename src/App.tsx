import "./App.css";
import { useState, ChangeEvent, useCallback, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Tooltip,
  useTheme,
  Paper,
} from "@mui/material";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

import { Tag } from "./Tag";
import { CharBucket } from "./CharBucket";
import { TabsPanel } from "./TabsPanel";

function App() {
  const theme = useTheme();
  const initialKeywords = new Array(13).fill("");
  const [currentTags, setCurrentTags] = useState<string[]>(initialKeywords);
  const [finalKeywordString, setFinalKeywordString] = useState("");
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [wordSoup, setWordSoup] = useState("");
  const [charBuckets, setCharBuckets] = useState<Record<number, string[]>>({});
  const [tagsToRework, setTagsToRework] = useState<string>("");

  const tempKeywordString = currentTags
    .filter((k) => k.trim() !== "")
    .map((w) => w.trim())
    .join(", ");

  const updateTags = useCallback(
    (e: ChangeEvent<HTMLInputElement>, tagIndex: number) => {
      const value = e?.target.value;
      const newTags = [...currentTags];
      newTags[tagIndex] = value;
      setCurrentTags(newTags);
    },
    [currentTags]
  );

  useEffect(() => {
    const split = tagsToRework.split(",");
    setCurrentTags(split);
  }, [tagsToRework]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        p: 3,
        pt: 0,
      }}
    >
      <Box
        sx={{
          width: "900px",
          [theme.breakpoints.down("md")]: { width: "100%" },
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ m: 3, mb: 4, textAlign: "center" }}>
          Spoonflower Tag Planner
        </Typography>

        <Box sx={{ width: "95%", m: 2 }}>
          <TabsPanel
            wordSoup={wordSoup}
            setWordSoup={setWordSoup}
            setCharBuckets={setCharBuckets}
            setTagsToRework={setTagsToRework}
          />

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              width: "95%",
              alignItems: "center",
            }}
          >
            {Object.entries(charBuckets).map(([length, words]) => (
              <CharBucket
                key={length}
                length={length}
                words={words}
                currentTags={currentTags}
              />
            ))}
          </Box>
        </Box>

        <Box>
          <Typography sx={{ fontWeight: "bold", mt: 1, mb: 1 }}>
            Plan your optimized tags here
          </Typography>

          <Box
            sx={{
              display: "flex",
              [theme.breakpoints.down("md")]: { flexDirection: "column" },
            }}
          >
            <Box sx={{ mr: 6, [theme.breakpoints.down("md")]: { mr: 0 } }}>
              {currentTags.slice(0, 7).map((k, i) => (
                <Tag key={i} tag={k} tagIndex={i} onChange={updateTags} />
              ))}
            </Box>
            <Box sx={{ [theme.breakpoints.down("md")]: { mt: -1 } }}>
              {currentTags.slice(7).map((k, i) => (
                <Tag
                  key={i + 7}
                  tag={k}
                  tagIndex={i + 7}
                  onChange={updateTags}
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
              setCurrentTags([...initialKeywords]);
              setFinalKeywordString("");
              setCharBuckets({});
              setWordSoup("");
              setTagsToRework("");
            }}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            disabled={
              !currentTags.some((k) => Boolean(k)) &&
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
          <Paper
            sx={{
              display: "flex",
              alignItems: "center",
              width: "95%",
              padding: 2,
              borderRadius: "4px",
              justifyContent: "space-between",
              backgroundColor: "action.hover",
              [theme.breakpoints.down("md")]: { width: "90%", mb: 6 },
            }}
          >
            <Box sx={{ mr: 1 }}>{finalKeywordString}</Box>
            <Tooltip title="Copy to clipboard">
              {copiedToClipboard ? (
                <CheckIcon />
              ) : (
                <ContentCopyIcon
                  sx={{ cursor: "pointer" }}
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
          </Paper>
        )}
      </Box>
    </Box>
  );
}

export default App;

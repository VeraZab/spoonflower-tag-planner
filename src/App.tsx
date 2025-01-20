import "./App.css";
import { useState, ChangeEvent, FocusEvent, useCallback } from "react";
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

import { Tag } from "./Tag.tsx";
import { CharBucket } from "./CharBucket.tsx";

const createBuckets = (text: string) => {
  const words = text
    .replace(/,/g, " ")
    .split(/\s+/)
    .filter((word) => word.trim() !== "");

  const buckets: Record<number, string[]> = {};
  words.forEach((word) => {
    const length = word.length;
    if (!buckets[length]) {
      buckets[length] = [];
    }
    buckets[length].push(word);
  });
  return buckets;
};

function App() {
  const theme = useTheme();
  const initialKeywords = new Array(13).fill("");
  const [currentTags, setCurrentTags] = useState<string[]>(initialKeywords);
  const [finalKeywordString, setFinalKeywordString] = useState("");
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [wordSoup, setWordSoup] = useState("");
  const [charBuckets, setCharBuckets] = useState<Record<number, string[]>>([]);

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
        <Typography level="h2" sx={{ m: 3, mb: 4, textAlign: "center" }}>
          Spoonflower Tag Planner
        </Typography>
        <Box sx={{ width: "95%", m: 2 }}>
          <Textarea
            sx={{ minHeight: "70px" }}
            placeholder="Paste your keyword ideas here"
            value={wordSoup}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              const value = e?.target.value.toLowerCase();
              setWordSoup(value);
            }}
            onBlur={(e: FocusEvent<HTMLTextAreaElement>) => {
              const newBuckets = createBuckets(e.target.value);
              setCharBuckets(newBuckets);
            }}
            onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
              const isEnter =
                e.key === "Enter" || // Logical Enter key
                e.code === "Enter" || // Physical Enter key
                e.code === "NumpadEnter" || // Enter key on the numeric keypad
                e.keyCode === 13; // Older browser fallback

              if (isEnter) {
                e.preventDefault(); // Prevent the default Enter behavior
                e.currentTarget.blur(); // Blur the Textarea
              }
            }}
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
                  key={i + 6}
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
            }}
          >
            Reset
          </Button>
          <Button
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

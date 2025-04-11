import { Box, Typography, useTheme, Paper } from "@mui/material";

const isWordInTags = (word: string, currentTags: string[]): boolean =>
  currentTags.some((sentence) => sentence.split(/\s+/).includes(word));

export function CharBucket({
  words,
  length,
  currentTags,
}: {
  words: string[];
  length: string;
  currentTags: string[];
}) {
  const theme = useTheme();

  const uniqueWords = Array.from(new Set(words));

  if (!uniqueWords.length) return null;

  return (
    <Paper
      elevation={1}
      sx={{
        backgroundColor: theme.palette.grey[100],
        height: "160px",
        width: "150px",
        borderRadius: "4px",
        mt: 1,
        mr: 1,
        p: 1,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          height: "20%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontWeight: "bold" }}>{length} chars</Typography>
        <Typography>({uniqueWords.length})</Typography>
      </Box>
      <Box
        sx={{
          overflow: "auto",
          height: "80%",
        }}
      >
        {uniqueWords.map((word, i) => (
          <Typography
            key={i}
            sx={{
              textDecoration: isWordInTags(word, currentTags)
                ? "line-through"
                : "none",
            }}
          >
            {word}
          </Typography>
        ))}
      </Box>
    </Paper>
  );
}

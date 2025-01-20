import { Box, Sheet, Typography, useTheme } from "@mui/joy";

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
    <Sheet
      sx={{
        backgroundColor: theme.palette.neutral[100],
        height: "160px",
        width: "150px",
        borderRadius: "4px",
        mt: 1,
        mr: 1,
        padding: 1,
        overflow: "hidden",
      }}
    >
      <Typography
        sx={{
          display: "flex",
          height: "20%",
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ fontWeight: "bold" }}>{length} chars</Box>
        <Box> ({uniqueWords.length})</Box>
      </Typography>
      <Box
        sx={{
          overflow: "scroll",
          height: "80%",
        }}
      >
        {uniqueWords.map((word, i) => {
          return (
            <Box
              key={i}
              sx={{
                textDecoration: isWordInTags(word, currentTags)
                  ? "line-through"
                  : "none",
              }}
            >
              {word}
            </Box>
          );
        })}
      </Box>
    </Sheet>
  );
}

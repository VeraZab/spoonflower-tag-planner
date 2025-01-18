import { useState, ChangeEvent } from "react";
import { Box, Input } from "@mui/joy";

export function Keyword({
  keywords,
  keyword,
  keywordIndex,
  setKeywords,
}: {
  keywords: string[];
  keyword: string;
  keywordIndex: number;
  setKeywords: (keywords: string[]) => void;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        m: 1,
      }}
    >
      <Box sx={{ fontWeight: "bold", width: "30px" }}>#{keywordIndex + 1}</Box>
      <Input
        sx={{ maxWidth: "250px", width: "250px", ml: 1, mr: 1 }}
        variant="soft"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const value = e?.target.value;
          const newKeywords = [...keywords];
          newKeywords[keywordIndex] = value;
          setKeywords(newKeywords);
        }}
        color={keyword.length <= 20 ? "success" : "danger"}
        value={keyword}
      >
        {keyword}
      </Input>
      <Box>{20 - keyword.length} chars left</Box>
    </Box>
  );
}

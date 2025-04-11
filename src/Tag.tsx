import { ChangeEvent } from "react";
import { Box, TextField } from "@mui/material";

export function Tag({
  tag,
  tagIndex,
  onChange,
}: {
  tag: string;
  tagIndex: number;
  onChange: (e: ChangeEvent<HTMLInputElement>, tagIndex: number) => void;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        m: 1,
      }}
    >
      <Box sx={{ fontWeight: "bold", width: "30px" }}>#{tagIndex + 1}</Box>
      <TextField
        variant="outlined"
        size="small"
        sx={{ maxWidth: "250px", width: "250px", mx: 1 }}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, tagIndex)}
        value={tag}
        color={tag.length <= 20 ? "success" : "error"}
        inputProps={{ maxLength: 30 }}
      />
      <Box>{20 - tag.length} chars left</Box>
    </Box>
  );
}

import { ChangeEvent } from "react";
import { Box, Input } from "@mui/joy";

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
      <Input
        sx={{ maxWidth: "250px", width: "250px", ml: 1, mr: 1 }}
        variant="soft"
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, tagIndex)}
        color={tag.length <= 20 ? "success" : "danger"}
        value={tag}
      >
        {tag}
      </Input>
      <Box>{20 - tag.length} chars left</Box>
    </Box>
  );
}

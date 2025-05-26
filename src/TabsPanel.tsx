import {
  useState,
  ReactNode,
  SyntheticEvent,
  ChangeEvent,
  FocusEvent,
} from "react";
import { Tabs, Tab, Box, TextField } from "@mui/material";
import { CopyPasteText } from "./CopyPasteText";

// Tab panel content container
interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function CustomTab(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0, mt: 1 }}>{children}</Box>}
    </Box>
  );
}

// Accessibility props
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// Bucket logic
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

// Tab component
const MuiTab = ({ label, ...props }: { label: string; index: number }) => (
  <Tab
    label={label}
    sx={{
      "&.Mui-selected": {
        outline: "none",
      },
      "&:focus": {
        outline: "none",
      },
    }}
    {...props}
  />
);

// Props
interface TabsPanelProps {
  wordSoup: string;
  setWordSoup: (value: string) => void;
  setCharBuckets: (buckets: Record<string, string[]>) => void;
  setTagsToRework: (tags: string) => void;
}

export function TabsPanel({
  wordSoup,
  setWordSoup,
  setCharBuckets,
  setTagsToRework,
}: TabsPanelProps) {
  const [tempKeywordsToRework, setTempKeywordsToRework] = useState("");
  const [value, setValue] = useState(0);

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 1 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <MuiTab label="Keyword Ideas" index={0} {...a11yProps(0)} />
          <MuiTab label="Rework Keywords" index={1} {...a11yProps(1)} />
        </Tabs>
      </Box>

      <CustomTab value={value} index={0}>
        <TextField
          multiline
          fullWidth
          minRows={3}
          sx={{ minHeight: "70px", p: 0 }}
          placeholder="Paste your keyword ideas here"
          value={wordSoup}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            const value = e.target.value.toLowerCase();
            setWordSoup(value);
          }}
          onBlur={(e: FocusEvent<HTMLTextAreaElement>) => {
            const newBuckets = createBuckets(e.target.value);
            setCharBuckets(newBuckets);
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            const isEnter =
              e.key === "Enter" ||
              e.code === "Enter" ||
              e.code === "NumpadEnter" ||
              e.keyCode === 13;

            if (isEnter) {
              e.preventDefault();
              (e.target as HTMLTextAreaElement).blur();
            }
          }}
        />
      </CustomTab>

      <CustomTab value={value} index={1}>
        <>
          <TextField
            multiline
            fullWidth
            minRows={3}
            sx={{ minHeight: "70px", p: 0 }}
            placeholder="Paste your comma separated existing tags here"
            value={tempKeywordsToRework}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              const value = e.target.value.toLowerCase();
              setTempKeywordsToRework(value);
            }}
            onBlur={() => {
              setTempKeywordsToRework("");
              setTagsToRework(tempKeywordsToRework);
            }}
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
              const isEnter =
                e.key === "Enter" ||
                e.code === "Enter" ||
                e.code === "NumpadEnter" ||
                e.keyCode === 13;

              if (isEnter) {
                e.preventDefault();
                (e.target as HTMLTextAreaElement).blur();
              }
            }}
          />
          <CopyPasteText
            text={`[...Array.from(document.querySelectorAll('h2'))
            .find(h => h.textContent.trim().toLowerCase().includes('explore more tags'))
            .closest('section')
            .querySelectorAll("a[aria-label^='Shop for']")]
            .map(t => t.innerText)
            .join(', ')`}
            tooltipText="Copy to Spoonflower page listing console"
          />
        </>
      </CustomTab>
    </Box>
  );
}

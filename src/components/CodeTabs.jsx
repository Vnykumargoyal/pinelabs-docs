import { Tabs, Tab } from "@mui/material";
import { useState } from "react";
import CodeBlock from "./CodeBlock";

export default function CodeTabs({ examples }) {
  const langs = Object.keys(examples || {});
  const [tab, setTab] = useState(langs[0]);

  return (
    <>
      <Tabs value={tab} onChange={(e, v) => setTab(v)}>
        {langs.map((lang) => (
          <Tab key={lang} label={lang} value={lang} />
        ))}
      </Tabs>

      <CodeBlock code={examples[tab]} language={tab} />
    </>
  );
}

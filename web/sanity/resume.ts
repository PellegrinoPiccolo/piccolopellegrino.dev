import { cache } from "react";
import { client } from "./client";
import { RESUME_QUERY } from "./queries";

export const getResumeUrl = cache(async () => {
  const resume = await client.fetch(RESUME_QUERY);
  if (!resume?.url) return null;

  const fileName = resume.fileName || "Pellegrino-Piccolo-CV.pdf";
  return `${resume.url}?dl=${encodeURIComponent(fileName)}`;
});

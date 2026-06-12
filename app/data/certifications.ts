export type Certification = {
  name: string;
  code: string;
};

export const certifications: Certification[] = [
  { name: "Azure Fundamentals", code: "AZ-900" },
  { name: "Azure AI Fundamentals", code: "AI-900" },
  { name: "Azure Data Fundamentals", code: "DP-900" },
];

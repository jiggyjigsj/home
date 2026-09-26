// Years of experience, computed from the first professional role so every mention rolls over on its own.
export const CAREER_START = "2017-05-01";

const WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
  "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen", "Twenty"];

export function yearsOfExperience(now = new Date()) {
  const start = new Date(`${CAREER_START}T00:00:00`);
  let years = now.getFullYear() - start.getFullYear();
  if (now.getMonth() < start.getMonth() || (now.getMonth() === start.getMonth() && now.getDate() < start.getDate())) years--;
  return years;
}

export const years = yearsOfExperience();
export const yearsWord = WORDS[years] || String(years);

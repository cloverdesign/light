export const igniteEvent = {
  id: "ignite-con-2026",
  title: "Ignite Con ’26",
  theme: "Let your light so shine",
  organiser: "BLW Lighthouse Group",
  date: "Saturday, 10 October 2026",
  dateTime: "2026-10-10T12:00:00+02:00",
  time: "12 PM (SAST)",
  venue: "The Barnyard Theatre",
  location: "Menlyn Park",
  scripture: "Matt 5:1",
  socialHandle: "blw.lighthouse",
  poster: "/events/ignite-con-2026.jpeg",
  posterAlt: "Ignite Con ’26 by BLW Lighthouse Group. Let your light so shine. The Barnyard Theatre, Menlyn Park. Saturday, 10 October, 12 PM.",
  registrationUrl: "/events/register",
} as const;

export const registrationAgeGroups = ["Under 13", "13–17", "18–24", "25–34", "35–44", "45+"] as const;

export const institutions = [
  "University of Pretoria (UP) – Hatfield",
  "University of Pretoria – Groenkloof",
  "University of Pretoria – Prinshof",
  "University of Pretoria – Mamelodi",
  "University of Pretoria – Onderstepoort",
  "Tshwane University of Technology (TUT) – Pretoria Campus",
  "TUT – Arcadia Campus",
  "TUT – Arts Campus",
  "TUT – Soshanguve Campus",
  "TUT – Ga-Rankuwa Campus",
  "University of South Africa (UNISA) – Muckleneuk",
  "UNISA – Sunnyside",
  "Sefako Makgatho Health Sciences University (SMU) – Ga-Rankuwa",
  "Tshwane North TVET College – Pretoria Campus",
  "Tshwane North TVET College – Mamelodi Campus",
  "Tshwane North TVET College – Rosslyn Campus",
  "Tshwane North TVET College – Soshanguve North Campus",
  "Tshwane North TVET College – Soshanguve South Campus",
  "Tshwane North TVET College – Temba Campus",
  "Tshwane South TVET College – Pretoria West Campus",
  "Tshwane South TVET College – Atteridgeville Campus",
  "Central Technical College – Pretoria",
  "Eduvos – Pretoria",
  "Emeris Pretoria Lynnwood / former IIE Varsity College",
  "Vega School Pretoria",
  "IIE Rosebank College – Pretoria",
  "Belgium Campus ITversity – Pretoria/Akasia",
  "SACAP – Pretoria",
] as const;

export const institutionOther = "Other";

// Extra words each institution can be found by, so "UP", "TUT" or "Unisa" match every campus.
export const institutionAliases: Record<string, string> = {
  "University of Pretoria": "UP Tuks",
  "Tshwane University of Technology": "TUT",
  "TUT": "Tshwane University of Technology",
  "University of South Africa": "UNISA",
  "UNISA": "University of South Africa",
  "Sefako Makgatho": "SMU Medunsa",
  "Emeris": "Varsity College IIE",
  "SACAP": "South African College of Applied Psychology",
};

export const institutionKeywords = (institution: string) =>
  Object.entries(institutionAliases).filter(([name]) => institution.includes(name)).map(([, extra]) => extra).join(" ");

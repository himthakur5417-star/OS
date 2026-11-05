export interface ProgramItem {
  id: "juniors" | "scholars" | "defence";
  title: string;
  subtitle: string;
  copy: string;
  href: string;
  ctaLabel: string;
  badge: string;
  focusArea: string;
}

export const PROGRAMS_DATA: ProgramItem[] = [
  {
    id: "juniors",
    title: "JUNIORS",
    subtitle: "Class 7–10",
    badge: "Foundation Years",
    focusArea: "Habits • Reading • Daily Focus",
    copy: "Build strong study habits, consistency and confidence from an early stage.",
    href: "/programs/juniors",
    ctaLabel: "Explore Juniors",
  },
  {
    id: "scholars",
    title: "SCHOLARS",
    subtitle: "Class 11–12",
    badge: "Senior School & Competitive",
    focusArea: "Board Exams • Entrance Tests • Time Architecture",
    copy: "Stay consistent with school studies while preparing seriously for what comes next.",
    href: "/programs/scholars",
    ctaLabel: "Explore Scholars",
  },
  {
    id: "defence",
    title: "DEFENCE",
    subtitle: "NDA · CDS · AFCAT",
    badge: "Officer Leadership",
    focusArea: "Academics • Daily Routine • Officer Qualities",
    copy: "Structured preparation for academics, discipline and the demands of defence examinations.",
    href: "/programs/defence",
    ctaLabel: "Explore Defence",
  },
];

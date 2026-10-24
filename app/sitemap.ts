import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.officiumsupremum.in";

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date("2026-10-24T03:04:40.000Z"),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date("2026-10-22T14:59:51.000Z"),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date("2026-10-24T03:04:40.000Z"),
    },
    {
      url: `${baseUrl}/book-orientation`,
      lastModified: new Date("2026-10-24T03:04:40.000Z"),
    },
    {
      url: `${baseUrl}/programs/juniors`,
      lastModified: new Date("2026-10-19T10:24:06.000Z"),
    },
    {
      url: `${baseUrl}/programs/scholars`,
      lastModified: new Date("2026-10-19T10:24:06.000Z"),
    },
    {
      url: `${baseUrl}/programs/defence`,
      lastModified: new Date("2026-10-24T03:04:40.000Z"),
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date("2026-10-19T10:24:06.000Z"),
    },
    {
      url: `${baseUrl}/resources/syllabus`,
      lastModified: new Date("2026-10-19T10:24:06.000Z"),
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date("2026-10-24T03:04:40.000Z"),
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date("2026-10-24T03:04:40.000Z"),
    },
    {
      url: `${baseUrl}/resources/nda-mathematics`,
      lastModified: new Date("2026-10-24T05:30:00.000Z"),
    },
    {
      url: `${baseUrl}/resources/cds-mathematics`,
      lastModified: new Date("2026-10-24T05:30:00.000Z"),
    },
    {
      url: `${baseUrl}/resources/nda-cds-english`,
      lastModified: new Date("2026-10-24T05:30:00.000Z"),
    },
    {
      url: `${baseUrl}/resources/previous-year-papers`,
      lastModified: new Date("2026-10-24T05:30:00.000Z"),
    },
  ];
}

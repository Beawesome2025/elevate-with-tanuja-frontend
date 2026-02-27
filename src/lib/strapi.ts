/**
 * src/lib/strapi.ts
 * Strapi 5 data fetcher for the Masterclass landing page
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MasterclassData {
  id: number;
  programName: string;
  tagline: string;
  date: string;            // e.g. "2025-03-06"
  time: string;            // e.g. "11:00 AM"
  duration: string;        // e.g. "2 Hours"
  price: number;
  currency: string;        // e.g. "₹"
  hostName: string;
  hostBio: string;
  hostPhotoUrl: string | null;
  painPoints: string[];
  outcomes: string[];
  faqs: { question: string; answer: string }[];
  ctaLabel: string;
  checkoutUrl: string;
  seoTitle?: string;
  seoDescription?: string;
}

// ─── Fetcher Logic ────────────────────────────────────────────────────────────

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export async function getMasterclassData(): Promise<MasterclassData | null> {
  const query = "populate[hostPhoto]=*&populate[painPoints]=*&populate[outcomes]=*&populate[faqs]=*";

  try {
    const response = await fetch(`${STRAPI_URL}/api/masterclasses?${query}`, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      next: { revalidate: 0 }, // Set to 0 temporarily to disable caching while debugging
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Strapi fetch failed (${response.status}):`, errorBody);
      return null;
    }

    const json = await response.json();

    // 1. Log the data to your terminal so you can see the real structure
    console.log("DEBUG: Strapi Response Data Length:", json.data?.length);

    if (!json.data || json.data.length === 0) {
      console.warn("DEBUG: No data returned from Strapi. Is the entry Published?");
      return null;
    }

    // 2. Strapi 5 often flattens the response
    const item = json.data[0];
    const a = item.attributes || item;

    const resolveMedia = (path: string | undefined | null): string | null => {
      if (!path) return null;
      if (path.startsWith("http")) return path;
      return `${STRAPI_URL}${path}`;
    };

    // 3. Robust Mapping (Checking for deep nesting)
    return {
      id: item.id,
      programName: a.programName,
      tagline: a.tagline,
      date: a.date,
      time: a.time,
      duration: a.duration ?? "2 Hours",
      price: a.price,
      currency: a.currency ?? "₹",
      hostName: a.hostName,
      hostBio: a.hostBio ?? "",
      hostPhotoUrl: resolveMedia(
        a.hostPhoto?.url || a.hostPhoto?.data?.attributes?.url
      ),
      // Fix for Pain Points/Outcomes
      painPoints: (a.painPoints ?? []).map((p: any) => (typeof p === 'object' ? p.text : p)),
      outcomes: (a.outcomes ?? []).map((o: any) => (typeof o === 'object' ? o.text : o)),
      faqs: (a.faqs ?? []).map((f: any) => ({
        question: f.question || "",
        answer: f.answer || "",
      })),
      ctaLabel: a.ctaLabel ?? "Reserve Your Seat",
      checkoutUrl: a.checkoutUrl,
      seoTitle: a.seoTitle,
      seoDescription: a.seoDescription,
    };
  } catch (error) {
    console.error("Error fetching Masterclass data:", error);
    return null;
  }
}

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
  const query = "populate=*";
  console.log("--- START DEBUG ---");
  console.log("URL:", STRAPI_URL);
  console.log("TOKEN EXISTS:", !!STRAPI_TOKEN);
  try {
    const response = await fetch(`${STRAPI_URL}/api/masterclasses?${query}`, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
        // This header is a lifesaver: It tells Strapi 5 to use the v4 data structure
        // Remove this later once you are comfortable with Strapi 5's flattened format
        "Strapi-Response-Format": "v4",
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Strapi fetch failed (${response.status}):`, errorBody);
      return null;
    }

    const json = await response.json();

    // Check if we have data
    if (!json.data || (Array.isArray(json.data) && json.data.length === 0)) {
      console.warn("No data found at /api/masterclasses. Check Publish status.");
      return null;
    }

    const item = Array.isArray(json.data) ? json.data[0] : json.data;

    // With the "v4" header above, 'attributes' will exist.
    // Without it, 'a' will just be 'item'.
    const a = item.attributes || item;

    const resolveMedia = (path: string | undefined | null): string | null => {
      if (!path) return null;
      if (path.startsWith("http")) return path;
      return `${STRAPI_URL}${path}`;
    };

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
      // Updated mapping to handle both Strapi 5 Component objects and raw strings
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
    console.error("Error in getMasterclassData:", error);
    return null;
  }
}

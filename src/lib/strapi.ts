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
  // We use populate=deep (or a specific list) to get all components and images
  // Strapi 5 requires explicit population for dynamic zones and components
  const query = "populate[hostPhoto]=*&populate[painPoints]=*&populate[outcomes]=*&populate[faqs]=*";

  try {
    const response = await fetch(`${STRAPI_URL}/api/masterclasses?${query}`, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      next: { revalidate: 60 }, // Cache data for 60 seconds (ISR)
    });

    if (!response.ok) {
      console.error("Strapi fetch failed:", response.statusText);
      return null;
    }

    const json = await response.json();

    if (!json.data || json.data.length === 0) return null;

    // Strapi 5 structure: json.data[0] contains 'id' and 'attributes' (or direct fields)
    const item = json.data[0];
    const a = item.attributes || item; // Handle variations in Strapi 5 response

    // Resolve media URL (Handles local, Render, and Cloudflare R2 paths)
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
        a.hostPhoto?.data?.attributes?.url ?? a.hostPhoto?.url
      ),
      // Mappers for Strapi Components (assuming fields are named 'text')
      painPoints: (a.painPoints ?? []).map((p: any) => p.text || p),
      outcomes: (a.outcomes ?? []).map((o: any) => o.text || o),
      faqs: (a.faqs ?? []).map((f: any) => ({
        question: f.question,
        answer: f.answer,
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

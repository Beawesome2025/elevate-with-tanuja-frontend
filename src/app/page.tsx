// app/page.tsx (Server Component)
import { getMasterclassData } from "@/lib/strapi";
import MasterclassLandingPage from "@/components/MasterclassLandingPage"; // Your UI file

export default async function Page() {
  // Fetch real data from Render
  const data = await getMasterclassData();

  if (!data) {
    return <div>No masterclass found. Please add one in Strapi.</div>;
  }

  // Pass the data as a prop to your UI component
  return <MasterclassLandingPage initialData={data} />;
}

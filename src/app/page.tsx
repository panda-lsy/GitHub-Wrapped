import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LoginButton from "@/components/LoginButton";
import Dashboard from "@/components/Dashboard";
import LandingPage from "@/components/LandingPage";
import { fetchGitHubData } from "@/lib/github";

export default async function Home() {
  let session;
  
  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    console.error("Failed to retrieve session:", error);
    // If session retrieval fails, we can treat it as not logged in, 
    // or show a specific error if it's a configuration issue.
    // For now, let's assume it might be a temporary issue or missing env vars.
  }
  
  // @ts-ignore - accessToken is added in the route handler
  const accessToken = session?.accessToken as string;

  if (session && accessToken) {
    try {
      const data = await fetchGitHubData(accessToken);
      return <Dashboard data={data} />;
    } catch (error) {
      console.error("Error fetching GitHub data:", error);
      return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24 text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-500">Error loading data</h1>
          <p className="mb-8 text-gray-400">Please try signing out and signing in again.</p>
          <LoginButton />
        </div>
      );
    }
  }

  return <LandingPage />;
}

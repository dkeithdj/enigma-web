import { auth, db } from "@/firebase/server";
import { type APIRoute } from "astro";

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  console.log("hi there");
  if (!cookies.has("session")) return redirect("/signin");

  const sessionCookie = cookies.get("session").value;
  console.log(sessionCookie);
  const decodedCookie = await auth.verifySessionCookie(sessionCookie);
  const user = await auth.getUser(decodedCookie.uid);

  console.log("this", user);
  if (!user) return redirect("/signin");

  return new Response(JSON.stringify(user), { status: 200 });
};

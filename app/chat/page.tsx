import React from "react";
import Chat from "./Chat";
import { cookies } from "next/headers";

async function Page() {
  const cookeisStorage = await cookies();
  const token = cookeisStorage.get("token")?.value;

  const resFreinds = await fetch(
    "https://friendlink-api.onrender.com/friend/myFriends",
    {
      method: "GET",
      cache: "no-store",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  const firendsData = await resFreinds.json();
  return <Chat firendsData={firendsData} />;
}

export default Page;

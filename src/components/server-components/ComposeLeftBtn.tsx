import PostBtn from "../client-component/post-btn";
import { createClient } from "@/utils/supabase/server";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import React from "react";
import { SupabaseClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import ComposeTweetForm from "../client-component/ComposeTweetForm";
import { db } from "../../lib/db/index";
import { tweets } from "@/lib/db/schema";
import LeftPostBtn from "../client-component/left-post-btn";

const ComposeLeftTweetBtn = () => {
  async function submitTweet(formData: FormData) {
    "use server";

    const tweet = formData.get("tweet");
    if (!tweet) return;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const secretKey = process.env.NEXT_PRIVATE_SUPABASE_SECRET_KEY;

    if (!supabaseUrl || !secretKey)
      return {
        data: null,
        error: {
          message: "Invalid Credentials",
        },
      };

    const supabaseServer = new SupabaseClient(supabaseUrl, secretKey);
    const supabase = createClient();

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (!userData || userError) redirect("/error");

    let err = "";

    const res = await db
      .insert(tweets)
      .values({
        profileId: userData.user.id,
        text: tweet.toString(),
        id: randomUUID(),
      })
      .returning()
      .catch(() => {
        err = "Something went wrong with the server";
      });

    revalidatePath("/home");
    return { data: res, error: err };
  }

  return <LeftPostBtn serverAction={submitTweet}/>;
};

export default ComposeLeftTweetBtn;
"use server"
import { randomUUID } from "crypto";
import { supabaseServer } from ".";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import { likes, replies } from '../db/schema';
import { and, eq } from "drizzle-orm";

type likeTweetProps = {
  id: string;
  profile_id: string;
};

export const likeTweet = async ({ id, profile_id }: likeTweetProps) => {
   const res = await db.insert(likes).values({
      id: randomUUID(),
      profileId: profile_id,
      tweetId: id,
    })
  revalidatePath("/home")
};

export const unLikeTweet = async ({ id, profile_id }: likeTweetProps) => {
  await db.delete(likes).where(and(eq(likes.tweetId, id), eq(likes.profileId,profile_id)))
  revalidatePath("/home");
};

export const reply =async ({replyText, tweetId , userId}:{replyText:string, tweetId: string, userId:string}) => {
  if (replyText === "") return;

  await db.insert(replies).values({
    text:replyText,
    tweetId,
    profileId: userId
  })
}

revalidatePath('home/tweet/[id]')



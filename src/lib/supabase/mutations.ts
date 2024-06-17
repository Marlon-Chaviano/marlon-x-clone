"use server";
import { randomUUID } from "crypto";
import { supabaseServer } from ".";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import { bookmarks, likes, replies } from "../db/schema";
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
  });
  revalidatePath("/home");
  revalidatePath("home/tweet/[id]");
};

export const unLikeTweet = async ({ id, profile_id }: likeTweetProps) => {
  await db
    .delete(likes)
    .where(and(eq(likes.tweetId, id), eq(likes.profileId, profile_id)));
  revalidatePath("/home");
  revalidatePath("home/tweet/[id]");
};

export const reply = async ({
  replyText,
  tweetId,
  userId,
}: {
  replyText: string;
  tweetId: string;
  userId: string;
}) => {
  if (replyText === "") return;

  await db.insert(replies).values({
    text: replyText,
    tweetId,
    profileId: userId,
  });
};

revalidatePath("home/tweet/[id]");

export async function bookmarkTweet(userId: string, tweetId: string) {

  
  await db.insert(bookmarks).values({
    profileId: userId,
    tweetId,
  });
  revalidatePath("/home");
  revalidatePath("home/tweet/[id]");
}
export async function unBookmarkTweet(userId: string, tweetId: string) {

  
  await db
    .delete(bookmarks)
    .where(
      and(eq(bookmarks.profileId, userId), eq(bookmarks.tweetId, tweetId))
    );
  revalidatePath("/home");
  revalidatePath("home/tweet/[id]");
}

"use server";
import { supabaseServer } from ".";
import { db } from "../db";
import {
  likes,
  profiles,
  TweetType,
  LikesType,
  ProfileType,
  tweetHashtag,
  tweets,
  bookmarks,
} from "../db/schema";
import { and, desc, eq, exists, like, or } from "drizzle-orm";



export const getLikes = async (tweetId: string) => {
  return await supabaseServer
    .from("likes")
    .select("*", { count: "exact" })
    .eq("tweet_id", tweetId);
};

export const isLiked = async ({
  tweetId,
  userId,
}: {
  tweetId: string;
  userId: string;
}) => {
  const { data } = await supabaseServer
    .from("likes")
    .select("id")
    .eq("tweet_id", tweetId)
    .eq("user_id", userId)
    .single();

  return Boolean(data?.id);
};

export const getTweets = async (
  currentUser: string,
  getSingleTweetId?: string,
  oneUserTweets?: boolean
) => {
  try {
    let query = db
      .select({
        ...(currentUser
          ? {
              hasLiked: exists(
                db
                  .select()
                  .from(likes)
                  .where(
                    and(
                      eq(likes.profileId, currentUser),
                      eq(likes.tweetId, tweets.id)
                    )
                  )
              ),
            }
          : {}),
        tweet: tweets,
        likes,
        profiles,
      })
      .from(tweets)
      .leftJoin(likes, eq(tweets.id, likes.tweetId))
      .innerJoin(profiles, eq(tweets.profileId, profiles.id))
      .orderBy(desc(tweets.createdAt))
      .limit(10);

    if (getSingleTweetId && getSingleTweetId != "") {
      query.where(eq(tweets.id, getSingleTweetId));
    }
    if (oneUserTweets) {
      query.where(eq(tweets.profileId, currentUser));
    }

    const rows = await query;
    if (rows) {
      const result = rows.reduce<
        Record<
          string,
          {
            tweet: TweetType;
            likes: LikesType[];
            profile: ProfileType;
            hasLiked: boolean;
          }
        >
      >((acc, row) => {
        const tweet = row.tweet;
        const like = row.likes;
        const profile = row.profiles;
        const hasLiked = Boolean(row.hasLiked);
        if (!acc[tweet.id]) {
          acc[tweet.id] = { tweet, likes: [], profile, hasLiked };
        }
        if (like) {
          acc[tweet.id].likes.push(like);
        }
        return acc;
      }, {});
      const data = Object.values(result);

      return { data };
    }
  } catch (error) {
    return { error };
  }
};

export async function getUser({ userId }: { userId: string }) {
  const user = await db
    .select()
    .from(profiles)
    .where(eq(profiles.id, userId as string));

  return user[0];
}

export async function searchUsers(formData: FormData) {
  const search = formData.get("search");

  const users = await db
    .select()
    .from(profiles)
    .where(like(profiles.username, `%${search as string}%`));

  return users;
}

export async function getUserTweets(userId: string) {
  const Usertweets = await db
    .select()
    .from(tweets)
    .where(eq(tweets.profileId, userId));
  return Usertweets;
}

export async function isBookmarked(userId: string, tweetId: string) {
  const isbookmarked = await db
    .select()
    .from(bookmarks)
    .where(
      and(eq(bookmarks.profileId, userId), eq(bookmarks.tweetId, tweetId))
    );

  if (isbookmarked.length > 0) return true;
  else return false;
}

export async function getBookmarks(userId: string) {
  try {
  const rows= await db
    .select({
      ...(userId
        ? {
            hasLiked: exists(
              db
                .select()
                .from(likes)
                .where(
                  and(
                    eq(likes.profileId, userId),
                    eq(likes.tweetId, tweets.id)
                  )
                )
            ),
          }
        : {}),
      tweet: tweets,
      likes,
      profiles,
    })
    .from(bookmarks)
    .where(eq(bookmarks.profileId, userId))
    .innerJoin(tweets, eq(tweets.id, bookmarks.tweetId))
    .innerJoin(profiles, eq(profiles.id, tweets.profileId))
    .leftJoin(likes, eq(tweets.id, likes.tweetId))

      if (rows) {
      const result = rows.reduce<
        Record<
          string,
          {
            tweet: TweetType;
            likes: LikesType[];
            profile: ProfileType;
            hasLiked: boolean;
          }
        >
      >((acc, row) => {
        const tweet = row.tweet;
        const like = row.likes;
        const profile = row.profiles;
        const hasLiked = Boolean(row.hasLiked);
        if (!acc[tweet.id]) {
          acc[tweet.id] = { tweet, likes: [], profile, hasLiked };
        }
        if (like) {
          acc[tweet.id].likes.push(like);
        }
        return acc;
      }, {});
      const data = Object.values(result);

      return { data };
    }
  } catch (error) {
    return { error };
  }
}

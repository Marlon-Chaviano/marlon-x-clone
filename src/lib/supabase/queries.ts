"use server";
import { Database } from "../../../types/supabase";
import { supabaseServer } from ".";
import { db } from "../db";
import { likes, profiles, tweets, TweetType, LikesType, ProfileType, tweetHashtag } from '../db/schema';
import { and, desc, eq, exists } from "drizzle-orm";
import { error } from "console";

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
  const {data} = await supabaseServer
    .from("likes")
    .select("id")
    .eq("tweet_id", tweetId)
    .eq("user_id", userId)
    .single();

    return Boolean(data?.id)
};

// const queryWithUserId = `SELECT tweets.*,profiles.username, profiles.full_name ,COUNT(likes.id) AS likes_count,
//   EXISTS (
//     SELECT 1 
//     FROM likes
//     WHERE likes.tweet_id = tweets.id
//     AND likes.user_id = $1
//   ) as user_has_liked
// FROM tweets
// LEFT JOIN likes ON tweets.id = likes.tweet_id
// JOIN profiles ON tweets.profile_id = profiles.id
// GROUP BY tweets.id, profiles.username , profiles.full_name
// ORDER BY tweets.created_at DESC;`;

// const queryWithoutUserId = `SELECT tweets.*,profiles.username, profiles.full_name ,COUNT(likes.id) AS likes_count
// FROM tweets
// LEFT JOIN likes ON tweets.id = likes.tweet_id
// JOIN profiles ON tweets.profile_id = profiles.id
// GROUP BY tweets.id, profiles.username , profiles.full_name
// ORDER BY tweets.created_at DESC;`;

export const getTweets = async (currentUser?:string) => {
    
    try {
      const rows = await db
        .select({
          ...(currentUser ? {hasLiked:exists(
            db.select().from(likes).where(and(eq(likes.profileId,currentUser),eq(likes.tweetId,tweets.id)))
          )} : {}),
          tweet: tweets,
          likes,
          profiles
        })
        .from(tweets)
        .leftJoin(likes, eq(tweets.id, likes.tweetId))
        .innerJoin(profiles, eq(tweets.profileId, profiles.id))
        .orderBy(desc(tweets.createdAt))
        .limit(10);
        
        if ( rows ) {
          const result = rows.reduce<Record<string, {tweet: TweetType; likes: LikesType[], profile:ProfileType, hasLiked: boolean}>
          >((acc,row) => {
            const tweet = row.tweet
            const like = row.likes
            const profile = row.profiles;
            const hasLiked = Boolean(row.hasLiked);
            if(!acc[tweet.id]){
              acc[tweet.id] = {tweet, likes:[], profile , hasLiked}
            }
            if (like) {
              acc[tweet.id].likes.push(like)
            }
            return acc;

          },{})
          const data = Object.values(result)
          console.log(data);
          

          
          return {data}
        }

    } catch (error) {
      return {error}
    }
       

};

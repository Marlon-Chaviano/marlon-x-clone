import Tweet from "@/components/Tweet";
import { getTweets, isBookmarked } from "@/lib/supabase/queries";
import { createClient } from "@/utils/supabase/server";
import React from "react";
import { replies } from "../../../../lib/db/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { BsDot, BsThreeDots } from "react-icons/bs";
import dayjs from "dayjs";
import ReplyDialog from "@/components/client-component/ReplyDialog";
import { AiOutlineRetweet } from "react-icons/ai";
import LikeBtn from "@/components/client-component/LikeBtn";

const page = async ({ params }: { params: { id: string } }) => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const userId = data?.user?.id;
  const tweet = await getTweets(userId as string, params.id);
  let isTweetBookmarked
  if (tweet?.data && userId) isTweetBookmarked = isBookmarked(userId , tweet?.data[0].tweet.id);
  const repliesResponse = await db.query.replies.findMany({
    with: { profiles: true },
    where: eq(replies.tweetId, params.id),
  });


  return (
    <>
      {tweet?.data ? (
        <Tweet
          isBookmarked={Boolean(isBookmarked)}
          hasLiked={tweet.data[0].hasLiked}
          likesCount={tweet.data[0].likes.length ?? 0}
          currentUser={userId as string}
          tweet={{
            tweetDetails: tweet.data[0].tweet,
            userProfile: tweet.data[0].profile,
          }}
        />
      ) : (
        <p>No tweet Found</p>
      )}

      {repliesResponse.length > 0 &&
        tweet?.data &&
        repliesResponse.map((reply) => {
          return (
            <div
              key={reply.id}
              className="flex pl-2 items-center border-gray-600 border-b-[0.5px]"
            >
              <div>
                <div className="w-10 h-10 bg-slate-200 rounded-full" />
              </div>
              <div key={reply.id} className="flex flex-col w-full p-4 ">
                <div className="flex items-center my-1 w-full justify-start">
                  <div className="flex items-center space-x-1 ">
                    <div className="font-bold">{reply.profiles.username}</div>
                    <div className="text-primary">
                      @{reply.profiles.username}
                    </div>
                  </div>
                  <div className="ml-2">
                    <BsThreeDots />
                  </div>
                </div>
                <div className="text-white text-base my-1">{reply.text}</div>
              </div>
            </div>
          );
        })}
      {repliesResponse.length == 0 && (
        <p className="w-full text-center font-bold m-4 text-gray-300">
          No replies yet
        </p>
      )}
    </>
  );
};

export default page;

import { getTweets, getUser, getUserTweets, isBookmarked } from "@/lib/supabase/queries";
import React from "react";
import { tweets } from "../../../../lib/db/schema";
import Tweet from "@/components/Tweet";
import { createClient } from "@/utils/supabase/server";

const page = async ({ params }: { params: { id: string } }) => {
  const supabase = createClient()
  const {data} = await supabase.auth.getUser()
  const userProfile = await getUser({ userId: params.id });
  const tweets = await getTweets(params.id, "", true);

  return (
    <>
      <div className="w-full p-2 py-4 flex justify-center items-center space-y-2">
        <div className="flex space-x-2 items-center">
          <div>
            <div className="w-20 h-20 bg-slate-200 rounded-full" />
          </div>
          <div className="font-bold">
            <div className="text-gray-300">{userProfile.username}</div>
            <div className="text-primary">@{userProfile.username}</div>
          </div>
        </div>
      </div>

      <div>
        <div className="w-full flex flex-col pt-4 justify-center items-center text-center border-t-[0.5px] border-b-[0.5px] border-gray-700 ">
          <div className="font-extrabold text-lg">Posts</div>
          <div className="w-[70px] h-[2px] bg-primary"></div>
        </div>
        {tweets?.data && data.user && tweets.data.length > 0 ? (
          tweets?.data?.map( async ({ tweet, profile, likes, hasLiked }) => {
            const isTweetBookmarked = await isBookmarked(data?.user?.id,tweet.id)
            return (
              <Tweet
              isBookmarked={isTweetBookmarked}
                key={tweet.id}
                tweet={{
                  tweetDetails: { ...tweet },
                  userProfile: { ...profile },
                }}
                hasLiked={hasLiked}
                likesCount={likes.length}
                currentUser={params.id as string}
              />
            );
          })
        ) : (
          <p className="font-bold mt-4 text-gray-300 m-4 w-full text-center">
            This user doesn&apos;t have any posts yet
          </p>
        )}
      </div>
    </>
  );
};

export default page;

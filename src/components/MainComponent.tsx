import React from "react";
import ComposeTweet from "./server-components/ComposeTweet";
import { getTweets } from "@/lib/supabase/queries";
import Tweet from "./Tweet";
import { createClient } from "@/utils/supabase/server";

const MainComponent = async () => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const userId = data?.user?.id;
  const res = await getTweets(userId as string);


  return (
    <main className="lg:w-[60%] max-w-[600px] mx-auto flex flex-col h-full min-h-screen border-t-[0.5px] border-l-[0.5px] border-r-[0.5px] border-gray-600">
      <h1 className="text-xl font-bold p-6 backdrop-blur-sm bg-black/10 sticky top-0">
        Home
      </h1>
      <div className="border-t-[0.5px] border-b-[0.5px] flex px-4 py-6 items-stretch space-x-2 border-gray-600 relative">
        <div className="w-10 h-10 bg-slate-400 rounded-full flex-none"></div>
        <ComposeTweet />
      </div>
      <div className="flex flex-col">
        {res &&
          res.data?.map(({ tweet, profile, likes, hasLiked }) => {
            return (
              <Tweet
                event={true}
                key={tweet.id}
                tweet={{
                  tweetDetails: { ...tweet },
                  userProfile: { ...profile },
                }}
                hasLiked={hasLiked}
                likesCount={likes.length}
                currentUser={userId as string}
              />
            );
          })}
      </div>
    </main>
  );
};

export default MainComponent;

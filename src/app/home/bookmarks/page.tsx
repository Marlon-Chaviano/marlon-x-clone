import Tweet from "@/components/Tweet";
import { getBookmarks, isBookmarked } from "@/lib/supabase/queries";
import { createClient } from "@/utils/supabase/server";
import { redirect, RedirectType } from "next/navigation";
import React from "react";
import { bookmarks } from '../../../lib/db/schema';
import { Divide } from "lucide-react";

const page = async () => {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("login", RedirectType.replace);

  const res = await getBookmarks(data.user.id);

  

  return (
    <div>
      <div className="w-full flex flex-col pt-4 justify-center items-center text-center border-t-[0.5px] border-b-[0.5px] border-gray-700 ">
        <div className="font-extrabold text-lg">Bookmarks</div>
        <div className="w-[95px] h-[2px] bg-primary"></div>
      </div>
      <div>
        {res?.data && res.data.map(async ({ tweet, profile, likes, hasLiked }) => {
            const isTweetBookmarked = await isBookmarked(
              data.user.id as string,
              tweet.id
            );
            return (
              <Tweet
                key={tweet.id}
                tweet={{
                  tweetDetails: { ...tweet },
                  userProfile: { ...profile },
                }}
                hasLiked={hasLiked}
                likesCount={likes.length}
                currentUser={data.user.id as string}
                isBookmarked={isTweetBookmarked}
              />
            );
          })}
          { res?.data?.length == 0 && <div className="w-full text-center p-4 m-2">You haven&apos;t bookmarked anything yet</div>}
      </div>
    </div>
  );
};

export default page;

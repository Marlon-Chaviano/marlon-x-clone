"use client";
import { bookmarkTweet, unBookmarkTweet } from "@/lib/supabase/mutations";
import {  useTransition } from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

type BookmarkProps = {
  userId: string;
  tweetId: string;
  isBookmarked: boolean
};

const BookmarkBtn = ({ userId, tweetId, isBookmarked }: BookmarkProps) => {

  const [isPending, startTransition] = useTransition();
  
  return (
    <button
      disabled={isPending}
      onClick={(e) => {
        e.stopPropagation()
        startTransition( async () => {
          isBookmarked
            ? unBookmarkTweet(userId, tweetId)
            : bookmarkTweet(userId, tweetId);
        });

      }}
      className="hover:text-primary transition duration-200 p-1 cursor-pointer"
    >{
        isBookmarked ? <BsBookmarkFill className="text-primary"/>  :<BsBookmark className={`${isBookmarked && 'text-primary'}`}/>
      }
      </button>
      
  );
};

export default BookmarkBtn;

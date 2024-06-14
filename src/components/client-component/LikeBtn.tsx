"use client"

import { ProfileType, TweetType } from "@/lib/db/schema";
import { likeTweet, unLikeTweet } from "@/lib/supabase/mutations";
import { useTransition } from "react";
import React from 'react'
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";


type likeBtnProps = {
  tweet: TweetType
  likesCount: string;
  currentUser: string;
  isUserLikedTweet: boolean;
};



const LikeBtn = ({
  tweet,
  likesCount,
  currentUser,
  isUserLikedTweet,
}: likeBtnProps) => {
  console.log(isUserLikedTweet);

  const [isPending, startTransition] = useTransition();
  return (
    <button
      disabled={isPending}
      onClick={(e) => {
        e.stopPropagation()
        startTransition(() =>
          isUserLikedTweet
            ? unLikeTweet({
              id: tweet.id,
              profile_id: currentUser
            })
            : likeTweet({
                id: tweet.id,
                profile_id: currentUser,
              })
        );
      }}
      className="hover:text-primary space-x-2 transition duration-200 p-1 cursor-pointer flex items-center"
    >
      {isUserLikedTweet ? <AiFillHeart fill="red"/> : <AiOutlineHeart/>}
      <span className={`text-sm ${isUserLikedTweet && 'text-rose-600'}`}>{Number(likesCount)}</span>
    </button>
  );
};

export default LikeBtn
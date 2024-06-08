"use server";

import { AiOutlineRetweet } from "react-icons/ai";
import { BsBookmark, BsDot, BsThreeDots } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import {  FiShare } from "react-icons/fi";
import { IoMdStats } from "react-icons/io";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import LikeBtn from "./client-component/LikeBtn";
import { getLikes, isLiked } from "@/lib/supabase/queries";
import { ProfileType, TweetType } from "@/lib/db/schema";
import { profiles } from '../lib/db/schema';


dayjs.extend(relativeTime);

export type TweetProps = {
  tweet: {
    tweetDetails: TweetType,
    userProfile: ProfileType,
  }
  hasLiked:boolean,
  likesCount: number,
  currentUser: string;
};

const Tweet = async ({ tweet: data, currentUser, hasLiked, likesCount }: TweetProps) => {
  const { userProfile, tweetDetails } = data;
  return (
    <div className="border-b-[0.5px] border-gray-600 p-4 w-full flex space-x-4">
      <div>
        <div className="w-10 h-10 bg-slate-200 rounded-full" />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex items-center my-1 w-full justify-between">
          <div className="flex items-center space-x-1 ">
            <div className="font-bold">{userProfile.username}</div>
            <div className="text-gray-500">@{userProfile.username}</div>
            <div>
              <BsDot />
            </div>
            <div className="text-gray-500">
              {dayjs(tweetDetails.createdAt).fromNow()}
            </div>
          </div>
          <div>
            <BsThreeDots />
          </div>
        </div>
        <div className="text-white text-base my-1">{tweetDetails.text}</div>
        <div className="bg-slate-400 aspect-square w-full h-80 rounded-xl mt-2"></div>
        <div className="flex items-center space-x-2 w-full justify-between mt-4">
          <div className="hover:text-primary transition duration-200 p-1 cursor-pointer">
            <FaRegComment />
          </div>
          <div className="hover:text-primary transition duration-200 p-1 cursor-pointer">
            <AiOutlineRetweet />
          </div>
          <LikeBtn
            tweet={tweetDetails}
            likesCount={likesCount.toString()}
            currentUser={currentUser}
            isUserLikedTweet={hasLiked}
          />
          <div className="hover:text-primary transition duration-200 p-1 cursor-pointer">
            <IoMdStats />
          </div>
          <div className="flex items-center space-x-4">
            <div className="hover:text-primary transition duration-200 p-1 cursor-pointer">
              <BsBookmark />
            </div>
            <div className="hover:text-primary transition duration-200 p-1 cursor-pointer">
              <FiShare />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;

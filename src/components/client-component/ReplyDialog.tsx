"use client"
import React, { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaRegComment } from "react-icons/fa";
import { ProfileType, TweetType } from "@/lib/db/schema";
import { BsDot, BsThreeDots } from "react-icons/bs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { reply } from "@/lib/supabase/mutations";
import { toast } from "sonner";

dayjs.extend(relativeTime);
type ReplyDialogProps = {
  tweet: {
    tweetDetails: TweetType;
    userProfile: ProfileType;
  };
  userId: string
};
const ReplyDialog = ({tweet:data, userId}: ReplyDialogProps) => {
    const { userProfile, tweetDetails } = data;
    const [replyText, setReplyText] = useState<string>('')
    const [isReplyPending, startTransition] = useTransition()
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    return (
      <Dialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
      <DialogTrigger className="z-10" onClick={(e) => e.stopPropagation()}>
        <FaRegComment />
      </DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()} className="bg-zinc-950 border-none shadow-md text-white">
        <div className="border-b-[0.5px] border-gray-600 p-4 w-full flex space-x-4">
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
          </div>
        </div>
        <div>
          Replying to{" "}
          <span className="text-primary">@{userProfile.username}</span>
        </div>
        <div className="flex w-full items-center space-x-2">
          <div>
            <div className="w-10 h-10 bg-slate-200 rounded-full" />
          </div>
          <div className="w-full">
            <textarea
              onChange={(e) => setReplyText(e.target.value)}
              className="flex bg-black w-full rounded-md border-none border-input bg-background px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  focus-visible:ring-ring  disabled:cursor-not-allowed disabled:opacity-50"
            ></textarea>
          </div>
        </div>
        <div className="w-full justify-between items-center flex">
          <div></div>
          <div className="w-full max-w-[100px]">
            <button
              disabled={isReplyPending}
              onClick={(e) => {
                e.stopPropagation()
                startTransition(() => {
                  reply({
                    replyText,
                    tweetId:tweetDetails.id,
                    userId
                  }).then(() => {
                    toast.success("Reply send successfully")
                    setIsDialogOpen(false)
                  })
                  .catch(() => toast.error("Oops somethinmg went wrong"))
                })
              }}
              type="submit"
              className="bg-primary z-10 rounded-full text-lg font-bold px-4 py-2 w-full hover:opacity-70 transition duration-200"
            >
              Reply
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReplyDialog;

"use client";
import React, { useState } from "react";
import { DialogTrigger , Dialog, DialogContent} from "../ui/dialog";
import { toast } from "sonner";

type Props = {
  serverAction: any
}

const PostBtn = ({serverAction}:Props) => {
    const [isOpen, setisOpen] = useState<boolean>(false)
     const [input, setinput] = useState("");

     const handleSubmit = async (data: FormData) => {
       try {
         const res = await serverAction(data);
         setisOpen(false)
         if (res?.error) {
           return toast.error(res.error as string);
         } else {
           setinput("");
           toast.success("Tweet created successfully");
         }
       } catch (error) {
         toast.error(error as string);
       }
     };
  return (
    <Dialog open={isOpen} onOpenChange={setisOpen}>
      <DialogTrigger className="lg:hidden sticky flex bottom-20 left-[80%]" onClick={(e) => e.stopPropagation()}>
        <div className="bg-primary shadow-lg p-6 text-white font-extrabold text-lg sticky flex justify-center items-center bottom-20 mr-4 left-[80%] w-10 h-10 rounded-full">
          +
        </div>
      </DialogTrigger>
      <DialogContent
        onClick={(e) => e.stopPropagation()}
        className="bg-zinc-950 w-[80%] border-[0.5px] border-gray-800 shadow-md text-white"
      >
        <form action={handleSubmit} className="flex flex-col w-full">
          <input
            id="input"
            autoComplete="off"
            value={input}
            type="text"
            onChange={(e) => setinput(e.target.value)}
            name="tweet"
            placeholder="What's Happening ?"
            className="w-full h-full p-4 placeholder:text-xl placeholder:text-gray-600 border-b-[0.5px] bg-transparent outline-none border-none"
          />
          <div className="w-full justify-between items-center flex">
            <div></div>
            <div className="w-full max-w-[100px]">
              <button
                type="submit"
                className="bg-primary rounded-full text-lg font-bold px-4 py-2 w-full hover:opacity-70 transition duration-200"
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PostBtn;

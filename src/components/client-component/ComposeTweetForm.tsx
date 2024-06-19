"use client";
import { PostgrestError } from "@supabase/supabase-js";
import { useState } from "react";
import { toast } from "sonner";


type Props = {
  serverAction: any
};

const ComposeTweetForm = ({ serverAction }: Props) => {

  const [input, setinput] = useState('')
  
  const handleSubmit = async (data: FormData) => {
    try {
      const res = await serverAction(data);
      if (res?.error) {
        return toast.error(res.error.message);
      } else {
        setinput('')
        toast.success("Tweet created successfully");
        
        
      }
    } catch (error) {
      toast.error(error as string)
    }
  };

  return (
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
  );
};

export default ComposeTweetForm

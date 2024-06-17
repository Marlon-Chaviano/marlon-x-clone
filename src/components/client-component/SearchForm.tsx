"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { searchUsers } from "@/lib/supabase/queries";
import { toast } from "sonner";
import Spinner from "../ui/spinner";
import Link from "next/link";

type User = {
  id: string;
  username: string;
  updatedAt: Date;
  fullName: string | null;
};

const SearchForm = () => {
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [err, seterr] = useState("Search users and see the results here")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [following, setFollowing] = useState(false)
  return (
    <>
      <form
        action="submit"
        onSubmit={async (e) => {
          e.preventDefault();
          if (search != "" && search.length > 2) {
            setIsLoading(true)
            const formData = new FormData();
            formData.append("search", search);
            const res = await searchUsers(formData)
            setIsLoading(false)
            if (res.length == 0) {
              seterr("No mathcing results");
            } else {
              setUsers(res);
              setSearch("");
            }
          } else {
            toast.error("Please type somethin with more than 2 characters");
          }
        }}
      >
        <div className="w-full p-2 space-x-2 flex items center">
          <Input
            value={search}
            className="bg-black border-[0.5px] border-gray-700 rounded-full"
            placeholder="type something to search ..."
            onChange={(e) => {
              setSearch(e.target.value);
              seterr("");
            }}
            name="search"
          />
          <div></div>
          <button
            type="submit"
            className="bg-primary w-[200px] z-10 rounded-full text-lg font-bold px-4 py-2 hover:opacity-70 transition duration-200"
          >
            Search
          </button>
        </div>
      </form>
      <section>
        <p className="font-extrabold text-gray-300 mt-4 w-full text-center">{err}</p>
        { isLoading && <div className="w-full flex mt-4 justify-center items-center"><Spinner/></div>}
        {users.length > 0 &&
          users.map((user) => (
            <Link
              href={`profile/${user.id}`}
              key={user.id}
              className="flex py-2 hover:bg-white/10 transition px-6 space-x-2 w-full items-center first:border-t-[0.5px] justify-between border-b-[0.5px] border-gray-700 "
            >
              <div className="flex items-center space-x-2">
                <div>
                  <div className="w-10 h-10 bg-slate-200 rounded-full" />
                </div>

                <div className="font-bold text-md">
                  <p className="text-gray-700">{user.username}</p>
                  <p className="text-primary">@{user.username}</p>
                </div>
              </div>

              <div className="">
                <button disabled className="rounded-full px-6 py-2 text-neutral-950 bg-white">
                  Follow
                </button>
              </div>
            </Link>
          ))}
      </section>
    </>
  );
};

export default SearchForm;

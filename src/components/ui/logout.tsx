"use client"

import { logout } from "@/app/login/actions"
import { LogOutIcon } from "lucide-react"

const LogoutBtn = () => {
  return (
    <form
      action='submit'
      className="p-2 bg-black/20 border-[0,5px] border-red-500 rounded-full hover:bg-white/5 transition duration-200 "
      onSubmit={(e) => {
        e.preventDefault()
        logout()
      }}>
      <button className="p-2 bg-red-950 text-red-700 hover:text-red-500 border-red-700 hover:border-[1px] transition-all rounded-full">
        <LogOutIcon className=""/>
      </button>
    </form>
  )}

export default LogoutBtn
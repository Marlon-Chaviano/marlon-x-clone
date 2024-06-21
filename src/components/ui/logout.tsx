"use client"

import { logout } from "@/app/login/actions"
import { LogOutIcon } from "lucide-react"

type newClassnames = {
  classname?: string
}

const LogoutBtn = ({classname}:newClassnames) => {
  return (
    <form
      action='submit'
      className={`p-2  border-red-500 rounded-full ${classname}`}
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
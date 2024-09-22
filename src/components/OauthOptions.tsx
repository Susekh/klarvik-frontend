import conf from "@/conf/conf"
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";

function OauthOptions() {

  return (
    <div className="flex flex-col gap-4 border-b pb-8">
        <a href={`https://github.com/login/oauth/authorize?client_id=${conf.clientId}`} className="p-2 border flex justify-center items-center gap-8 w-full rounded-md hover:bg-gray-100 shadow-md"><FaGithub/>Github</a>
        <a href='#' className="p-2 border flex justify-center items-center gap-8 w-full rounded-md hover:bg-gray-100 shadow-md"><FcGoogle/>Google</a>
    </div>
  )
}

export default OauthOptions
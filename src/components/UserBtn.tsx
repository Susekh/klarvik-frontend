import { RootState } from "@/store/store";
import { UserCircle } from "lucide-react";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";

type userType = {
    id : number,
    createdAt : Date,
    username : string,
    img? : string,
    email? : string,
}

function UserBtn() {
    const res = useSelector((store : RootState) => store.user);
    const userStatus : boolean = res.status;
    const user : userType = res.userData;

    console.log("user ::",user);
    

  return (
    <>
    <div>
            {userStatus ? (
                <button>
                    {user?.img ? <img ref={`${user?.img}`}/> : <UserCircle/>}
                </button>
            ) : (
                <Link to={"/auth"}>Login</Link>
            )}
        </div>
    </>
  )
}

export default UserBtn
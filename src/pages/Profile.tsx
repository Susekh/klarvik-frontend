import { RootState } from "@/store/store"
import toast from "react-hot-toast";
import { useSelector } from "react-redux"

function Profile() {

    const res = useSelector((store : RootState) => store.user );
    const user = res.userData;

    const profileList = [
        {id : 1, title : 'username' , content : user.username},
        {id : 2, title : 'name', content : user.name},
        {id : 3, title : 'email', content : user.email},
        {id : 4, title : 'age', content : '18'},
    ]

  return (
    <>
        <div className="w-full p-12 flex items-center justify-center">
            <div className="w-84 rounded-md p-12 bg-gray-200">
                <ul className="flex flex-col gap-2">
                    {
                        profileList.map((elem) => <li key={elem.id}><p className=" font-bold capitalize">{elem.title}</p>{`${elem.content}`}</li>)
                    }
                </ul>
                <button onClick={() => toast.error("Feature soon to be added")} className="p-2 w-full bg-blue-600 text-white rounded-md mt-4 hover:bg-blue-700 duration-300">Edit</button>
            </div>
        </div>
    </>
  )
}

export default Profile
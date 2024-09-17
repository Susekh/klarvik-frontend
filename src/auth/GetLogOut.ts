import conf from "@/conf/conf";
import axios from "axios"

export default async function GetLogOut() {
    try {
        const res = await axios.get(`${conf.backendUrl}/auth/log-out-user`,
            {withCredentials : true}
        );
        console.log("res at Log out :: ", res);
        
        return res.data;

    } catch (error) {
        if(axios.isAxiosError(error)) {
            console.log("Axios Err at Logout Get :: ",error);
            return error;
        } else {
            console.log("Err at Logout Get :: ", error);
        }
    }
}
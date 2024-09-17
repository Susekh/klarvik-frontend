import conf from "@/conf/conf";
import axios from "axios"

type LogOutResponse = {
    status : string,
    errMsgs? : {
        otherErr : string
    },
    successMsg? : string
}

export default async function GetLogOut() {
    try {
        const res = await axios.get(`${conf.backendUrl}/auth/log-out-user`,
            {withCredentials : true}
        );
        console.log("res at Log out :: ", res);
        const data : LogOutResponse = res.data
        return data;

    } catch (error) {
        if(axios.isAxiosError(error)) {
            console.log("Axios Err at Logout Get :: ",error);
            return error;
        } else {
            console.log("Err at Logout Get :: ", error);
        }
    }
}
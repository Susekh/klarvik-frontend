import conf from "@/conf/conf";
import axios from "axios"

type userType = {
    id : number,
    createdAt : Date,
    username : string,
    imgUrl? : string,
    email? : string,
}

type UserLoggedInResponse = {
    status : string,
    errMsgs? : {
        otherErr : string
    },
    user? : userType,
    successMsg? : string
}


export default async function IsAuthenticated() {
    try {
        const res = await axios.get(`${conf.backendUrl}/auth/is-authenticated`,
            {withCredentials : true}
        );
        console.log("res at IsAuthenticated :: ", res);
        const data : UserLoggedInResponse = res.data
        return data;

    } catch (error) {
        if(axios.isAxiosError(error)) {
            console.log("Axios Err at IsAuthenticated :: ",error);
            return {
                status : false,
                errMsg : {
                    otherErr : error
                },
                user : ''
            };
        } else {
            console.log("Err at IsAuthenticated :: ", error);
        }
    }
}
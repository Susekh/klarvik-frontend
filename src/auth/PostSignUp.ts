import conf from "@/conf/conf";
import axios from "axios";
import toast from "react-hot-toast";

type props = {
    username : string,
    password : string,
    name : string,
    email : string,
}


type signUpResponse = {
    status : string,
    statusCode : number,
    errMsgs? :{ 
        formErr : [
        {field : "username",isErr : boolean, msg : string},
        {field : "password",isErr : boolean, msg : string},
        {field : "name",isErr : boolean, msg : string},
        {field : "email",isErr : boolean, msg : string},],
        otherErr : {isErr : boolean, msg : string}
    },
    successMsg? : {
        msg : string
    }
}

export default async function PostSignUp( formData : props) {
    try {
        const res = await axios.post<signUpResponse>(`${conf.backendUrl}/auth/sign-up-user`,
            {
                username: formData.username,
                name : formData.name,
                password : formData.password,
                email : formData.email
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );
        return res
    
    } catch (error) {
        if(axios.isAxiosError(error)){
            return {
            data : {
                status : "failed",
                statusCode : error.status,
                errMsgs : {formErr : error.response?.data.errMsgs.formErr, otherErr : {}},
                successMsg : 'failed',
                otherErr : '',
            }};
        } else {
            const toastErr = () => toast("An unkown error occured");
            toastErr();
        }
        
    }
    
}
import conf from "@/conf/conf";
import axios from "axios";
import { useEffect } from "react";



function HandleGithubOauth() {
    
    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParam = urlParams.get("code");
        console.log(codeParam);
        
        const handleGithubAuth = async () => {
          try {
            const response = await axios.post(
              `${conf.backendUrl}/auth/Oauth/github`,
              { code: codeParam },
              {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
              }
            );
            const res = response.data;
    
            if (res.status === 200) {
              console.log("Success");
            }
          } catch (error) {
            console.error("Error during GitHub OAuth:", error);
          }
        };
    
        handleGithubAuth();


    }, []);

  return (
    <div>Loading ...</div>
  )
}

export default HandleGithubOauth
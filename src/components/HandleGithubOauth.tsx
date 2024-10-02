import conf from "@/conf/conf";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



function HandleGithubOauth() {

  const navigate = useNavigate();
    
    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParam = urlParams.get("code");
        
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

            if (res.statusCode === 201) {
              navigate('/');
            }
          } catch (error) {
            console.error("Error during GitHub OAuth:", error);
            navigate('/auth');
          }
        };
    
        handleGithubAuth();


    }, [navigate]);

  return (
    <div>Loading ...</div>
  )
}

export default HandleGithubOauth
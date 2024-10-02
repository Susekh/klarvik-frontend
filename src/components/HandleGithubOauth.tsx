import conf from "@/conf/conf";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AuthShimmer from "./loaders/shimmers/AuthShimmer";



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
            toast.error("Error while authenticating through GitHub")
            navigate('/auth');
          }
        };
    
        handleGithubAuth();


    }, [navigate]);

  return (
    <AuthShimmer/>
  )
}

export default HandleGithubOauth
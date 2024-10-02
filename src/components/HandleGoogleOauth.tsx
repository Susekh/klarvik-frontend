import conf from "@/conf/conf";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



function HandleGoogleOauth() {

  const navigate = useNavigate();
    
    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParam = urlParams.get("code");
        
        const handleGoogleAuth = async () => {
          try {
            const response = await axios.post(
              `${conf.backendUrl}/auth/Oauth/google`,
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
            console.error("Error during Google OAuth:", error);
            navigate('/auth');
          }
        };
    
        handleGoogleAuth();


    }, [navigate]);

  return (
    <div>Loading ...</div>
  )
}

export default HandleGoogleOauth
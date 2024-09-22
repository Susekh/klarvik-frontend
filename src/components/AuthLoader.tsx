import { useEffect } from "react";



function AuthLoader() {
    
    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParam = urlParams.get("code");
        console.log(codeParam);
        
    }, []);

  return (
    <div>Loading ...</div>
  )
}

export default AuthLoader
export default function getGoogleOauthUrl() {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

    const options = {
        redirect_uri : 'http://localhost:5173/auth/oauth/google',
        client_id : '498337021457-r844fqnrckugnsb38orhqucmud8pl6gr.apps.googleusercontent.com',
        access_type : 'offline',
        response_type : "code",
        prompt : "consent",
        scope : [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ].join(" "),
    };

    console.log("options :: ",options);
    

    const qs = new URLSearchParams(options);

    console.log("qs ::", qs);
    
    
    return `${rootUrl}?${qs.toString()}`;
}
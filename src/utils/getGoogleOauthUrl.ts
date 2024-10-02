import conf from "@/conf/conf";

export default function getGoogleOauthUrl() {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

    const options = {
        redirect_uri : conf.redirectUriGoogle,
        client_id : conf.clientIdGoogle,
        access_type : 'offline',
        response_type : "code",
        prompt : "consent",
        scope : [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ].join(" "),
    };
    
    const qs = new URLSearchParams(options);
    
    return `${rootUrl}?${qs.toString()}`;
}
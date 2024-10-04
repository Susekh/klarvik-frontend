import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserRound } from "lucide-react";

const UserAvatar = ({ src, isLoading } : {src : string, isLoading? : boolean}) => 
    (
        <Avatar className={ isLoading ? "animate-pulse" : ""}>
            <AvatarImage src={src} referrerPolicy="no-referrer" />
            <AvatarFallback><UserRound/></AvatarFallback>
        </Avatar>
    );

export default UserAvatar
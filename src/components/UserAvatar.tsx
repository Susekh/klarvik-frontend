import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserRound } from "lucide-react";

const UserAvatar = ({ src } : {src : string}) => 
    (
        <Avatar>
            <AvatarImage src={src} />
            <AvatarFallback><UserRound/></AvatarFallback>
        </Avatar>
    );

export default UserAvatar
import { Home, User, AudioLines } from 'lucide-react'; 

export const navBar = [
    { 
        Link: "/dashboard", 
        Name: "Home",
        Icon: Home,
    },
    { 
        Link: "/recommendation", 
        Name: "Recommendations",
        Icon: AudioLines,
    },
    { 
        Link: "/profile", 
        Name: "Profile", 
        Icon: User,
    },
];

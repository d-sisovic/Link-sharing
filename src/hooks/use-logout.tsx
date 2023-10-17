import { useEffect } from "react";
import auth from "../../firebase";

export const useLogout = () => {
    useEffect(() => {
        (async () => await auth.signOut())();
    }, []); 
}
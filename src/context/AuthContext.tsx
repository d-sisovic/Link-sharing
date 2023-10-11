import auth from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { User as FirebaseUser } from "firebase/auth";
import { IBaseProp } from "../ts/models/base-prop.model";
import { useEffect, createContext, useMemo, useState } from "react";

const initialState = { isLoading: true, user: null } as { user: FirebaseUser | null, isLoading: boolean };

export const Context = createContext(initialState);

const AuthContext = ({ children }: IBaseProp) => {
    const [data, setAuthState] = useState<{ user: FirebaseUser | null, isLoading: boolean }>(initialState);

    useEffect(() => {
        const subscription = onAuthStateChanged(auth, user => (setAuthState({ user: user || null, isLoading: false })));

        return () => { subscription(); };  
    }, []);

    const value = useMemo(() => ({ ...data }), [data]);

    return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default AuthContext;

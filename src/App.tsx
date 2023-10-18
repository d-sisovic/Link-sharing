import auth from "../firebase";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";
import { setAuth } from "./store/auth-store";
import { RoutePaths } from "./ts/enums/rout-paths.enum";
import { User, onAuthStateChanged } from "firebase/auth";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const App = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const subscription = onAuthStateChanged(auth, user => {
            if (!user && !location.pathname.startsWith(`/${RoutePaths.PREVIEW}`)) { 
                navigate(`/${RoutePaths.LOGIN}`);
                return;
             }

             const { displayName, email, photoURL } = user as User;

             dispatch(setAuth({ user: { displayName, email, photoURL } || null }));
        });

        return () => { subscription(); };
    }, [dispatch, navigate, location.pathname]);

    return <Outlet></Outlet>;
}

export default App;

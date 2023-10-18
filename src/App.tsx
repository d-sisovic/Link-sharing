import auth from "../firebase";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";
import { setAuth } from "./store/auth-store";
import { RoutePaths } from "./ts/enums/rout-paths.enum";
import { User, onAuthStateChanged } from "firebase/auth";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

const nonAuthRedirectPaths = [RoutePaths.PREVIEW, RoutePaths.REGISTER];

const App = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    /**
	 * Checks if user session is already established. If not, then redirect user to login page.
	 */
    useEffect(() => {
        const subscription = onAuthStateChanged(auth, user => {
            if (!user && !nonAuthRedirectPaths.some(path => location.pathname.startsWith(`/${path}`))) { 
                navigate(`/${RoutePaths.LOGIN}`);
                return;
             }

             if (!user) {
                dispatch(setAuth({ user: null }));
                return;
             }

             const { displayName, email, photoURL } = user as User;

             dispatch(setAuth({ user: { displayName, email, photoURL } }));
        });

        return () => { subscription(); };
    }, [dispatch, navigate, location.pathname]);

    return <Outlet></Outlet>;
}

export default App;

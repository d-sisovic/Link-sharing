import { useContext } from "react";
import { Context } from "./AuthContext";

export const useAuthData = () => useContext(Context);
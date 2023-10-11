import { Navigate } from "react-router-dom";
import { Routes } from "../../ts/enums/routes.enum";
import Loading from "../../ui/components/loading/Loading";
import { useAuthData } from "../../context/AuthContextData";

const PrivateRoute = ({ component }: { component: JSX.Element }) => {
  const { user, isLoading } = useAuthData();

  if (isLoading) { return <Loading />; }

  return user ? component : <Navigate to={Routes.LOGIN} replace />
};

export default PrivateRoute;


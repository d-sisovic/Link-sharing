import { Navigate } from "react-router-dom";
import Loading from "../../ui/components/loading/Loading";
import { RoutePaths } from "../../ts/enums/rout-paths.enum";
import { useAuthData } from "../../context/AuthContextData";

const PrivateRoute = ({ component }: { component: JSX.Element }) => {
  const { user, isLoading } = useAuthData();

  if (isLoading) { return <Loading />; }

  return user ? component : <Navigate to={RoutePaths.LOGIN} replace />
};

export default PrivateRoute;


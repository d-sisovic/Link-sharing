import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../store/store";
import Loading from "../../ui/components/loading/Loading";
import { RoutePaths } from "../../ts/enums/rout-paths.enum";

const PrivateRoute = ({ component }: { component: JSX.Element }) => {
  const { user, loading } = useSelector((state: RootState) => state.auth);

  if (loading) { return <Loading />; }

  return user ? component : <Navigate to={RoutePaths.LOGIN} replace />
};

export default PrivateRoute;


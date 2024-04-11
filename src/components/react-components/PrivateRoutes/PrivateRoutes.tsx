import { Outlet, Navigate } from 'react-router-dom';

type Props = {
  isAuthenticated: boolean;
  redirectPath?: string;
};

export const PrivateRoutes = ({
  isAuthenticated,
  redirectPath = '/',
}: Props) => {
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} />;
};

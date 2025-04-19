import { useSelector } from 'react-redux';
import { Navigate, RouteProps } from 'react-router-dom';
import { isAuth } from '../utils/helper';
import { hasPermission } from '../utils/permission';

interface PrivateRouteProps extends Omit<RouteProps, 'element'> {
  element: React.ElementType;
  name?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element: Element,
  name,
  ...rest
}) => {
  const { permission } = useSelector((state: any) => state.accessManagement);
  const { moduleListByRole } = useSelector((state: any) => state.auth); 
  const checkRoutePermission = (key: string | undefined): boolean => {
    if (!key) return true;
    switch (key) {
      case 'routings':
        return hasPermission(
          moduleListByRole,
          permission?.Routings_Current_Routings_Search_Download
        );
      case 'management':
        return hasPermission(
          moduleListByRole,
          permission?.User_Role_Management
        );
      case 'reports':
        return moduleListByRole?.moduleListByRole?.some(
          (module: { screen: string; }) => module.screen.toLowerCase() === 'reports'
        );
      case 'rtc-details':
      case 'historical':
        return hasPermission(
          moduleListByRole,
          permission?.RTC_Detail_Current_RTC
        );
      default:
        return false;
    }
  };

  if (!permission || !moduleListByRole) {
  
    return <div>Loading...</div>;
  }

  return isAuth() ? (
    checkRoutePermission(name) ? (
      <Element {...rest} />
    ) : (
      <Navigate to="/no-access" replace />
    )
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;

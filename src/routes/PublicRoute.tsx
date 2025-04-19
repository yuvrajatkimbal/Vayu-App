import { Navigate } from 'react-router-dom';
import { isAuth } from 'src/utils/helper';


// Create a PublicRoute wrapper to redirect authenticated users
export const PublicRoute = ({ element: Element, ...rest }) => { 
  return !isAuth() ? <Navigate to="/" replace /> : <Element {...rest} />
};

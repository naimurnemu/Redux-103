import { useAppSelector } from '@/redux/hooks';
import { Loader } from 'lucide-react';
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface IProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: IProps) {
  const { user, isLoading } = useAppSelector((state) => state.user);
  const { pathname } = useLocation();

  if (isLoading) {
    return <Loader />;
  }

  if (!user.email && !isLoading) {
    return <Navigate to="/login" state={{ path: pathname }} />;
  }

  return children;
}

import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function MainLayout() {
  return (
    <div className='overflow-hidden'>
      <Navbar />
      <div className="pt-16">
        <Outlet />
      </div>
    </div>
  );
}

import { Link, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { DropdownMenuSeparator } from '../components/ui/dropdown-menu';
import { DropdownMenuLabel } from '../components/ui/dropdown-menu';
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '../components/ui/dropdown-menu';
import Cart from '../components/Cart';
import logo from '../assets/images/technet-logo.png';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '@/lib/firebase';
import { setUser } from '@/redux/features/user/userSlice';

export default function Navbar() {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(firebaseAuth).then(() => {
      dispatch(setUser(null));
      navigate('/login');
    });
  };

  return (
    <nav className="w-full h-16 fixed top backdrop-blur-lg z-10">
      <div className="h-full w-full bg-white/60">
        <div className="flex items-center justify-between w-full md:max-w-6xl h-full mx-auto ">
          <Link to="/">
            <img className="h-8" src={logo} alt="log" />
          </Link>
          <div>
            <ul className="flex items-center">
              <li>
                <Button variant="link" asChild>
                  <Link to="/">Home</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/products">Products</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/checkout">Checkout</Link>
                </Button>
              </li>
              <li>
                <Cart />
              </li>
              {user.email ? (
                <li className="ml-5">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        onClick={() => handleLogout()}
                        className="cursor-pointer"
                      >
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              ) : (
                <li>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none">
                      <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <Link to="/signup">
                        <DropdownMenuLabel className="cursor-pointer">
                          Sign Up
                        </DropdownMenuLabel>
                      </Link>
                      <DropdownMenuSeparator />
                      <Link to="/login">
                        <DropdownMenuLabel className="cursor-pointer">
                          Login
                        </DropdownMenuLabel>
                      </Link>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

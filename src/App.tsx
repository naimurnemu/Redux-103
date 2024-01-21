import { onAuthStateChanged } from 'firebase/auth';
import { Toaster } from './components/ui/Toaster';
import MainLayout from './layouts/MainLayout';
import { firebaseAuth } from './lib/firebase';
import { useAppDispatch } from './redux/hooks';
import { setLoading, setUser } from './redux/features/user/userSlice';
import { useEffect } from 'react';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setLoading(true))
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        dispatch(setUser(user.email!));
        dispatch(setLoading(false))
      } else {
        dispatch(setLoading(false))
      }
    });
  }, []);

  return (
    <div>
      <Toaster />
      <MainLayout />
    </div>
  );
}

export default App;

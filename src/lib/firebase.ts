import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAAABSGeIS2M0FEgWbl3pXbanDIZDx_o1A',
  authDomain: 'rdx-technet.firebaseapp.com',
  projectId: 'rdx-technet',
  storageBucket: 'rdx-technet.appspot.com',
  messagingSenderId: '150810396617',
  appId: '1:150810396617:web:a0fe67a27307975af44a18',
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);


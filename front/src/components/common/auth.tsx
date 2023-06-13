import firebaseApp from './fb-config';
import { getAuth } from 'firebase/auth';

const auth = getAuth(firebaseApp);

export default auth;
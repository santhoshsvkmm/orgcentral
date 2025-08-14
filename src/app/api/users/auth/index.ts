import { atomWithQuery } from 'jotai-tanstack-query';
import axios from 'axios';

interface Authentication {
    readonly email: string;
    readonly password: string;
}


const loginAtom = atomWithQuery<Authentication, any>({
  queryKey: ['login'],
  queryFn: async () => {
      const response = await axios.post('http://localhost:3001/login', {
        email: '',
        password: ''
      });
      return response.data;
  },
});

export { loginAtom };
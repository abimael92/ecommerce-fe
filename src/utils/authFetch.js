import { Token } from '@/api';

export async function authFetch(url, params) {
  const tokenCtrl = new Token();
  const token = tokenCtrl.getToken();

  const logout = () => {
    tokenCtrl.removeToken();
    window.location.replace('/');
  };

  if (!token) {
    logout(); // close session
  } else {
    const isExpired = tokenCtrl.hasExpired(token);
    console.log('the user toke is expired? ', isExpired);
    const daysLeftToken = tokenCtrl.expiredTimeout(token);
    console.log('how many days are left till token expires? ', daysLeftToken);

    if (isExpired) {
      // check expired
      logout();
    } else {
      const paramsTemp = {
        ...params,
        headers: {
          ...params?.headers,
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        return await fetch(url, paramsTemp);
      } catch (error) {
        return error;
      }
    }
  }
}

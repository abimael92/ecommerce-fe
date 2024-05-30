import * as Yup from 'yup';
import { format, startOfToday } from 'date-fns';

export function initialValues(user) {

  return {
    username: user?.username || '',
    email: user?.email || '',
    // password: user?.password || '',
    firstname: user?.firstname || '',
    lastname: user?.lastname || '',
    admin: user?.admin || false,
  };
}

export function validationSchema() {
  return Yup.object({
    username: Yup.string().required('username is required'),
    email: Yup.string().required('email is required'),
    // password: Yup.string().required('password is required'),
    firstname: Yup.string().required('firstname is required'),
    lastname: Yup.string().required('lastname is required'),
    admin: Yup.boolean(),
  });
}

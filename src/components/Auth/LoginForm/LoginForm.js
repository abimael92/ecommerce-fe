import { Form, Message, Dimmer, Loader } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { Auth } from '@/api';
import { useAuth } from '@/hooks';
import { initialValues, validationSchema } from './LoginForm.form';
import LoaderComponent from '@/components/Shared/Loader';
import styles from './LoginForm.module.scss';

const authCtrl = new Auth();

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      // console.log('values sent: ', formValue);

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 50000 milliseconds = 50 seconds

        const response = await authCtrl.login(formValue);
        login(response.jwt);

        router.push('/');
        formik.setSubmitting(false);

      } catch (error) {
        console.error(error);
        const errorMessage =
          error?.response?.data?.error?.message ||
          'Invalid email/username or password';

        formik.setSubmitting(false);
        formik.setStatus({ loginError: errorMessage });
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      {formik.status?.loginError && (
        <Message negative>
          <Message.Header>Login Failed</Message.Header>
          <p style={{ color: 'red' }}>{formik.status.loginError}</p>
        </Message>
      )}

      <LoaderComponent
        active={formik.isSubmitting}
        secondaryText="Best Games are now loading"
      />

      <Form.Input
        name="identifier"
        type="text"
        placeholder="Email or Username"
        value={formik.values.identifier}
        onChange={formik.handleChange}
        error={formik.errors.identifier}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.password}
      />

      <Form.Button
        className={`${styles.glowHover}`}
        type="submit"
        fluid
        loading={formik.isSubmitting}
      >
        Login <span className="icon">&rarr;</span>
      </Form.Button>
    </Form>
  );
}

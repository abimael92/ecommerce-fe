import { Form } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { User } from '@/api';
import { useAuth } from '@/hooks';
import { initialValues, validationSchema } from './ChangePasswordForm.form';
import styles from './ChangePasswordForm.module.scss';

const userCtrl = new User();

export function ChangePasswordForm() {
  const { user, logout } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await userCtrl.updateMe(user.id, { password: formValue.password });
        logout();
      } catch (error) {
        throw error;
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className={styles.form}>
      <label>Change password</label>
      <Form.Input
        type="password"
        name="password"
        placeholder="New password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <Form.Input
        type="password"
        name="repeatPassword"
        placeholder="Repeat password"
        value={formik.values.repeatPassword}
        onChange={formik.handleChange}
        error={formik.errors.repeatPassword}
      />
      <Form.Button type="submit" loading={formik.isSubmitting}>
        Submit
      </Form.Button>
    </Form>
  );
}

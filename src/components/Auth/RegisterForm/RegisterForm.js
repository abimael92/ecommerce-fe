import { useState } from 'react';
import { Form, Message } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { Auth } from '@/api';
import { initialValues, validationSchema } from './RegisterForm.form';
import LoaderComponent from '@/components/Shared/Loader';

const authCtrl = new Auth();

export function RegisterForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      // console.log('values sent for register: ', formValue);
      setIsSubmitting(true);

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 50000 milliseconds = 50 seconds

        const response = await authCtrl.register(formValue);

        console.log('Register success');
        router.push('/join/sign-in');
      } catch (error) {
        console.error(error?.error);
        const errorMessage = error?.error?.message || 'Invalid Register data';

        formik.setSubmitting(false);
        formik.setStatus({ registerError: errorMessage });
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      {/* Register Error */}
      {formik.status?.registerError && (
        <Message negative>
          <Message.Header>Register Failed</Message.Header>
          <p style={{ color: 'red' }}>{formik.status.registerError}</p>
        </Message>
      )}

      <LoaderComponent
        active={formik.isSubmitting}
        secondaryText="Please wait while we process your registration."
      />

      <Form.Group widths="equal">
        <Form.Input
          name="email"
          type="text"
          placeholder="Email "
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
        />
        <Form.Input
          name="username"
          type="text"
          placeholder="Username  "
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.errors.username}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          name="name"
          type="text"
          placeholder="Full Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.errors.name}
        />
        <Form.Input
          name="password"
          type="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password}
        />
      </Form.Group>

      <Form.Button type="submit" fluid loading={formik.isSubmitting}>
        Register
      </Form.Button>
    </Form>
  );
}

import { Form } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { Auth } from '@/api';
import { useAuth } from '@/hooks';
import { initialValues, validationSchema } from './LoginForm.form';
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
			try {
				const response = await authCtrl.login(formValue);
				login(response.jwt);

				// router.push("/");
			} catch (error) {
				console.error(error);
			}
		},
	});

	return (
		<Form onSubmit={formik.handleSubmit}>
			<Form.Input
				name='identifier'
				type='text'
				placeholder='Email or Username'
				value={formik.values.identifier}
				onChange={formik.handleChange}
				error={formik.errors.identifier}
			/>
			<Form.Input
				name='password'
				type='password'
				placeholder='Password'
				value={formik.values.password}
				onChange={formik.handleChange}
				error={formik.errors.password}
			/>

			<Form.Button
				className={`${styles.glowHover}  `}
				type='submit'
				fluid
				loading={formik.isSubmitting}>
				Login <span className='icon'>&rarr;</span>
			</Form.Button>
		</Form>
	);
}

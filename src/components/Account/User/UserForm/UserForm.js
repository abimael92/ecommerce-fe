import React, { useEffect, useState } from 'react';
import { Button, Form, Message, Icon } from 'semantic-ui-react';
import { useFormik } from "formik";
import { User as UserCtrl } from '@/api';
import LoaderComponent from '@/components/Shared/Loader';
import { initialValues, validationSchema } from "./UserForm.form";
import styles from './UserForm.module.scss';

const userCtrl = new UserCtrl();

export function UserForm(props) {
  const { onClose, onReload, user } = props;
  const [open, setOpen] = useState(false);
  const [initialFormValues, setInitialFormValues] = useState(initialValues(user)); // Define initialFormValues state

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {

      const changedValues = getChangedValues(initialFormValues, formValue);

      try {
        if (user) {
          // Update user if user prop is provided
          await userCtrl.updateUser(user.id, changedValues);
        } else {
          // Create new user
          await userCtrl.createUser(formValue);
        }

        formik.handleReset();
        onReload();
        onClose();
      } catch (error) {

        formik.setSubmitting(false);
        formik.setStatus({ userError: error ? error : 'An error occurred. Please try again later.' });

      }

    },
  });

  const getChangedValues = (initialValues, currentValues) => {
    const changedValues = {};
    for (const key in currentValues) {
      if (currentValues[key] !== initialValues[key]) {
        changedValues[key] = currentValues[key];
      }
    }
    return changedValues;
  };

  const handleInputChange = (event, { name, value, checked, type }) => {
    const inputValue = type === 'checkbox' ? !!checked : value;
    formik.setFieldValue(name, inputValue);
  };

  function getErrorMessage(result) {
    console.log('Raw error message:', result.message);

    let errorMessage = {
      name: "UnknownError",
      errorMessages: ["An unexpected error occurred."]
    };

    try {
      const errorObject = JSON.parse(result.message);
      console.log('Parsed Message:', errorObject);

      if (errorObject.name) {
        errorMessage.name = errorObject.name;
      }

      if (errorObject.message) {
        errorMessage.errorMessages = [errorObject.message];
      }

      if (errorObject.details && Array.isArray(errorObject.details.errors)) {
        errorMessage.errorMessages = []; // Reset errorMessages to avoid default message
        errorObject.details.errors.forEach((err) => {
          errorMessage.errorMessages.push(err.message);
        });
      }

    } catch (e) {
      console.error('Error parsing JSON:', e);
    }

    console.log('Formatted Error Message:', errorMessage);
    return errorMessage;
  }


  return (
    <>
      <Icon
        name="close"
        onClick={onClose}
        style={{
          position: 'absolute', top: '10px', right: '10px',
          cursor: 'pointer', color: 'red', fontSize: ' x-large',
        }}
      />

      <Form className={styles.gameForm} onSubmit={formik.handleSubmit}>

        {formik.status?.userError && (
          <Message negative>
            <Message.Header>Login Failed</Message.Header>
            {(() => {
              const errorInfo = getErrorMessage(formik.status.userError);
              return (
                <>
                  <div className={styles.errorContainer}>

                    <h3>{errorInfo.name}</h3>
                  </div>
                  <div className={styles.errorContainer2}>
                    <ul>
                      {errorInfo.errorMessages.map((msg, index) => (
                        <li key={index}>{msg}</li>
                      ))}
                    </ul></div>
                </ >
              );
            })()}
          </Message>
        )}



        {formik.isSubmitting && (
          <LoaderComponent
            active={formik.isSubmitting}
            secondaryText="Creating the new user. Please wait, it won't take long!"
          />
        )}

        <Form.Group widths="equal">
          <Form.Input
            label="Username"
            name="username"
            type="text"
            placeholder="Username"
            value={formik.values.username}
            onChange={handleInputChange}
            error={formik.touched.username && formik.errors.username}
          />

          <Form.Input
            label="Email"
            name="email"
            type="text"
            placeholder="Email"
            value={formik.values.email}
            onChange={handleInputChange}
            error={formik.touched.email && formik.errors.email}
          />
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Input
            label="First Name"
            name="firstname"
            type="text"
            placeholder="First Name"
            value={formik.values.firstname}
            onChange={handleInputChange}
            error={formik.touched.firstname && formik.errors.firstname}
          />

          <Form.Input
            label="Last Name"
            name="lastname"
            type="text"
            placeholder="Last Name"
            value={formik.values.lastname}
            onChange={handleInputChange}
            error={formik.touched.lastname && formik.errors.lastname}
          />
        </Form.Group>

        <Form.Field style={{ textAlign: 'right', marginTop: '30px' }}>
          <label style={{ marginRight: '10px' }}>Set this user as Admin?</label>
          <Form.Checkbox
            name="admin"
            checked={formik.values.admin}
            onChange={handleInputChange}
            error={formik.touched.admin && formik.errors.admin}
          />
        </Form.Field>

        <Form.Button type="submit" fluid loading={formik.isSubmitting}>
          Submit
        </Form.Button>
      </Form >
    </>
  );

}

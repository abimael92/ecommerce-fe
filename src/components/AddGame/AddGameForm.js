import React, { useEffect, useState } from 'react';
import { Form, Message, Image, Label, Input } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { validationSchema, initialValues } from './AddGameForm.form';

import { Game } from '@/api';

import LoaderComponent from '@/components/Shared/Loader';
import styles from './AddGameForm.module.scss';

const gameCtrl = new Game();

export default function AddGameForm() {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      console.log('values sent: ', formValue);

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 50000 milliseconds = 50 seconds

        const response = await gameCtrl.postGame(formValue);
        // log

        console.log('game', response);

        console.log(
          'Timeout triggered. Navigating and completing form submission.',
        );
        // router.push('/');
        formik.setSubmitting(false);

        console.log('login successful');
      } catch (error) {
        console.error(error);
        const errorMessage =
          error?.response?.data?.error?.message ||
          'Invalid email/username or password';

        formik.setSubmitting(false);
        // formik.setStatus({ loginError: errorMessage });
      }
    },
  });

  const formatDate = (dateString) => {
    // Assuming dateString is in "ddMMyyyy" format
    const day = dateString.slice(0, 2);
    const month = dateString.slice(2, 4);
    const year = dateString.slice(4, 8);

    return `${year}-${month}-${day}`; // Format as "yyyy-MM-dd"
  };

  const handleTitleChange = (event) => {
    const title = event.target.value;
    const slug = generateSlug(title);
    formik.setValues({
      ...formik.values,
      title: title,
      slug: slug,
    });
  };

  const generateSlug = (title) => {
    return title.trim().toLowerCase().replace(/\s+/g, '-');
  };

  const handleReleaseDateChange = (event) => {
    const { name, value } = event.target;
    const formattedDate = formatDate(value); // Format the date to "yyyy-MM-dd"
    formik.setFieldValue(name, formattedDate);
  };

  const handleFileUpload = (event, fieldName) => {
    const file = event.target.files[0];
    formik.setFieldValue(fieldName, file);
  };

  const handleScreenShotsUpload = (event, fieldName) => {
    const files = event.target.files;
    formik.setFieldValue(fieldName, [...formik.values[fieldName], ...files]);
  };

  <Form.Input
    label="Release Date"
    name="releaseDate"
    type="date"
    value={formik.values.releaseDate}
    onChange={handleReleaseDateChange} // Use the custom function to handle date change
    error={formik.touched.releaseDate && formik.errors.releaseDate}
  />;

  return (
    <div className={styles.info}>
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

        <Form.Group widths="equal">
          <Form.Input
            label="Title"
            name="title"
            type="text"
            placeholder="Title"
            value={formik.values.title}
            onChange={(e) => {
              handleTitleChange(e);
            }}
            error={formik.touched.title && formik.errors.title}
          />
          <Form.Input
            label="Slug"
            name="slug"
            type="text"
            placeholder="Slug"
            value={formik.values.slug}
            readOnly
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            label="Price"
            name="price"
            type="number"
            // min="0"
            placeholder="Price"
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && formik.errors.price}
          />
          <Form.Input
            label="Discount"
            name="discount"
            type="number"
            // min="0"
            placeholder="Discount"
            value={formik.values.discount}
            onChange={formik.handleChange}
            error={formik.touched.discount && formik.errors.discount}
          />
        </Form.Group>
        <Form.TextArea
          className={styles.textArea}
          label="Summary"
          name="summary"
          placeholder="Summary"
          value={formik.values.summary}
          onChange={formik.handleChange}
          error={formik.touched.summary && formik.errors.summary}
        />
        <Form.Group widths="equal">
          <Form.Input
            label="Platform"
            name="platform"
            type="text"
            placeholder="Platform"
            value={formik.values.platform}
            onChange={formik.handleChange}
            error={formik.touched.platform && formik.errors.platform}
          />
          <Form.Input
            label="Release Date"
            name="releaseDate"
            type="date"
            value={formik.values.releaseDate}
            onChange={formik.handleChange}
            error={formik.touched.releaseDate && formik.errors.releaseDate}
          />
        </Form.Group>
        <Form.Field>
          <label>Cover Image</label>
          <Input
            className={styles.customFileInput}
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, 'cover')}
          />
          {
            // formik.touched.cover &&
            // formik.errors.cover &&
            formik.values.cover ? (
              <div>
                <Label pointing="above">Cover Image Preview</Label>
                <Image
                  src={URL.createObjectURL(formik.values.cover)}
                  size="small"
                />
              </div>
            ) : null
          }
        </Form.Field>
        <Form.Field>
          <label>Wallpaper Image</label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, 'wallpaper')}
          />
          {
            // formik.touched.wallpaper &&
            // formik.errors.wallpaper &&
            formik.values.wallpaper ? (
              <div>
                <Label pointing="above">Wallpaper Image Preview</Label>
                <Image
                  src={URL.createObjectURL(formik.values.wallpaper)}
                  size="small"
                />
              </div>
            ) : null
          }
        </Form.Field>
        <Form.Field>
          <label>Screenshots</label>
          <Input
            type="file"
            accept="image/*"
            multiple // Allow multiple file selection
            onChange={(e) => handleScreenShotsUpload(e, 'screenshots')}
          />

          {/* Display selected screenshots */}
          {formik.values.screenshots &&
            formik.values.screenshots?.map((screenshot, index) => (
              <div key={index}>
                <Label pointing="above">{screenshot.name}</Label>
                <Image src={URL.createObjectURL(screenshot)} size="small" />
              </div>
            ))}
        </Form.Field>

        <Form.Button type="submit" fluid loading={formik.isSubmitting}>
          Login
        </Form.Button>
      </Form>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { Form, Message, Image, Label, Input } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { validationSchema, initialValues } from './AddGameForm.form';

import { Game, Platform } from '@/api';

import LoaderComponent from '@/components/Shared/Loader';
import styles from './AddGameForm.module.scss';

const gameCtrl = new Game();
const platformCtrl = new Platform();

export default function AddGameForm() {
  const router = useRouter();
  const [platforms, setPlatforms] = useState(null);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,

    onSubmit: async (formValue) => {

      // console.log('values sent: ', formValue);
      formValue.platform = { id: formValue.platform };

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 50000 milliseconds = 50 seconds

        const response = await gameCtrl.postGame(formValue);

        // console.log('Game Post was Successful: ', response);

        router.push('/');
        formik.setSubmitting(false);

      } catch (error) {
        console.error(error);
        const errorMessage =
          error?.response?.data?.error?.message ||
          'Failed to add game. Please try again later.';

        formik.setSubmitting(false);
        formik.setStatus({ gameError: errorMessage });
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
    // console.log('Selected file:', file);

    formik.setFieldValue(fieldName, file);
  };

  const handleScreenShotsUpload = (event, fieldName) => {
    const files = event.target.files;
    formik.setFieldValue(fieldName, [...formik.values[fieldName], ...files]);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await platformCtrl.getAll();
        // console.log('res', response);

        // Extract titles from the response
        const platformOptions = response.data.map(platform => ({
          id: platform.id,
          title: platform.attributes.title
        }));

        // Now you can use the titles array in your application
        // console.log('this are the titles: ', platformOptions);

        // Populate the dropdown list with titles
        setPlatforms(platformOptions);

      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className={styles.info}>
      <Form onSubmit={formik.handleSubmit}>
        {formik.status?.gameError && (
          <Message negative>
            <Message.Header>Login Failed</Message.Header>
            <p style={{ color: 'red' }}>{formik.status.gameError}</p>
          </Message>
        )}

        <LoaderComponent
          active={formik.isSubmitting}
          secondaryText="Uploading your new game. Sit tight, it won't take long!"
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
            min="0"
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

          <Form.Dropdown
            label="Platform"
            id="platform"
            name="platform"
            placeholder="Select a platform"
            value={formik.values.platform || ''} // Ensure value is either null/undefined or a valid value
            options={[
              { key: 'select', text: 'Select a platform', value: '' }, // Ensure the placeholder option has an empty string value
              ...(platforms
                ? platforms.map(platform => ({ key: platform.id, text: platform.title, value: platform.id }))
                : [])
            ]}
            onChange={(e, { value }) => formik.setFieldValue('platform', value)}
            onBlur={formik.handleBlur}
            className={styles.dropdown}
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

        <Form.Input
          label="Video/Trailer Link"
          name="video"
          type="text"
          placeholder="Add Link"
          value={formik.values.video}
          onChange={formik.handleChange}
          error={formik.touched.video && formik.errors.video}
        />

        <Form.Field>
          <label>Cover Image</label>
          <Input
            className={styles.customFileInput}
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, 'cover')}
          />

          {/* // formik.touched.cover &&
            // formik.errors.cover && */}
          {/* {formik.values.cover ? ( */}
          {formik.values.cover && formik.values.cover instanceof File ? (
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

          {/* // formik.touched.wallpaper &&
            // formik.errors.wallpaper && */}
          {/* { formik.values.wallpaper ? ( */}
          {formik.values.wallpaper && formik.values.wallpaper instanceof File ? (
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
                {/* {console.log(screenshot)} */}
                {screenshot && screenshot instanceof File && (
                  <div>
                    <Label pointing="above">{screenshot.name}</Label>
                    <Image src={URL.createObjectURL(screenshot)} size="small" />
                  </div>
                )}
              </div>
            ))}
        </Form.Field>

        <Form.Button type="submit" fluid loading={formik.isSubmitting}>
          Submit
        </Form.Button>
      </Form>
    </div >
  );
}

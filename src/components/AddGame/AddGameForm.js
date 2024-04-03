import { Form, Button, Image, Label, Input } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { validationSchema, initialValues } from './AddGameForm.form';
import styles from './AddGameForm.module.scss';

export default function AddGameForm({ onSubmit }) {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    onSubmit: async (values, { setSubmitting }) => {
      console.log('Submitting form with values:', values); // Add this line
      onSubmit(values);
      // try {
      //   await onSubmit(values);
      //   formik.handleReset();
      // } catch (error) {
      //   console.error(error);
      // }
      // setSubmitting(false);
    },
  });

  const handleFileUpload = (event, fieldName) => {
    const file = event.target.files[0];
    formik.setFieldValue(fieldName, file);
  };

  const handleScreenShotsUpload = (event, fieldName) => {
    const files = event.target.files;
    formik.setFieldValue(fieldName, [...formik.values[fieldName], ...files]);
  };

  const generateSlug = (title) => {
    return title.trim().toLowerCase().replace(/\s+/g, '-');
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

  return (
    <div className={styles.info}>
      <Form onSubmit={formik.handleSubmit}>
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
            min="0"
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
          {formik.values.cover && (
            <div>
              <Label pointing="above">Cover Image Preview</Label>
              <Image
                src={URL.createObjectURL(formik.values.cover)}
                size="small"
              />
            </div>
          )}
        </Form.Field>
        <Form.Field>
          <label>Wallpaper Image</label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, 'wallpaper')}
          />
          {formik.values.wallpaper && (
            <div>
              <Label pointing="above">Wallpaper Image Preview</Label>
              <Image
                src={URL.createObjectURL(formik.values.wallpaper)}
                size="small"
              />
            </div>
          )}
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

        <Button type="submit">Add Game</Button>

        {/* <Button
          type="submit"
          onClick={formik.handleSubmit}
          disabled={formik.isSubmitting}
        >
          Add Game
        </Button> */}
      </Form>
    </div>
  );
}

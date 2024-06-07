import React, { useEffect, useState } from 'react';
import { Button, Form, Message, Image, Label, Input, Icon, Confirm } from 'semantic-ui-react';
import { useFormik } from "formik";
import { Game, Platform } from '@/api';

import LoaderComponent from '@/components/Shared/Loader';
import { initialValues, validationSchema } from "./GameForm.form";
import styles from './GameForm.module.scss';

const gameCtrl = new Game();
const platformCtrl = new Platform();

export function GameForm(props) {
  const { onClose, onReload, gameId, game } = props;
  const [platforms, setPlatforms] = useState(null);
  const [videoError, setVideoError] = useState('');
  const [initialFormValues, setInitialFormValues] = useState(initialValues(game));
  const [screenshotsList, setScreenshotsList] = useState(initialValues(game));
  const [open, setOpen] = useState(false);
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);


  const formik = useFormik({
    initialValues: initialValues(game),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      // console.log('values sent: ', formValue);
      formValue.platform = { id: formValue.platform };
      const changedValues = getChangedValues(initialFormValues, formValue);

      try {

        if (gameId) {

          if (Object.keys(changedValues).length > 0) {
            await gameCtrl.putGame(changedValues, gameId);

          } else {
            console.log('No changes detected.');
          }

        } else {

          await gameCtrl.postGame(formValue);
        }

        formik.handleReset();
        onReload();
        onClose();

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

  const getChangedValues = (initialValues, currentValues) => {
    const changedValues = {};
    for (const key in currentValues) {
      if (currentValues[key] !== initialValues[key]) {
        changedValues[key] = currentValues[key];
      }
    }
    return changedValues;
  };

  const formatDate = (dateString) => {
    // Assuming dateString is in "ddMMyyyy" format
    const day = dateString.slice(0, 2);
    const month = dateString.slice(2, 4);
    const year = dateString.slice(4, 8);

    return `${year}-${month}-${day}`; // Format as "yyyy-MM-dd"
  };

  const {
    title,
    slug,
    price,
    discount,
    platform,
    summary,
    releaseDate,
    video,
    cover,
    wallpaper,
    screenshots
  } = formik.values;

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
    const files = Array.from(event.target.files);
    // console.log('Selected files:', files);

    // Ensure formik.values[fieldName] is an array
    const currentScreenshots = Array.isArray(formik.values[fieldName]) ? formik.values[fieldName] : [];

    // Combine the current screenshots with the new files
    const updatedScreenshots = [...currentScreenshots, ...files];

    // Update the state and formik value with the new list of screenshots
    setScreenshotsList(updatedScreenshots);
    formik.setFieldValue(fieldName, updatedScreenshots);
  };

  const handleDeleteScreenshot = (screenshot) => {
    // Remove the deleted screenshot from formik values
    setScreenshotsList(screenshots.filter((s) => s !== screenshot));
    formik.setFieldValue('screenshots', screenshotsList);
    setOpen(false);
  };

  const handleConfirmDelete = (screenshot) => {
    setSelectedScreenshot(screenshot);
    setOpen(true);
  };

  const extractVideo = (url) => {
    const standardRegex = /^https:\/\/www\.youtube\.com\/watch\?v=([^&]+)/;
    const shortRegex = /^https:\/\/youtu\.be\/([^?]+)/;
    const standardMatch = url.match(standardRegex);
    const shortMatch = url.match(shortRegex);

    if (standardMatch) return standardMatch[1];
    if (shortMatch) return shortMatch[1];

    return null;
  };

  const showVideo = extractVideo(video);

  const extractImage = (img) => {
    const extractedImg = {
      id: img?.id ?? '',
      name: img?.attributes?.name ?? 'Not Found',
      thumbnailUrl: img?.attributes?.formats?.thumbnail?.url ?? '/images/not-found.jpeg',
    };

    return extractedImg;
  };




  useEffect(() => {
    (async () => {
      try {
        const response = await platformCtrl.getAll();
        // console.log('res', response);

        const platformOptions = response.data.map(platform => ({
          id: platform.id,
          title: platform.attributes.title
        }));
        // console.log('this are the titles: ', platformOptions);
        setPlatforms(platformOptions);

        // Set initial platform value if game data exists
        if (game?.platform?.data?.id) {
          formik.setFieldValue('platform', game.platform.data.id);
        }

      } catch (error) {
        console.error(error);
      }
    })();
  }, [game]);

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
        {formik.status?.gameError && (
          <Message negative>
            <Message.Header>Submit Failed</Message.Header>
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
            value={title}
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
            value={slug}
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
            value={price}
            onChange={formik.handleChange}
            error={formik.touched.price && formik.errors.price}
          />

          <Form.Input
            label="Discount"
            name="discount"
            type="number"
            // min="0"
            placeholder="Discount"
            value={discount}
            onChange={formik.handleChange}
            error={formik.touched.discount && formik.errors.discount}
          />
        </Form.Group>

        <Form.TextArea
          className={styles.textArea}
          label="Summary"
          name="summary"
          placeholder="Summary"
          value={summary}
          onChange={formik.handleChange}
          error={formik.touched.summary && formik.errors.summary}
        />

        <Form.Group widths="equal">

          <Form.Dropdown
            label="Platform"
            id="platform"
            name="platform"
            placeholder="Select a platform"
            value={platform || ''} // Ensure value is either null/undefined or a valid value
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
            value={releaseDate}
            onChange={formik.handleChange}
            error={formik.touched.releaseDate && formik.errors.releaseDate}
          />
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Input
            label="Video/Trailer Link"
            name="video"
            type="text"
            placeholder="Add Link"
            value={video}
            onChange={formik.handleChange}
            error={formik.touched.video && formik.errors.video}
          />

        </Form.Group>

        {videoError && <Message negative>{videoError}</Message>}

        {showVideo && (
          <div className={styles.videoPreviewContainer}>
            <iframe
              className={styles.videoPreview}
              src={`https://www.youtube.com/embed/${showVideo}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        <Form.Field>
          <label>Cover Image</label>
          <Input
            className={styles.customFileInput}
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, 'cover')}
          />

          {cover && cover instanceof File ? (
            <div>
              <Label pointing="above">Cover Image Preview</Label>
              <Image
                src={URL.createObjectURL(cover)}
                size="small"
              />
            </div>
          ) : (
            cover && (
              <div className={styles.imageGrid}>
                {(() => {
                  const extractedImage = extractImage(cover);
                  return (
                    <div className={styles.imageGridItem}>
                      <Image src={extractedImage.thumbnailUrl} size="small" />
                      <Label pointing="above">{extractedImage.name}</Label>
                    </div>
                  );
                })()}
              </div>
            )
          )}
        </Form.Field>

        <Form.Field>
          <label>Wallpaper Image</label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, 'wallpaper')}
          />

          {wallpaper && wallpaper instanceof File ? (
            <div>
              <Label pointing="above">Wallpaper Image Preview</Label>
              <Image
                src={URL.createObjectURL(wallpaper)}
                size="small"
              />
            </div>
          ) : (
            wallpaper && (
              <div className={styles.imageGrid}>
                {(() => {
                  const extractedImage = extractImage(wallpaper);
                  return (
                    <div className={styles.imageGridItem}>
                      <Image src={extractedImage.thumbnailUrl} size="small" />
                      <Label pointing="above">{extractedImage.name}</Label>
                    </div>
                  );
                })()}
              </div>
            )
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
          {Array.isArray(screenshots) && screenshots.map((screenshot, index) => (
            <div key={`${index}_grid`} className={styles.imageGrid}>
              <div key={`${index}_gridItem`} className={styles.imageGridItem}>
                {screenshot && screenshot instanceof File ? (
                  <div>
                    <Image src={URL.createObjectURL(screenshot)} size="small" />
                    <Label pointing="above">{screenshot.name}</Label>
                  </div>
                ) : (
                  screenshot && (
                    <div className={styles.imageGridItem}>
                      {(() => {
                        const extractedImage = extractImage(screenshot);
                        return (
                          <>
                            <div >
                              <Icon
                                name="delete"
                                color="red"
                                className={styles.trashIcon}
                                link
                                onClick={() => handleConfirmDelete(screenshot)}
                              />
                            </div>
                            <Image src={extractedImage.thumbnailUrl} size="small" />
                            <Label pointing="above" className={styles.imageLabel}>{extractedImage.name}</Label>
                          </>
                        );
                      })()}
                    </div>
                  )
                )}
              </div>
            </div>
          ))}

          <Confirm
            open={open}
            onCancel={() => setOpen(false)}
            onConfirm={() => handleDeleteScreenshot(selectedScreenshot)}
            content="Are you sure you want to delete this screenshot?"
          />
        </Form.Field>

        <Form.Button type="submit" fluid loading={formik.isSubmitting}>
          Submit
        </Form.Button>
      </Form >
    </>
  );
}

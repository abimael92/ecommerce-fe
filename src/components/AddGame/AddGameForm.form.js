import * as Yup from 'yup';

export function initialValues() {
  return {
    title: '',
    platform: '',
    price: 0,
    discount: 0,
    slug: '',
    summary: '',
    video: null, // Assuming video is a file, initialize as null
    cover: null, // Assuming cover image is a file, initialize as null
    wallpaper: null, // Assuming wallpaper image is a file, initialize as null
    screenshots: [], // Assuming screenshots is an array of files, initialize as empty array
    releaseDate: new Date().toISOString().substr(0, 10),
  };
}

export function validationSchema() {
  return Yup.object({
    title: Yup.string().required('Title is required'),
    platform: Yup.string().required('Platform is required'),
    price: Yup.number()
      .required('Price is required')
      .min(0, 'Price must be a positive number'),
    discount: Yup.number()
      .required('Discount is required')
      .min(0, 'Discount must be a positive number'),
    slug: Yup.string().required('Slug is required'),
    summary: Yup.string().required('Summary is required'),
    video: Yup.string().required('Video is required'),
    cover: Yup.string().required('Cover is required'),
    wallpaper: Yup.string().required('Wallpaper is required'),
    screenshots: Yup.string().required('Screenshots are required'),
    releaseDate: Yup.date().required('Release date is required'),
  });
}

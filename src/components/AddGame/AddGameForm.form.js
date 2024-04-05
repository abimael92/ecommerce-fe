import * as Yup from 'yup';
import { format, startOfToday } from 'date-fns';

export function initialValues() {
  // const today = format(startOfToday(), 'ddMMyyyy');
  const today = format(startOfToday(), 'yyyy-MM-dd');
  return {
    title: '',
    slug: '',
    price: 0,
    discount: null,
    platform: '',
    summary: '',
    releaseDate: today,
    cover: '',
    wallpaper: '',
    screenshots: [],
  };
}

export function validationSchema() {
  const discountSchema = Yup.number().positive(
    'Discount must be a positive value',
  );

  return Yup.object({
    title: Yup.string().required('Title is required'),
    slug: Yup.string().required('Slug is required'),
    price: Yup.number()
      .required('Price is required')
      .positive('Price must be a positive value')
      .typeError('Price must be a number'),
    platform: Yup.string().required('Platform is required'),
    summary: Yup.string().required('Summary is required'),
    releaseDate: Yup.date().required('Release date is required'),
    discount: Yup.number()
      .nullable() // Allow null for discount
      .positive('Discount must be a positive value')
      .max(100, 'Discount must be between 1 and 100')
      .typeError('Discount must be a number'),
    cover: Yup.mixed().required('Cover image is required'),
    wallpaper: Yup.mixed().required('Wallpaper image is required'),
    screenshots: Yup.array()
      .of(Yup.mixed())
      .required('At least one screenshot is required'),
  });
}

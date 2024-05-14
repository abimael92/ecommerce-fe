import { Form, Icon } from 'semantic-ui-react';
import { useFormik } from "formik";
import { Address } from "@/api";
import { useAuth } from "@/hooks";
import { initialValues, validationSchema } from "./AddressForm.form";

const addressCtrl = new Address();

export function AddressForm(props) {
  const { onClose, onReload, addressId, address } = props;
  const { user } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(address),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      // console.log(user.id);
      try {
        if (addressId) {
          await addressCtrl.update(formValue, addressId);
        } else {
          await addressCtrl.create(formValue, user.id);
        }

        // formValue.platform = { id: formValue.platform };
        formik.handleReset();
        onReload();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

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

      <Form onSubmit={formik.handleSubmit}>
        <Form.Input
          name="title"
          placeholder="Address Alias"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.errors.title}
        />

        <Form.Group widths="equal">
          <Form.Input
            name="name"
            placeholder="Full name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.errors.name}
          />
          <Form.Input
            name="address"
            placeholder="Address"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.errors.address}
          />
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Input
            name="state"
            placeholder="State"
            value={formik.values.state}
            onChange={formik.handleChange}
            error={formik.errors.state}
          />
          <Form.Input
            name="city"
            placeholder="City"
            value={formik.values.city}
            onChange={formik.handleChange}
            error={formik.errors.city}
          />
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Input
            name="postal_code"
            placeholder="Postal code"
            value={formik.values.postal_code}
            onChange={formik.handleChange}
            error={formik.errors.postal_code}
          />
          <Form.Input
            name="phone"
            placeholder="Phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.errors.phone}
          />
        </Form.Group>

        <Form.Button type="submit" fluid loading={formik.isSubmitting}>
          Submit
        </Form.Button>
      </Form></>
  );
}

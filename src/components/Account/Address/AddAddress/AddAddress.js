import { useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import { BasicModal } from "@/components/Shared";
import { AddressForm } from "../AddressForm";
import styles from "./AddAddress.module.scss";

export function AddAddress(props) {
  const { onReload } = props;
  const [show, setShow] = useState(false);

  const onOpenClose = () => setShow((prevState) => !prevState);

  return (
    <>
      <Button primary className={styles.addBtn} onClick={onOpenClose}>
        <Icon name="add" style={{ marginLeft: '5px' }} /> Create
      </Button>

      <BasicModal show={show} onClose={onOpenClose} title="New address">
        <AddressForm onClose={onOpenClose} onReload={onReload} />
      </BasicModal>
    </>
  );
}

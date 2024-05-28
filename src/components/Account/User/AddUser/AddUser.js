import { useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import { BasicModal } from "@/components/Shared";
import { UserForm } from "../UserForm";
import styles from "./AddUser.module.scss";

export function AddUser(props) {
  const { onReload } = props;
  const [show, setShow] = useState(false);

  const onOpenClose = () => setShow((prevState) => !prevState);

  return (
    <>
      <Button primary className={styles.addBtn} onClick={onOpenClose}>
        <Icon name="add" style={{ marginLeft: '5px' }} /> Create User
      </Button>

      <BasicModal show={show} onClose={onOpenClose} title="New user">
        <UserForm onClose={onOpenClose} onReload={onReload} />
      </BasicModal>
    </>
  );
}

import { useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import { BasicModal } from "@/components/Shared";
import { GameForm } from "../GameForm";
import styles from "./AddGame.module.scss";

export function AddGame(props) {
  const { onReload } = props;
  const [show, setShow] = useState(false);

  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  return (
    <>
      <Button primary className={styles.addBtn} onClick={openModal}>
        <Icon name="add" style={{ marginLeft: '5px' }} /> Create
      </Button>

      <BasicModal show={show} onClose={closeModal} title="New Game">
        {/* <GameForm onClose={closeModal} onReload={onReload} /> */}
      </BasicModal>
    </>
  );
}

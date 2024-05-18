import { useState } from "react";
import { Icon, Image, Button } from "semantic-ui-react";
import { Game as GameCtrl } from "@/api";
import { fn } from '@/utils';
import { BasicModal, Confirm } from "@/components/Shared";
import { GameForm } from "../../GameForm";
import styles from "./Game.module.scss";

export function Game(props) {
  const { gameId, game, onReload } = props;
  const [showEdit, setShowEdit] = useState(false);
  // const [showConfirm, setShowConfirm] = useState(false);

  const openCloseEdit = () => setShowEdit((prevState) => !prevState);
  // const openCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  // const onDelete = async () => {
  //   try {
  //     await addressCtrl.delete(addressId);
  //     onReload();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <>
      <div className={styles.gameItem}>
        <div className={styles.actions}>
          <Button primary icon onClick={openCloseEdit}>
            <Icon name="pencil" />
          </Button>
          {/* <Button primary icon onClick={openCloseConfirm}>
            <Icon name="delete" />
          </Button> */}
        </div>
        <div key={game.id} className={styles.product}>
          <Image src={game?.cover?.data?.attributes?.url} />
          <div className={styles.info}>
            <p>{game?.title}</p>
            <p>{game?.platform?.data?.attributes?.title}</p>
          </div>
          <span>
            $
            {fn.calcDiscountedPrice(
              game?.price,
              game?.discount,
            )}
          </span>
        </div>
      </div>

      {/* <Confirm
        open={showConfirm}
        onCancel={openCloseConfirm}
        onConfirm={onDelete}
        content="Are you sure you want to delete the address?"
      /> */}

      <BasicModal
        show={showEdit}
        onClose={openCloseEdit}
        title="Edit game"
      >
        <GameForm
          onClose={openCloseEdit}
          onReload={onReload}
          gameId={gameId}
          game={game}
        />
      </BasicModal>
    </>
  );
}

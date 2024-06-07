import { useState, useEffect } from "react";
import { Icon, Image, Button, Label } from "semantic-ui-react";
import { Game as GameAPI, Platform } from '@/api';
import { fn } from '@/utils';
import { BasicModal, Confirm } from "@/components/Shared";
import { GameForm } from "../../GameForm";
import styles from "./Game.module.scss";

const platformCtrl = new Platform();
const gameCtrl = new GameAPI();

export function Game(props) {
  const { gameId, game, onReload } = props;
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [platforms, setPlatforms] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await platformCtrl.getAll();
        setPlatforms(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  // Find the matching platform
  const matchingPlatform = platforms?.find(
    (platform) => platform.attributes.slug === game?.platform?.data?.attributes?.slug
  );

  const openCloseEdit = () => setShowEdit((prevState) => !prevState);
  const openCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  const onDelete = async () => {
    try {
      console.log('Deleting game with ID:', gameId);
      await gameCtrl.deleteGameById(gameId); // Use gameId directly here
      onReload();
    } catch (error) {
      console.error('Error deleting the game:', error);
    } finally {
      setShowConfirm(false); // Close the confirm modal after delete
    }
  };

  return (
    <>
      <div className={styles.gameItem}>
        <div className={styles.actions}>
          {/* <Button primary icon > */}
          <Icon name="pencil" onClick={openCloseEdit} />
          {/* </Button> */}
          {/* <Button primary icon onClick={openCloseConfirm}> */}
          {/* <Button primary icon onClick={openCloseConfirm} > */}
          <Icon name="delete" onClick={openCloseConfirm} />
          {/* </Button> */}
        </div>
        <div key={game.id} className={styles.product}>
          <h3 className={styles.productTitle}>{game?.title}</h3>
          <Image src={game?.cover?.data?.attributes?.url ? game.cover.data.attributes.url : '/images/not-found.jpeg'} />
          {matchingPlatform && (
            <div className={styles.platform} >
              <div className={styles.iconWrapper}>
                <Image src={matchingPlatform.attributes.icon.data.attributes.url} />
              </div>
            </div>
          )}
          <div className={styles.price}>
            {game.discount > 0 ? (
              <>
                <div className={styles.originalPriceWrapper}>
                  <span className={styles.originalPrice}>
                    <Icon name="tag" />${game.price}
                  </span>
                  <span className={styles.discount}>-{game.discount}%</span>
                </div>
                <span className={styles.discountedPrice}>
                  ${fn.calcDiscountedPrice(game.price, game.discount)}
                </span>
              </>
            ) : (
              <span className={styles.discountedPrice}>
                ${fn.calcDiscountedPrice(game.price, game.discount)}
              </span>
            )}
          </div>
        </div>
      </div >


      <Confirm
        open={showConfirm}
        onCancel={openCloseConfirm}
        onConfirm={onDelete}
        content="Are you sure you want to delete this game?"
      />

      < BasicModal
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
      </BasicModal >
    </>
  );
}

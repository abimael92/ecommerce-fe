import { useState } from 'react';
import { Button, Container, Icon, Image } from 'semantic-ui-react';
import { fn } from '@/utils';
import { useCart } from '@/hooks';
import { WishlistIcon } from '@/components/Shared';
import styles from './Panel.module.scss';

export function Panel(props) {
  const { gameId, game } = props;
  const [loading, setLoading] = useState(false);
  const { addCart } = useCart();

  console.log('game: ', game);

  // Check if game object is defined
  if (!game) {
    // Render null or a loading indicator
    return null; // or <LoadingIndicator />
  }

  console.log('gameId: ', gameId);



  const platform = game.platform?.data;
  const coverUrl = game.cover?.data?.attributes?.url;
  const iconUrl = platform?.attributes?.icon?.data?.attributes?.url;
  const buyPrice = fn.calcDiscountedPrice(game.price, game.discount);

  const addCartWrapper = () => {
    setLoading(true);
    addCart(gameId);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <Container className={styles.panel}>
      <div className={styles.imgContiner}>
        <Image src={coverUrl} />
      </div>

      <div className={styles.actionsContainer}>
        <div>
          <h2>{game.title}</h2>

          {platform && (
            <div className={styles.moreInfo}>
              <span>
                <Image src={iconUrl} />
                {platform.attributes.title}
              </span>
              <span>
                <Icon name="check" />
                In stock
              </span>
            </div>
          )}

          <div className={styles.price}>
            {game.discount > 0 && (
              <>
                <span className={styles.originalPrice}>
                  <Icon name="tag" />${game.price}
                </span>

                <span className={styles.discount}>-{game.discount}%</span>
              </>
            )}

            <span className={styles.price}>${buyPrice}</span>
          </div>

          <Button primary fluid onClick={addCartWrapper} loading={loading}>
            Buy now
          </Button>

          <WishlistIcon gameId={gameId} className={styles.heart} />
        </div>
      </div>
    </Container>
  );
}

import { useState, useEffect } from 'react';
import { Button, Container, Icon, Image, Input } from 'semantic-ui-react';
import { fn } from '@/utils';
import { useCart } from '@/hooks';
import { WishlistIcon } from '@/components/Shared';
import styles from './Panel.module.scss';

export function Panel(props) {
  const { gameId, game } = props;
  const [loading, setLoading] = useState(false);
  const { addCart, getCartItem } = useCart();
  const [inCart, setInCart] = useState(false);

  // Check if game object is defined
  if (!game) return null;

  useEffect(() => {
    if (gameId) {
      const itemInCart = getCartItem(gameId);
      setInCart(itemInCart);
    }
  }, [gameId, getCartItem]);

  const platform = game.platform?.data;
  const coverUrl = game.cover?.data?.attributes?.url;
  const iconUrl = platform?.attributes?.icon?.data?.attributes?.url;
  const buyPrice = fn.calcDiscountedPrice(game.price, game.discount);

  const addCartWrapper = () => {
    setLoading(true);
    addCart(gameId);
    setInCart(true);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const isGameInCart = (gameId) => {
    const item = getCartItem(gameId);
    return item !== undefined;
  };

  return (
    <Container className={styles.panel}>
      <div className={styles.imgContainer}>
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

          <Button
            primary
            fluid
            onClick={addCartWrapper}
            loading={loading}
            disabled={inCart}
          >
            Buy now
          </Button>
          {inCart && (
            <p className={styles.cartLabel}>This item is already in your cart.</p>
          )}


          <WishlistIcon gameId={gameId} className={styles.heart} />
        </div>
      </div>
    </Container>
  );
}

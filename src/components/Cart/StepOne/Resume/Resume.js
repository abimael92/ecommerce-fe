import { useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { forEach } from 'lodash';
import { fn } from '@/utils';
import styles from './Resume.module.scss';

export function Resume(props) {
  const { games } = props;
  const router = useRouter();
  const [totals, setTotals] = useState(null);

  useEffect(() => {
    let totals = {
      original: 0,
      discount: 0,
      price: 0,
    };

    forEach(games, (game) => {
      const price = fn.calcDiscountedPrice(
        game.attributes.price,
        game.attributes.discount,
      );

      totals = {
        original: totals.original + game.attributes.price * game.quantity,
        discount:
          totals.discount + (game.attributes.price - price) * game.quantity,
        price: totals.price + price * game.quantity,
      };
    });

    setTotals(totals);
  }, [games]);

  const goToStepTwo = () => {
    router.replace({ query: { ...router.query, step: 2 } });
  };

  if (!totals) return null;

  return (
    <div className={styles.resume}>
      <h2>Order Summary</h2>

      <div className={styles.block}>
        <div className={styles.prices}>
          <div>
            <span>Official Price</span>
            <span>${totals.original.toFixed(2)}</span>
          </div>
          <div>
            <span>Discount</span>
            <span>${totals.discount.toFixed(2)}</span>
          </div>
          <div>
            <span>Subtotal</span>
            <span>${totals.price.toFixed(2)}</span>
          </div>
        </div>

        <Button
          primary
          fluid
          onClick={goToStepTwo}
          disabled={!(games && games.lenght > 0)}
        >
          Proceed with payment
        </Button>

        <Link href="/">Continue Shopping</Link>
      </div>
    </div>
  );
}

// import { useState, useEffect } from "react";
// import { map } from "lodash";
import { Game as GameCtrl } from "@/api";
// import { useAuth } from "@/hooks";
// import { User } from "./User";
import styles from './ListUsers.module.scss';

const gameCtrl = new GameCtrl();

const ListUsers = ({ reload, onReload }) => {
  console.log('ListGames component rendered');
  // const [games, setGames] = useState(null);
  // const { user } = useAuth();

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await gameCtrl.getAllGames(user.id);
  //       setGames(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   })();
  // }, [reload]);

  // if (!games) return null;

  // console.log('games: ', games);

  return (
    <div className={styles.addressesContainer}>
      <div className={styles.addressesGrid}>
        {/* {map(games, (game) => (
          <div key={game.id} className={styles.addressItem}>
            <div className={styles.address}>
              <User
                gameId={game.id}
                game={game.attributes}
                onReload={onReload}
              />
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
}

export default ListUsers;

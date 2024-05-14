import { useEffect } from "react";
import { Container } from 'semantic-ui-react';
import styles from './Info.module.scss';
import { ExternalGameAPI } from "@/api/external/game";

// export async function getServerSideProps(context) {
//   const { query } = context; // Destructure to get query parameters
//   const { title } = query;

//   console.log('context:', context); //

//   const gameCtrl = new ExternalGameAPI();
//   try {
//     const response = await gameCtrl.searchGameByName(title);
//     const gameDetails = response.data;

//     console.log('gameDetails:', gameDetails);

//     const serializedGameDetails = JSON.parse(JSON.stringify(gameDetails));
//     console.log('gameDetails:', serializedGameDetails);

//     return {
//       props: {
//         gameDetails: serializedGameDetails,
//       },
//     }
//   } catch (error) {
//     console.error('Error fetching game details:', error);
//   }
// }

export function Info(props) {
  const { game, gameDetails } = props;
  const gameCtrl = new ExternalGameAPI();

  useEffect(() => {
    async function fetchGameDetails() {
      try {
        const response = await gameCtrl.searchGameByName(title);
        const gameDetails = response.data;

        console.log('gameDetails:', gameDetails);

        if (!response.ok) {
          throw new Error('Failed to fetch game details');
        }

        const data = await response.json();
        console.log('data: ', data);

      } catch (error) {
      }
    }

    fetchGameDetails();
  }, [game]);



  // Check if game object is defined
  if (!game) return null;

  // Extract properties from the game object or provide default values
  const summary = game.summary || 'Summary not available';
  const releaseDate = game.releaseDate || 'Release date not available';

  return (
    <Container className={styles.info}>
      <div className={styles.summary}>
        <p>{summary}</p>
      </div>

      <div className={styles.more}>
        <ul>
          <li>
            <span>Release Date:</span> {releaseDate}
          </li>
        </ul>
      </div>
    </Container>
  );
}
export default Info;
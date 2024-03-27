import { Container } from 'semantic-ui-react';
import styles from './Info.module.scss';

export function Info(props) {
  const { game } = props;

  // Check if game object is defined
  if (!game) {
    // Render null or a loading indicator
    return null; // or <LoadingIndicator />
  }

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

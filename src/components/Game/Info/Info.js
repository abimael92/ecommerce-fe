import { useState, useEffect } from "react";
import { Container } from 'semantic-ui-react';
import { ExternalGameAPI } from "@/api/external/game";
import styles from './Info.module.scss';

export function Info(props) {
  const { game } = props;
  const gameCtrl = new ExternalGameAPI();

  const [gameDetails, setGameDetails] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchGameDetails() {
      try {
        const gameId = await gameCtrl.searchGameByName(game.title);
        const gameDetails = await gameCtrl.getGameDetailsById(gameId);

        setGameDetails(gameDetails);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching game details:', error);
        setLoading(false);
      }
    }

    if (game && game.title && !gameDetails) { // Check if gameDetails is null before fetching
      fetchGameDetails();
    } else {
      setLoading(false);
    }
  }, [game]); // Include gameDetails in the dependency array

  if (!game) {
    // Render null or a loading indicator
    return null; // or <LoadingIndicator />
  }

  // Extract properties from the game object or provide default values
  const summary = game.summary || 'Summary not available';
  const releaseDate = game.releaseDate || 'Release date not available';

  function formatScore(score) {
    return score % 1 === 0 ? score.toFixed(0) : score.toFixed(2);
  }

  function getBackgroundColorByPercentage(percent) {
    if (percent >= 70) {
      return '#00FF00';
    } else if (percent >= 50) {
      return '#FFFF00';
    } else {
      return '#FF0000';
    }
  }

  return (
    <Container className={styles.info}>
      <div className={styles.summary}>
        <h2>Summary</h2><br />
        <p>{summary}</p>
      </div>

      <div className={styles.more}>
        <ul>
          <li>
            <span>Release Date:</span> {releaseDate}
          </li>
          {gameDetails && (
            <>
              {gameDetails.Companies && (
                <li>
                  <span>Main Publisher:</span> {gameDetails.Companies.find(company => company.type === 'PUBLISHER')?.name}
                </li>
              )}
              {gameDetails.Companies && (
                <li>
                  <span>Developer:</span> {gameDetails.Companies.find(company => company.type === 'DEVELOPER')?.name}
                </li>
              )}
              {gameDetails.Platforms && (
                <li>
                  <span>Platforms:</span> {gameDetails.Platforms.map(platform => platform.name).join(', ')}
                </li>
              )}
              {gameDetails.tier && (
                <li>
                  <span>Tier:</span> {gameDetails.tier}
                </li>
              )}

              {gameDetails.Genres && (
                <li>
                  <span>Genres:</span> {gameDetails.Genres.map(genre => <><p className={styles.genreLabel} >{genre.name}</p><i className="tag icon"></i></>)}
                </li>
              )}
              <br /><br />
              {gameDetails.percentRecommended && gameDetails.medianScore && (
                <li className={styles.percentGrid}>
                  <div className={styles.percentGridTitle}>
                    <span>Meta Score:</span>
                    <br />
                    <span className={styles.scoreCircle} style={{ backgroundColor: getBackgroundColorByPercentage(gameDetails.medianScore) }}>
                      <span className={styles.scoreValue} >{formatScore(gameDetails.medianScore)}</span>
                    </span>
                  </div>
                  <div className={styles.percentGridTitle}>
                    <span>User Score:</span>
                    <br />
                    <span className={styles.scoreCircle} style={{ backgroundColor: getBackgroundColorByPercentage(gameDetails.percentRecommended) }}>
                      <span className={styles.scoreValue} >{formatScore(gameDetails.percentRecommended)}</span>
                    </span>
                  </div>
                </li>
              )}
            </>
          )}
        </ul>
      </div>
    </Container >
  );
}

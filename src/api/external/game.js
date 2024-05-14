import { ENV } from "@/utils";

export class ExternalGameAPI {
    async searchGameByName(name) {

        const url = `${ENV.EXTERNAL_API_URL}/game/search?criteria=${name}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': `${ENV.EXTERNAL_API_KEY}`,
                'X-RapidAPI-Host': `${ENV.EXTERNAL_API_HOST}`,
            }
        };

        try {
            const response = await fetch(url, options);
            const games = await response.json();

            // console.log(games);

            if (games.length > 0) {
                const firstGameId = games[0].id;
                return firstGameId; // Return the ID of the first game
            } else {
                console.log('No games found.');
                return null; // Return null if no games found
            }
        } catch (error) {
            console.error(error);
        }
    }


    async getGameDetailsById(id) {
        const url = `${ENV.EXTERNAL_API_URL}/game/${id}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': `${ENV.EXTERNAL_API_KEY}`,
                'X-RapidAPI-Host': `${ENV.EXTERNAL_API_HOST}`,
            }
        };

        try {
            const response = await fetch(url, options);
            const gameDetails = await response.json();
            // console.log('Details of the game:', gameDetails);
            return gameDetails; // Return details of the game
        } catch (error) {
            console.error(error);
            throw error; // Throw error for error handling in the calling function
        }
    }
}

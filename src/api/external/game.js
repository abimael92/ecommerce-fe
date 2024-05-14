import { ENV } from "@/utils";

export class ExternalGameAPI {
    async searchGameByName(name) {
        try {
            const url = `${ENV.EXTERNAL_API_URL}/search/?api_key=${ENV.EXTERNAL_API_KEY}&format=json&query=${name}&resources=game`;
            const response = await fetch(url);
            console.log('this is the url: ', url);


            if (!response.ok) {
                throw new Error('Failed to fetch data from the external API');
            }

            const data = await response.json();
            console.log('this is the data: ', data);

            return data;
        } catch (error) {
            throw error;
        }
    }


    async getGameDetailsById(id) {
        try {
            const url = `${ENV.EXTERNAL_API_URL}/games/${id}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Failed to fetch game details from the external API');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }

    // Add more methods for fetching game data as needed
}

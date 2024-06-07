import { ENV, authFetch } from "@/utils";
import { uploadFileToStrapi } from '@/utils/functions/mediaUpload';

export class Game {

  async getAllGames({ limit = 15, platformId = null }) {
    try {
      const paginationLimit = `pagination[limit]=${limit}`;
      const sort = `sort[0]=publishedAt:desc`;
      const populate = `populate=*`;
      const urlParams = `${sort}&${paginationLimit}&${populate}`;

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}?${urlParams}`;

      // console.log(
      //   '\n\n *getAllGames* \n\nFetching data from URL: ',
      //   url,
      //   '\n\n ',
      // );

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getLastPublished() {
    try {
      const sort = 'sort=publishedAt:desc';
      const pagination = 'pagination[limit]=1';
      const populate = 'populate=*';
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}?${sort}&${pagination}&${populate}`;

      // console.log(
      //   '\n\n *getLastPublished* \n\nFetching data from URL: ',
      //   url,
      //   '\n\n ',
      // );

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getLatestPublished({ limit = 9, platformId = null }) {
    try {
      const filterPlatform =
        platformId && `filters[platform][id][$eq]=${platformId}`;
      const paginationLimit = `pagination[limit]=${limit}`;
      const sort = `sort[0]=publishedAt:desc`;
      const populate = `populate=*`;
      const urlParams = `${sort}&${paginationLimit}&${filterPlatform}&${populate}`;

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}?${urlParams}`;

      // console.log(
      //   '\n\n *getLatestPublished* \n\nFetching data from URL: ',
      //   url,
      //   '\n\n ',
      // );

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getGamesByPlatformSlug(slug, page) {
    try {
      const filters = `filters[platform][slug][$eq]=${slug}`;
      const pagination = `pagination[page]=${page}&pagination[pageSize]=30`;
      const populate = 'populate=*';
      const urlParams = `${filters}&${pagination}&${populate}`;

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}?${urlParams}`;

      // console.log(
      //   '\n\n *getGamesByPlatformSlug* \n\nFetching data from URL: ',
      //   url,
      //   '\n\n ',
      // );

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async searchGames(text, page) {
    try {
      const filters = `filters[title][$contains]=${text}`;
      const pagination = `pagination[page]=${page}&pagination[pageSize]=30`;
      const populate = 'populate=*';
      const urlParams = `${filters}&${pagination}&${populate}`;

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}?${urlParams}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getBySlug(slug) {
    // console.log('\n\nslug: ', slug, '\n\n ');
    try {
      const filters = `filters[slug][$eq]=${slug}`;
      const populate = `populate[0]=wallpaper&populate[1]=cover&populate&populate[2]=screenshots&populate[3]=platform&populate[4]=platform.icon`;
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}?${filters}&${populate}`;

      // console.log('\n\nFetching data from URL: ', url, '\n\n ');

      const response = await fetch(url);

      // console.log('Response:', response);

      const result = await response.json();

      // console.log('Response:', result);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return result.data[0];
    } catch (error) {
      console.error('Error fetching data:', error.message);
      throw error.cause;
    }
  }

  async getGameById(id) {
    try {
      const populate = `populate[0]=cover&populate[1]=platform`;

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}/${id}?${populate}`;
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async postGame(formData) {
    console.table('with the following values Data:', JSON.stringify(formData, null, 2));

    try {
      // Array to hold all promises for image uploads
      const uploadPromises = [];

      // Upload cover image to Strapi if it exists
      if (formData.cover) {
        uploadPromises.push(uploadFileToStrapi(formData.cover)
          .then(coverResponse => {
            // console.log('Cover image uploaded:', coverResponse);
            formData.cover = coverResponse[0].id

            // console.log('Updated formData with cover URL:', formData);
          }));
      }

      // Upload wallpaper image to Strapi if it exists
      if (formData.wallpaper) {
        uploadPromises.push(uploadFileToStrapi(formData.wallpaper)
          .then(wallpaperResponse => {
            // console.log('Wallpaper image uploaded:', wallpaperResponse);
            formData.wallpaper = wallpaperResponse[0].id

          }));
      }

      // Upload screenshots to Strapi if they exist
      if (formData.screenshots && formData.screenshots.length > 0) {
        const screenshotPromises = formData.screenshots.map(uploadFileToStrapi);
        const screenshotResponses = await Promise.all(screenshotPromises);
        // console.log('Screenshots uploaded:', screenshotResponses);

        // Extract IDs from responses and construct URL objects
        const screenshotURLs = screenshotResponses.map(response => response[0].id);

        // Assign IDs to formData
        formData.screenshots = screenshotURLs;
        // console.log('Updated formData with screenshot IDs:', formData);
      }

      // Wait for all upload promises to complete before proceeding
      await Promise.all(uploadPromises);

      console.log('Updated formData with URLs:', formData);

      // Construct URL for the POST request
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}`;
      // console.log('POST request URL:', url);

      // Construct request parameters
      const params = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: formData }), // Include the form data in the request body
      };

      // Send POST request to the Strapi backend
      const response = await fetch(url, params);
      const result = await response.json();

      // Check if response is not OK and throw error if needed
      if (!response.ok) {
        throw new Error(result.message || 'Failed to post game data');
      }

      // Return the result
      return result;
    } catch (error) {
      console.error('Error posting game data:', error);
      throw new Error(error.message || 'Failed to post game data');
    }
  }

  async putGame(data, gameId) {
    console.table('with the following values Data:', JSON.stringify(data, null, 2));

    try {
      // Array to hold all promises for image uploads
      const uploadPromises = [];

      // Upload cover image to Strapi if it exists and is a File
      if (data.cover && data.cover instanceof File) {
        uploadPromises.push(uploadFileToStrapi(data.cover)
          .then(coverResponse => {
            data.cover = coverResponse[0].id;
          }));
      }

      // Upload wallpaper image to Strapi if it exists and is a File
      if (data.wallpaper && data.wallpaper instanceof File) {
        uploadPromises.push(uploadFileToStrapi(data.wallpaper)
          .then(wallpaperResponse => {
            data.wallpaper = wallpaperResponse[0].id;
          }));
      }

      // Upload screenshots to Strapi if they exist and are Files
      if (data.screenshots && data.screenshots.length > 0) {
        const screenshotPromises = data.screenshots.map(file => {
          if (file instanceof File) {
            return uploadFileToStrapi(file);
          }
          return Promise.resolve([{ id: file }]); // If not a File, assume it's already an ID
        });
        const screenshotResponses = await Promise.all(screenshotPromises);
        const screenshotURLs = screenshotResponses.map(response => response[0].id);
        data.screenshots = screenshotURLs;
      }

      // Wait for all upload promises to complete before proceeding
      await Promise.all(uploadPromises);

      // Construct URL for the PUT request
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}/${gameId}`;
      const params = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      };

      const response = await authFetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      console.error('Error updating game data:', error);
      throw new Error(error.message || 'Failed to update game data');
    }
  }

  async deleteGameById(gameId) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}/${gameId}`;
      const params = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await authFetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      console.error('Error deleting the game:', error);
      throw error;
    }
  }


}

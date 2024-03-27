import { ENV } from '@/utils';

export class Game {
  async getLastPublished() {
    try {
      const sort = 'sort=publishedAt:desc';
      const pagination = 'pagination[limit]=1';
      const populate = 'populate=*';
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}?${sort}&${pagination}&${populate}`;

      console.log(
        '\n\n *getLastPublished* \n\nFetching data from URL: ',
        url,
        '\n\n ',
      );

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

      console.log(
        '\n\n *getLatestPublished* \n\nFetching data from URL: ',
        url,
        '\n\n ',
      );

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

      console.log(
        '\n\n *getGamesByPlatformSlug* \n\nFetching data from URL: ',
        url,
        '\n\n ',
      );

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
    console.log('\n\nslug: ', slug, '\n\n ');
    try {
      const filters = `filters[slug][$eq]=${slug}`;
      const populate = `populate[0]=wallpaper&populate[1]=cover&populate&populate[2]=screenshots&populate[3]=platform&populate[4]=platform.icon`;
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}?${filters}&${populate}`;

      console.log('\n\nFetching data from URL: ', url, '\n\n ');

      const response = await fetch(url);

      console.log('Response:', response);

      const result = await response.json();

      console.log('Response:', result);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log('result:', result.data[0]);
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
}

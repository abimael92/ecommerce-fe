import { ENV } from '@/utils'

export class Platform {
  async getAll() {
    try {
      const sort = 'sort=order:asc'
      const populate = 'populate=icon'

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PLATFORM}?${populate}&${sort}`

      const response = await fetch(url)
      const result = await response.json()

      if (response.status !== 200) throw result

      return result
    } catch (error) {
      throw error
    }
  }

  async getBySlug(slug) {
    console.error(`Fetching data for slug: ${slug}\n`)
    try {
      const filters = `filters[slug][$eq]=${slug}`
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PLATFORM}?${filters}`

      console.log(`\n${url}\n`)

      const response = await fetch(url)

      console.log(`\n${response}\n`)

      // Check if the HTTP response status is in the range 200-299 (successful)
      if (!response.ok) {
        // If not successful, parse the response JSON to get error details
        const errorResult = await response.json()
        console.error(`Error: ${response.status} - ${errorResult.message}\n`)
        throw new Error(`Error: ${response.status} - ${errorResult.message}`)
      }

      const result = await response.json()
      console.log(`\n${result}\n`)
      return result.data[0]
    } catch (error) {
      // Handle errors thrown in the try block
      console.error('\n\nError in getBySlug:', error)
      throw error // Re-throw the error to propagate it further if needed
    }
  }

  // async getBySlug(slug) {
  //   console.log(slug);
  //   try {
  //     const filters = `filters[slug][$eq]=${slug}`;
  //     const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PLATFORM}?${filters}`;

  //     const response = await fetch(url);
  //     const result = await response.json();

  //     if (response.status !== 200) throw result;

  //     return result.data[0];
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}

import { ENV } from '@/utils'
import axios from 'axios'

export class Platform {
  async getAll() {
    try {
      const sort = 'sort=order:asc'
      const populate = 'populate=icon'

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PLATFORM}?${populate}&${sort}`

      console.log(`this is the URL:\n${url}\n`)

      // const response = await fetch(url)
      const response = await axios.get(url)

      // console.log(
      //   `Response Status: ${response.status}\nResponse OK: ${
      //     response.ok
      //   }\nResponse Headers:
      //   ${response.headers}\nResponse: ${JSON.stringify(response.data)}\n
      //   }`,
      // )

      const result = await response.json()
      console.log(`Result :`, result)

      if (response.status !== 200) throw result

      return result
    } catch (error) {
      console.error('\nError in getAll:', error.message || error)
      throw error
    }
  }

  async getBySlug(slug) {
    console.log(`getBySlug\n--------------------`)
    console.log(`slug: ${slug}\n`)
    try {
      const filters = `filters[slug][$eq]=${slug}`
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PLATFORM}?${filters}`
      console.log(`this is the URL:\n${url}\n`)

      const response = await fetch(url)
      console.log(
        `Response Status: ${response.status}\nResponse OK: ${
          response.ok
        }\nResponse Headers:
        ${response.headers}\nResponse: ${JSON.stringify(response.data)}\n
        }`,
      )

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`)
      }

      // const result = await response
      // console.log(`Result Data:`, result)

      // return result.data[0]
    } catch (error) {
      console.error('\nError in getBySlug:\n\n', error.message || error)
      throw error
    }
  }
}

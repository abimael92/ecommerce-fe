import { ENV } from '@/utils'

export class Auth {
  async register(data) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AUTH.REGISTER}`
      const params = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }

      const response = await fetch(url, params)
      const result = await response.json()

      if (response.status !== 200) throw result

      return result
    } catch (error) {
      throw error
    }
  }

  async login(data) {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 60000) // 30 seconds timeout

    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AUTH.LOGIN}`
      const params = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        signal: controller.signal, // Associate the AbortController's signal with the fetch request
      }

      console.log('Sending request...')
      const response = await fetch(url, params)
      console.log('Request completed.')

      clearTimeout(timeoutId) // Clear the timeout to prevent it from triggering after the request completes

      const result = await response.json()

      if (response.status !== 200) {
        console.error('Error response:', result)
        throw result
      }

      return result
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error('Request timed out')
      } else {
        console.error('Fetch failed:', error)
      }
      throw error
    }
  }
}

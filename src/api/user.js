import { ENV, authFetch } from "@/utils";

export class User {
  async getMe() {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS_ME}`;

      const response = await authFetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateMe(userId, data) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS}/${userId}`;

      const params = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const response = await authFetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async createUser(data) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS}`;

      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const response = await authFetch(url, params);
      const result = await response.json();

      if (response.status !== 200) {
        throw new Error(JSON.stringify(result)); // Ensure error object contains details
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(userId, data) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS}/${userId}`;

      const params = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const response = await authFetch(url, params);
      const result = await response.json();

      if (response.status !== 200) {
        throw new Error(getErrorMessage(result));
      }

      return result;
    } catch (error) {
      throw error;
    }
  }
}

function getErrorMessage(result) {
  const { name, details } = result.error;
  let errorMessage = `${name}: `;
  if (details && details.errors && Array.isArray(details.errors)) {
    const errors = details.errors.map(error => error.message);
    const errorCount = errors.length;
    errorMessage += `${errorCount} error${errorCount > 1 ? 's' : ''} occurred: ${errors.join(', ')}`;
  } else {
    errorMessage += result.error.message;
  }
  return errorMessage;
}
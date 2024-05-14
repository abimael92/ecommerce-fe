export const ENV = {
  SERVER_HOST: 'http://127.0.0.1:1337/',
  // SERVER_HOST: "https://ecommerce-strapi.up.railway.app",
  // API_URL: 'https://ecommerce-strapi.up.railway.app/api',
  API_URL: 'http://127.0.0.1:1337/api',
  ENDPOINTS: {
    AUTH: {
      REGISTER: 'auth/local/register',
      LOGIN: 'auth/local',
    },
    USERS_ME: 'users/me',
    USERS: 'users',
    PLATFORM: 'platforms',
    ADDRESS: 'addresses',
    GAME: 'games',
    WISHLIST: 'wishlists',
    PAYMENT_ORDER: 'payment-order',
    ORDER: 'orders',
  },
  EXTERNAL_API_URL: 'https://opencritic-api.p.rapidapi.com',
  EXTERNAL_API_KEY: '717449cec2msh8e01a145ed06b37p1e5072jsn60ef7ff90bde',
  EXTERNAL_API_HOST: 'opencritic-api.p.rapidapi.com',
  TOKEN: 'token',
  CART: 'cart',
  STRIPE_TOKEN:
    'pk_test_51McFNvGuOrnPfQra2CPEv40T6bwjvke3EmtZELp3685TKzCMDgagCauuO8nOVgL2sI4eiU0s830K3aZj31iOXtoV00zA9gPqMd',
};

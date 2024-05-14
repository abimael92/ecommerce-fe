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
  EXTERNAL_API_URL: 'https://www.giantbomb.com/api',
  EXTERNAL_API_KEY: '8eb76d0c37bba108433463d4a692e1de7646606d',
  TOKEN: 'token',
  CART: 'cart',
  STRIPE_TOKEN:
    'pk_test_51McFNvGuOrnPfQra2CPEv40T6bwjvke3EmtZELp3685TKzCMDgagCauuO8nOVgL2sI4eiU0s830K3aZj31iOXtoV00zA9gPqMd',
};

# Gaming Store E-Commerce

Welcome to the Gaming Store E-Commerce project! This modern web application allows users to explore and purchase video games online. It's built using Next.js, React, Hooks, Strapi, Stripe, AWS, SASS, Formik, Yup, and other technologies, providing a seamless and feature-rich shopping experience for gaming enthusiasts.

![Gaming Store Preview](public/gaming-store-preview.png)

This project utilizes the following technologies:

- **Next.js**: The foundation of the application, providing a powerful React framework with server-side rendering capabilities.
- **React**: Used to build dynamic and interactive user interfaces.
- **Hooks**: Custom hooks are created to manage various functionalities.
- **Strapi**: Handles the backend and provides an authentication system with JWT.
- **Stripe**: Integrated for secure payment processing.
- **AWS S3**: Used to store and manage media files like images and videos.
- **SASS**: For styling and a structured approach to CSS.
- **Formik and Yup**: Manage forms and validation effectively.
## Table of Contents

- [Introduction](#introduction)
- [Tech Stack](#tech-stack)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
- [Features](#features)
- [Pending Features](#pending-features)
- [Documentation](#documentation)
- [FAQs](#faqs)
- [Learn More](#learn-more)
- [Deploy on Vercel](#deploy-on-vercel)

## Introduction

The Gaming Store E-Commerce project is a robust web application that offers a wide range of features for both users and administrators. It includes an advanced routing system, user authentication, payment gateway integration with Stripe, AWS S3 integration for media files, and much more.

## Tech Stack | React, Next JS 13, TypeScript, Tailwind CSS

- **Frontend**: The frontend of the project is developed using React to create interactive and dynamic user interfaces.

- **Data Integration**: The app connects to a backend API to retrieve game information and facilitate online purchases.

- **Styling**: Custom styling is applied using CSS and potentially a styling library like Tailwind CSS for a visually appealing design.


## Features

This project offers a plethora of features, including but not limited to:

- **Advanced Routing**: Utilizes Next.js for routing and provides a seamless user experience.
- **Authentication**: Implements user registration and login using Strapi with JWT.
- **Form Management**: Formik and Yup are used for form handling and validation.
- **Payment Gateway**: Securely process payments using Stripe integration.
- **Restricted Areas**: Access control for registered users and guests.
- **AWS Integration**: Media files are stored and managed using Amazon AWS S3.
- **Administrator Panel**: Provides an interface for administrators to manage content.
- **Layouts**: Utilizes layouts for consistent design.
- **User Account**: Manage user accounts, addresses, and settings.
- **Console Platform System**: Allows users to browse and select gaming platforms.
- **Video Game System**: Explore and purchase video games.
- **Ordering System**: Place and manage orders efficiently.
- **Search Engine**: Fast and dynamic game search functionality.

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/gaming-store.git

  
2. Navigate to the project directory:

```bash
cd car_showcase
```

3. Create a .env file in the root directory of the project.

```bash
touch .env
```

4. Add the following environment variables to the .env file:

-   **API_BASE_URL**:https://cars-by-api-ninjas.p.rapidapi.com
-   **API_KEY**:YOUR_RAPID_API_KEY

REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
REACT_APP_AWS_ACCESS_KEY_ID=your_aws_access_key_id
REACT_APP_AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
REACT_APP_AWS_S3_BUCKET_NAME=your_aws_s3_bucket_name
REACT_APP_API_BASE_URL=your_api_base_url


Replace API_KEY and API_BASE_URL with your actual API keys.

5. Install the dependencies:

```bash
yarn install
```

6. Run the the development server:

```bash
yarn run dev
```

7. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

The Gaming Store E-Commerce application allows users to browse and purchase video games, manage their accounts, and explore gaming platforms. Feel free to explore the wide range of features and functionalities.

## Features

- **Game Catalog:** Browse and search for games by various criteria such as genre, platform, and price range.

- **Game Details:** View comprehensive details about each game, including specifications, features, and high-quality images.

- **User-Friendly Interface:** The app offers a clean and intuitive interface for easy navigation and information retrieval.

- **Responsive Design:** The app is designed to provide a consistent and engaging experience across different devices and screen sizes.

## Pending Features

- **Online Orders:** Users can add games to their cart and place orders seamlessly within the app.

- **User Profiles:** Registered users have access to their profiles, order history, and saved favorite games.

## Documentation

- Rapid-API [Games by API-Ninjas]: https://games-by-api-ninjas.p.rapidapi.com
- cdn.imagin: https://cdn.imagin.studio/getimage

## FAQs

- **Q1:** How can I search for games?
  - **A1:** Use the search bar to enter criteria like genre, platform, or price range. The app will display matching games.

- **Q2:** What information can I find about each game?
  - **A2:** You can view detailed specifications, features, and high-quality images for each game.

- **Q3:** Can I place an order for a game?
  - **A3:** The app is under development, and while it currently offers search and viewing capabilities, the ordering feature is pending.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

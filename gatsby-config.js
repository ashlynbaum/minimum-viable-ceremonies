module.exports = {
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/room/*`] },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [require("tailwindcss")]
      },
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        custom: {
          families: ["Source Sans Pro"],
          urls: ["/src/fonts/fonts.css"],
        },
      },
    },
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: process.env.MVC_FIREBASE_API_KEY,
          authDomain: `${process.env.MVC_FIREBASE_DOMAIN}.firebaseapp.com`,
          databaseURL: `https://${process.env.MVC_FIREBASE_DOMAIN}.firebaseio.com`,
          projectId: `${process.env.MVC_FIREBASE_DOMAIN}`,
          storageBucket: `${process.env.MVC_FIREBASE_DOMAIN}.appspot.com`,
        },
      },
    },
    `gatsby-plugin-react-svg`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `minimum-viable-ceremonies`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`,
      },
    }
  ],
}

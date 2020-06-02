# Minimum Viable Ceremonies

This is an app designed to help teams improve their processes, a part of https://minimal.cards.

It's written on the excellent [Gatsby](https://www.gatsbyjs.org/) framework, with a [Firebase](https://firebase.google.com/) backend.

###  🔧 **Developing.**

```shell
gatsby develop
```

NB that in order to connect to the database you'll need two ENV variables set:
```shell
export MVC_FIREBASE_API_KEY="<api_key>"
export MVC_FIREBASE_DOMAIN="<domain>"
```

###  🚀 **Building for production.**

```shell
gatsby build
```

### 💫 **Deploying.**

Pushing to the master branch of this repo will automatically publish to firebase:

```
https://mvc.minimal.cards/
```

### 📖 **Translating**

Visit our [Transifex page](https://www.transifex.com/babble/minimum-viable-ceremonies) to translate Minimum Viable Ceremonies into your language!

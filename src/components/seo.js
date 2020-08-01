import React, { useState } from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useTranslation } from "react-i18next"

const SEO = ({ page = 'home', params = {} }) => {
  const { t, i18n } = useTranslation()
  const title = [
    t(`metadata.site.title`),
    t(`metadata.${page}.title`, params),
  ].join(' | ')
  const description = t(`metadata.${page}.description`, params)
  const url = t(`metadata.site.url`)
  const image = require(`../images/${i18n.languages[0]}/meta.png`)

  return (
    <Helmet
      htmlAttributes={{lang: i18n.languages[0]}}
      title={title}
      meta={[{
        name: `description`,
        content: description,
      }, {
        name: `image`,
        content: image,
      }, {
        property: `og:title`,
        content: title,
      }, {
        property: `og:description`,
        content: description,
      }, {
        property: `og:type`,
        content: `website`,
      }, {
        property: `og:image`,
        content: image,
      }, {
        name: `twitter:card`,
        content: `summary`,
      }, {
        name: `twitter:creator`,
        content: `@gdpelican`,
      }, {
        name: `twitter:title`,
        content: title,
      }, {
        name: `twitter:url`,
        content: url,
      }, {
        name: `twitter:description`,
        content: description,
      }]}
    />
  )
}

export default SEO

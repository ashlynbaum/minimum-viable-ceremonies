import React from "react"

import Layout from "../components/layout"
import Intro from "../components/intro"
import SEO from "../components/seo"

import "../data/locales"

const IndexPage = () => (
  <Layout>
    <SEO title="Minimum Viable Ceremonies" />
    <Intro />
  </Layout>
)

export default IndexPage

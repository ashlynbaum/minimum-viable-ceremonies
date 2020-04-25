import React from "react"

import Layout from "../components/layout"
import AllCards from "../components/allCards"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Minimum Viable Ceremonies" />
    <AllCards />
  </Layout>
)

export default IndexPage

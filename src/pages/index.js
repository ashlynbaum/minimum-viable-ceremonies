import React from "react"

import Layout from "../components/layout"
// import Intro from "../components/intro"
import SetupRoom from "../components/setupRoom"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Minimum Viable Ceremonies" />
    <SetupRoom />
  </Layout>
)

export default IndexPage

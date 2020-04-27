import React from "react"

import Layout from "../components/layout"
import Board from "../components/board"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Minimum Viable Ceremonies" />
    <Board />
  </Layout>
)

export default IndexPage

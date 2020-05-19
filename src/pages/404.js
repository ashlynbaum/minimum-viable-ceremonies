import React from "react"

import Loading from "../components/loading"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { window } from "browser-monads"

const NotFoundPage = () => (
  window ? (
    <Layout>
      <SEO title="404: Not found" />
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  ) : (
    <Loading />
  )
)

export default NotFoundPage

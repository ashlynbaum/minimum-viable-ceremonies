import React from "react"
import { MatomoProvider, createInstance } from "@datapunt/matomo-tracker-react"

import "../styles/layout.scss"

const Layout = ({ children }) => (
  <MatomoProvider value={process.env.MATOMO_SITE_ID ? createInstance({
    urlBase: process.env.MATOMO_URL,
    siteId: process.env.MATOMO_SITE_ID
  }) : {}}>
    <main>{children}</main>
  </MatomoProvider>
)

export default Layout

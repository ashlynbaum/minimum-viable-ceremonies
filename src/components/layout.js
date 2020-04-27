import React from "react"

import "../styles/layout.scss"

const Layout = ({ children }) => (
  <div style={{ margin: `0 auto`, maxWidth: 960, padding: `0 1.0875rem 1.45rem`}}>
    <main>{children}</main>
  </div>
)

export default Layout

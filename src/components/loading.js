import React from "react"

import "../styles/loading.scss"

const Loading = () => (
  <div className="loading">
    <div className="loading-spinner">
      <div className="loading-spinner-dot" />
      <div className="loading-spinner-dot" />
    </div>
  </div>
)

export default Loading

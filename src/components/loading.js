import React from "react"

import "../styles/loading.scss"

const Loading = ({ size }) => (
  <div className="loading">
    <div className="loading-spinner" style={{ width: size, height: size }}>
      <div className="loading-spinner-dot" />
      <div className="loading-spinner-dot" />
    </div>
  </div>
)

export default Loading

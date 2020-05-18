import React from "react"

import "../styles/progress.scss"

const Progress = ({ step, max }) => (
  <div className="progress">
    {[...Array(max)].map((_, index) => (
      <div key={index} className={`progress-dot ${step === index ? 'active' : ''}`} />
    ))}
  </div>
)

export default Progress

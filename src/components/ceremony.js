import React from "react"

import "../styles/ceremony.scss"

const Ceremony = ({ icon, name, description }) => (
  <div className="ceremony hover-state">
    {icon} {name}
  </div>
)

export default Ceremony

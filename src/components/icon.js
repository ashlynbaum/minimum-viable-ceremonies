import React from "react"

const Icon = ({ icon, size = 20 }) => {
  const Svg = require(`../images/icons/${icon}.svg`)
  return <Svg width={size} height={size} />
}

export default Icon

import React from "react"

const Icon = ({ icon, size = 20, className }) => {
  const Svg = require(`../images/icons/${icon}.svg`)
  return <Svg width={size} height={size} className={className} />
}

export default Icon

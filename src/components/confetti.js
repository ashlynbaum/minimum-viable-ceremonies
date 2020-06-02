import React, { useContext, useMemo, useEffect, useState } from "react"
import { window } from "browser-monads"

import "../styles/confetti.scss"
import Particle from "./particle"
import Context from "../contexts/room"

export default () => {
  const { complete } = useContext(Context)
  const [running, setRunning] = useState(false)
  const particles = useMemo(() => (
    [...Array(Math.floor(window.innerWidth / 15))].map((_, id) => (
      <Particle key={id} id={id} />
    ))
  ), [])

  return (
    <div className={`confetti ${complete ? 'running' : ''}`}>
      {particles}
    </div>
  )
}

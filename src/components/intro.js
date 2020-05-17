import React from "react"
import { Link } from "gatsby"
import { useTranslation } from 'react-i18next'

import "../styles/intro.scss"
import board from "../images/board.svg"

const Intro = () => {
  const { t } = useTranslation()

  return (
    <div className="intro">
      <div className="intro-wrapper">
        <div className="intro-left">
          <h1>{t("intro.welcome")}</h1>
          <div className="intro-new">
            <Link className="btn btn-blue" to="setupRoom">{t("intro.setupRoom")}</Link>
          </div>
        </div>
        <div className="intro-right">
          <img src={board} alt="board" />
        </div>
      </div>
    </div>
  )
}

export default Intro

import React from "react"
import Markdown from "react-markdown"
import { useTranslation } from "react-i18next"

import Dropdown from "./dropdown"
import "../styles/ceremony.scss"

function theme(input) {
  if (input === "Coordination") {
    return "ceremony-theme coordination";
  }
  if (input === "Delivery") {
    return "ceremony-theme delivery";
  }
  if (input === "Culture") {
    return "ceremony-theme culture";
  }
  if (input === "Innovation") {
    return "ceremony-theme innovation";
  }
}

const Ceremony = ({ id }) => {
  const { t } = useTranslation()

  return (
    <div className="ceremony">
      <div className="ceremony-content flex">
        <div className='icon mr-2'>
          {t(`ceremonies.${id}.icon`)}
        </div>
        <div className='title leading-snug'>
          {t(`ceremonies.${id}.name`)}
        </div>
      </div>
    </div>
  )
}

export default Ceremony

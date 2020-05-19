import React from "react"
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
    <div className="ceremony mvc-hover-state">
      <Dropdown
        width={340}
        position="right-start"
        theme="light"
        delay={1000}
        tooltip={<>
          <div className={theme(t(`ceremonies.${id}.theme`))}>
            {t(`ceremonies.${id}.theme`)}
          </div>
          <div className="ceremony-icon">
            {t(`ceremonies.${id}.icon`)}
          </div>
          <div className="ceremony-title">
            {t(`ceremonies.${id}.name`)}
          </div>
          <div className="ceremony-subheading">
            {t(`ceremonies.${id}.sub-heading`)}
          </div>
          <p className="ceremony-description">
            {t(`ceremonies.${id}.description`)}
          </p>
        </>}
        text={[t(`ceremonies.${id}.icon`), t(`ceremonies.${id}.name`)].join(" ")}
      />
    </div>
  )
}

export default Ceremony

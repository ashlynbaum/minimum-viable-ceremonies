import React, { useContext } from "react"
import { useTranslation } from "react-i18next"

import Dropdown from "./dropdown"
import Context from "../contexts/room"
import "../styles/ceremony.scss"

const Ceremony = ({ id }) => {
  const { t } = useTranslation()
  const { setCeremonyId } = useContext(Context)

  return (
    <div className="ceremony mvc-hover-state">
      <Dropdown
        width={400}
        position="right-start"
        theme="light"
        delay={1000}
        tooltip={<>
          <div className="ceremony-title">
            {[t(`ceremonies.${id}.icon`), t(`ceremonies.${id}.name`)].join(" ")}
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

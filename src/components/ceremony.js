import React from "react"
import { useTranslation } from "react-i18next"

import "../styles/ceremony.scss"

const Ceremony = ({ id }) => {
  const { t } = useTranslation()

  return (
    <div className="ceremony hover-state">
      {t(`ceremonies.${id}.icon`)} {t(`ceremonies.${id}.name`)}
    </div>
  )
}

export default Ceremony

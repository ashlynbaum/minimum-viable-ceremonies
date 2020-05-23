import React from "react"
import { useTranslation } from "react-i18next"

import "../styles/ceremony.scss"

const Ceremony = ({ id }) => {
  const { t } = useTranslation()

  return (
    <div className="ceremony">
      <div className="ceremony-content flex items-center">
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

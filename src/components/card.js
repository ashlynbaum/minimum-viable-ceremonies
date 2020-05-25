import React from "react"
import Markdown from "react-markdown"
import { useTranslation } from "react-i18next"

import "../styles/card.scss"

const Card = ({ namespace, id, placeholder }) => {
  const { t } = useTranslation()

  return (
    <div className={`card flex-grow flex justify-center ${id ? 'items-start' : 'items-center'}`}>
      {id ? (
        <div className="card-content">
          <div className="card-icon">
            {t(`${namespace}.${id}.icon`)}
          </div>
          <div className="card-title">
            {t(`${namespace}.${id}.name`)}
          </div>
          <div className="card-subheading">
            {t(`${namespace}.${id}.sub-heading`)}
          </div>
          <div className="card-description">
            <Markdown source={t(`${namespace}.${id}.description`)} />
          </div>
        </div>
      ) : (
        <div className="card-placeholder">
          {placeholder}
        </div>
      )}
    </div>
  )
}

export default Card

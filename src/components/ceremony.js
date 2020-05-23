import React, { useContext } from "react"
import { useTranslation } from "react-i18next"

import "../styles/ceremony.scss"
import Context from "../contexts/room"

const Ceremony = ({ id }) => {
  const { t } = useTranslation()
  const { setEditingCeremonyId } = useContext(Context)

  return (
    <div className="ceremony" onClick={() => setEditingCeremonyId(id)}>
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

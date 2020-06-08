import React, { useContext } from "react"
import { useTranslation } from "react-i18next"

import Dropdown from "./dropdown"
import Context from "../contexts/room"
import "../styles/miniCadence.scss"

const MiniCadence = ({ id, basis, klass, onClick }) => {
  const { place, editingCeremony } = useContext(Context)
  const { t } = useTranslation()

  if (!editingCeremony) { return null }

  return (
    <Dropdown
      styles={{flexBasis: `${100 / basis}%`}}
      position="bottom"
      klass={`mini-cadence flex flex-grow ${id} ${editingCeremony.placement === id ? 'selected' : ''}`}
      text={t(`cadences.${id}.miniName`)}
      tooltip={t(`cadences.${id}.description`)}
      onClick={() => place(editingCeremony.id, id) || onClick()}
    />
  )
}

export default MiniCadence

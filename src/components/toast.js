import React, { useContext } from "react"
import { useTranslation } from "react-i18next"

import Context from "../contexts/room"

import "../styles/toast.scss"

const Toast = ({ theme }) => {
  const { t } = useTranslation()
  const { toast: { visible, message } } = useContext(Context)

  return (
    <label className={`toast ${visible ? 'visible' : ''}`}>
      {t(`toast.${message}`)}
    </label>
  )
}

export default Toast

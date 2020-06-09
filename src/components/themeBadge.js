import React from "react"
import { useTranslation } from "react-i18next"

import "../styles/themeBadge.scss"

const ThemeBadge = ({ theme }) => {
  const { t } = useTranslation()

  return (
    <label className={`theme-badge ${theme}`}>
      {t(`themes.${theme}`)}
    </label>
  )
}

export default ThemeBadge

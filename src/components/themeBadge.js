import React from "react"
import { useTranslation } from "react-i18next"

import Dropdown from "./dropdown"
import "../styles/themeBadge.scss"

const ThemeBadge = ({ theme }) => {
  const { t } = useTranslation()

  return (
    <Dropdown
      klass={`theme-badge ${theme}`}
      text={t(`themes.${theme}.name`)}
      position="right"
      tooltip={t(`themes.${theme}.description`)}
    />
  )
}

export default ThemeBadge

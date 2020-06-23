import React from "react"
import { useTranslation } from "react-i18next"

import Context from "../contexts/modal"
import CustomCard from "./customCard"

const SetupCeremony = () => {
  const { t } = useTranslation()

  return (
    <div className="setup-ceremony flex-grow">
      <CustomCard />
    </div>
  )
}

export default SetupCeremony

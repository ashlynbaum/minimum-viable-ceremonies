import React, { useContext } from "react"

import CustomCard from "./customCard"
import Context from "../contexts/modal"

const SetupCeremony = () => {
  const { model, setModel } = useContext(Context)

  return (
    <div className="setup-ceremony flex-grow">
      <CustomCard model={model} setModel={attrs => (
        setModel(current => ({ ...current, ...attrs }))
      )} />
    </div>
  )
}

export default SetupCeremony

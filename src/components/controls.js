import React, { useEffect, useContext } from "react"
import { useTranslation } from "react-i18next"

import Loading from "./loading"
import Context from "../contexts/modal"
import "../styles/controls.scss"

const Controls = () => {
  const { t } = useTranslation()
  const { model, currentStep, nextStep, prevStep, submitting } = useContext(Context)
  const { next, back, canProceed } = currentStep

  return (
    <div className="controls">
      {back && <button onClick={prevStep} className="mvc-btn btn-secondary">{t(back)}</button>}
      <div className="controls-divider" />
      <button disabled={!canProceed(model)} className="mvc-btn btn-primary" onClick={nextStep}>
        {submitting && <Loading size={25} />}
        <span style={{ visibility: submitting ? 'hidden' : 'auto' }}>{t(next)}</span>
      </button>
    </div>
  )
}

export default Controls

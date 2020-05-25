import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"

import Loading from "./loading"
import "../styles/controls.scss"

const Controls = ({ step: { next, nextText, back, backText, canProceed, submitting, afterRender }, index, max }) => {
  const { t } = useTranslation()

  useEffect(() => { setTimeout(afterRender, 500) }, [afterRender])

  return (
    <div className="controls">
      {index > 0 && <button onClick={back} className="mvc-btn btn-secondary">{t(backText)}</button>}
      <div className="controls-divider">
      </div>
      <button disabled={!canProceed()} onClick={next} className="mvc-btn btn-primary">
        {submitting && <Loading size={25} />}
        <span style={{ visibility: submitting ? 'hidden' : 'auto' }}>{t(nextText)}</span>
      </button>
    </div>
  )
}

export default Controls

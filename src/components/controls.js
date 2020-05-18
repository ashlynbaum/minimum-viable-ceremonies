import React from "react"
import { useTranslation } from "react-i18next"

import Progress from "./progress"
import Loading from "./loading"
import "../styles/controls.scss"

const Controls = ({ step: { next, nextText, back, backText, canProceed, submitting }, index, max }) => {
  const { t } = useTranslation()

  return (
    <div className="controls">
      {index > 0 && <button onClick={back} className="btn btn-blue">{t(backText)}</button>}
      <div className="controls-divider">
        {index > 0 && <Progress step={index-1} max={max} />}
      </div>
      <button disabled={!canProceed()} onClick={next} className="btn btn-blue">
        {submitting && <Loading size={25} />}
        <span style={{ visibility: submitting ? 'hidden' : 'auto' }}>{t(nextText)}</span>
      </button>
    </div>
  )
}

export default Controls

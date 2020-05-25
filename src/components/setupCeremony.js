import React, { useState, useContext } from "react"
import Markdown from "react-markdown"
import { useTranslation } from "react-i18next"
import Check from "../images/check-mark.svg"

import Card from "./card"
import MiniBoard from "./miniBoard"
import Context from "../contexts/room"
import "../styles/setup.scss"

const SetupCeremony = ({ onSubmit }) => {
  const { t } = useTranslation()
  const { editingCeremony } = useContext(Context)
  const [{ async }, setCeremony] = useState(editingCeremony)

  if (!editingCeremony) { return null }

  return (
    <div className="setup-ceremony">
      <div className="setup-panel split">
        <div>
          <Card id={editingCeremony.id} namespace="ceremonies" />
        </div>
        <div>
          <h3>{t("setup.ceremony.cadence")}</h3>
          <p>{t("setup.ceremony.cadenceHelptext")}</p>
          <MiniBoard id={editingCeremony.id} />
          <h3>{t("setup.ceremony.schedule")}</h3>
          <p>{t("setup.ceremony.scheduleHelptext")}</p>
          <div className="setup-ceremony-async flex flex-row">
            {[true, false].map(value => (
              <label key={value} className="mvc-radio-option flex content-center">
                <input
                  type="checkbox"
                  name="async"
                  value={value}
                  checked={value === async}
                  onChange={({ target: { checked, value } }) => (
                    setCeremony(current => ({ ...current, async: value === 'true' }))
                  )}
                />
                <div className="mvc-radio-option-label">
                  <Check />
                  <span>{t(`setup.ceremony.${value ? 'async' : 'sync'}`)}</span>
                </div>
              </label>
            ))}
          </div>
          <p>{t(`setup.ceremony.${async ? 'async' : 'sync'}Helptext`)}</p>
        </div>
      </div>
    </div>
  )
}

export default SetupCeremony

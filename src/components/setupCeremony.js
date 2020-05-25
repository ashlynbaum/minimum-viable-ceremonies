import React, { useState, useContext } from "react"
import Markdown from "react-markdown"
import { useTranslation } from "react-i18next"
import Check from "../images/check-mark.svg"

import Card from "./card"
import Context from "../contexts/room"
import "../styles/setup.scss"

const SetupCeremony = ({ onSubmit }) => {
  const { t } = useTranslation()
  const { editingCeremony } = useContext(Context)
  const [{ async }, setCeremony] = useState(editingCeremony)

  if (!editingCeremony) { return null }

  return (
    <div className="setup-ceremony flex flex-row">
      <div className="flex flex-col items-center justify-center">
        <Card id={editingCeremony.id} namespace="ceremonies" />
      </div>
      <div className="flex flex-col">
        <h3>{t("setup.ceremony.schedule")}</h3>
        <p>{t("setup.ceremony.scheduleHelptext")}</p>
        <div className="setup-ceremony-async">
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
          <p>{t(`setup.ceremony.${async ? 'async' : 'sync'}Helptext`)}</p>
        </div>
      </div>
    </div>
  )
}

export default SetupCeremony

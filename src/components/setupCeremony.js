import React, { useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import Check from "../images/check-mark.svg"

import Card from "./card"
import Dropdown from "./dropdown"
import MiniBoard from "./miniBoard"
import Context from "../contexts/room"
import "../styles/setup.scss"

const SetupCeremony = ({ onSubmit }) => {
  const { t } = useTranslation()
  const { editingCeremony, modifyCeremony } = useContext(Context)
  const [cadenceOpen, setCadenceOpen] = useState(false)

  if (!editingCeremony) { return null }
  const { id, placement, async, notes } = editingCeremony

  return (
    <div className="setup-ceremony">
      <div className="setup-panel split">
        <div>
          <Card id={id} namespace="ceremonies" />
        </div>
        <div>
          <h3>{t("setup.ceremony.cadence")}</h3>
          <p>{t("setup.ceremony.cadenceHelptext")}</p>
          <div className={`setup-ceremony-cadence ${placement}`}>
            <Dropdown
              theme="light"
              position="bottom"
              onClick={() => setCadenceOpen(current => !current)}
              tooltip={cadenceOpen ? null : t("common.clickEdit")}
              text={t(`cadences.${placement}.miniName`)}
            />
            <div className={`setup-ceremony-board ${cadenceOpen ? 'visible' : ''}`}>
              <MiniBoard id={id} onClick={() => setCadenceOpen(false)} />
            </div>
          </div>
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
                  onChange={({ target: { checked, value } }) => modifyCeremony(id, { async: value === 'true' })}
                />
                <div className="mvc-radio-option-label">
                  <Check />
                  <span>{t(`setup.ceremony.${value ? 'async' : 'sync'}`)}</span>
                </div>
              </label>
            ))}
          </div>
          <p>{t(`setup.ceremony.${async ? 'async' : 'sync'}Helptext`)}</p>
          <div className="mvc-subtitle">
            {t(`setup.ceremony.${async ? 'syncNotes' : 'asyncNotes'}`)}
            <input
              name="notes"
              value={notes}
              onChange={({ target: { value } }) => modifyCeremony(id, { notes })}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SetupCeremony

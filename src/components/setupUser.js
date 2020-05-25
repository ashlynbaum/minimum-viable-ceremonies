import React, { useRef, useState, useContext } from "react"
import { useTranslation } from "react-i18next"
import phrase from "random-words"

import Controls from "./controls"
import RoleCard from "./roleCard"
import RoleBadge from "./roleBadge"
import Context from "../contexts/room"
import "../styles/setup.scss"
import ceremonyHelp from "../images/help/ceremony.gif"
import voidHelp from "../images/help/void.gif"

const SetupUser = ({ onSubmit }) => {
  const { name, login, roleData } = useContext(Context)
  const { t } = useTranslation()
  const usernameRef = useRef()

  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [currentRole, setCurrentRole] = useState()
  const [{ id, username, roles }, setUser] = useState({
    id: phrase({ exactly: 3, join: '-' }),
    username: '',
    roles: [],
  })
  const steps = [{
    nextText: "setup.controls.next",
    backText: "setup.controls.back",
    canProceed: () => !!username,
    afterRender: () => usernameRef.current && usernameRef.current.focus()
  }, {
    nextText: "setup.controls.next",
    backText: "setup.controls.back",
    canProceed: () => !!roles.length
  }, {
    nextText: "setup.controls.createUser",
    backText: "setup.controls.back",
    canProceed: () => true,
    submitting
  }]

  return (
    <div className="setup-user setup">
      <div className="setup-user-slides setup-slides" style={{ marginLeft: `-${100 * step}%`}}>
        <div className={`setup-user-slide setup-slide ${step === 0 ? 'active' : ''} setup-user-name`}>
          <div className="setup-panel">
            <div className="setup-input-subpanel">
              <h1 className="input-label">{t("setup.user.username")}</h1>
              <input
                ref={usernameRef}
                className="appearance-none bg-transparent border-none w-full text-gray-700 placeholder-gray-600 focus:placeholder-gray-500 font-bold text-2xl mr-3 py-2 leading-tight focus:outline-none"
                name="username"
                placeholder={t("setup.user.usernamePlaceholder")}
                value={username}
                onChange={({ target: { value } }) => setUser(user => ({ ...user, username: value }))}
                onKeyPress={({ which }) => ( // next on enter
                  steps[0].canProceed() && which === 13 && setStep(step => step + 1)
                )}
              />
            </div>
          </div>
        </div>
        <div className={`setup-user-slide setup-slide ${step === 1 ? 'active' : ''} setup-user-cadence`}>
          <div className="flex flex-row">
            <div className="flex-none flex flex-col items-center" style={{height:'100%'}}>
              <RoleCard role={currentRole} placeholder={t("setup.user.showRole")} />
            </div>
            <div className="role-select-card flex-shrink">
              <h1 className="">
                {t("setup.user.role")}
              </h1>
              <p>{t("setup.user.roleHelpText")}</p>
              <div className="setup-roles mvc-radio-options flex">
                {roleData.map(role => <RoleBadge key={role} role={role} onClick={setUser} onHover={setCurrentRole} />)}
              </div>
            </div>
          </div>
        </div>
        <div className={`setup-user-slide setup-slide ${step === 2 ? 'active' : ''} setup-user-link`}>
          <div className="setup-panel">
            <div className="flex flex-col justify-center">
              <h1 className="text-center mt-3">
                {t("setup.user.ready")}
              </h1>
            </div>
            <div className="flex justify-center mt-8">
              <div className="flex flex-col mr-6 instruction">
                <img src={ceremonyHelp} alt={t("setup.user.ceremonyHelptext")} />
                <div className="text-center mx-auto mb-3">
                  {t("setup.user.ceremonyHelptext")}
                </div>

              </div>
              <div className="flexflex-col instruction">
                <img src={voidHelp} alt={t("setup.user.voidHelptext")} />
                <div className="text-center mx-auto mb-3">
                  {t("setup.user.voidHelptext")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Controls index={step} max={steps.length-1} step={{
        ...steps[step],
        back: () => setStep(step => step - 1),
        next: step < steps.length -1
          ? () => setStep(step => step + 1)
          : () => {
            setSubmitting(true)
            login({ id, username, roles }).catch(() => setSubmitting(false))
          }
      }} />
    </div>
  )
}

export default SetupUser

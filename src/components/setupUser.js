import React, { useRef, useEffect, useState, useContext } from "react"
import { useTranslation } from "react-i18next"

import Card from "./card"
import RoleBadge from "./roleBadge"
import RoomContext from "../contexts/room"
import ModalContext from "../contexts/modal"
import { authWithGoogle } from "../firebase/auth"
import "../styles/setup.scss"
import ceremonyHelp from "../images/help/ceremony.gif"
import voidHelp from "../images/help/void.gif"
import GoogleLogo from "../images/icons/symbols/google.svg"

const SetupUser = ({ onSubmit }) => {
  const { roleData, features } = useContext(RoomContext)
  const { nextStep, currentStep, nextStepOnEnter, model, setModel } = useContext(ModalContext)
  const [currentRole, setCurrentRole] = useState()
  const { t } = useTranslation()
  const usernameRef = useRef()

  useEffect(() => {
    if (currentStep.index === 1) {
      setTimeout(() => usernameRef.current.focus(), 500)
    }
  }, [currentStep.index])

  useEffect(() => {
    if (currentStep.index === 0 && model.uid) {
      nextStep()
    }
  }, [currentStep.index, model.uid])

  return (
    <div className="setup-user setup">
      <div className="setup-user-slides setup-slides" style={{ marginLeft: `-${100 * currentStep.index}%`}}>
        <div className={`setup-user-slide setup-slide ${currentStep.index === 0 ? 'active' : ''} setup-user-uid`}>
          {features.premium && (
            <div className="setup-panel">
              <div className="setup-input-subpanel">
                <button className="mvc-btn btn-secondary m-auto flex" onClick={() => (
                  authWithGoogle().then(user => setModel(current => ({ ...current, ...user })))
                )}>
                  <GoogleLogo className="mvc-logo mr-2" />
                  <span>{t("setup.user.login.google")}</span>
                </button>
              </div>
            </div>
          )}
        </div>
        <div className={`setup-user-slide setup-slide ${currentStep.index === 1 ? 'active' : ''} setup-user-name`}>
          <div className="setup-panel">
            {model.uid && <div className="setup-input-subpanel">
              <img className="setup-input-avatar" src={model.image} alt={model.username} />
            </div>}
            <div className="setup-input-subpanel mt-4">
              {!model.uid && <h1 className="input-label">{t("setup.user.username")}</h1>}
              <input
                autoComplete="off"
                ref={usernameRef}
                className="mvc-inline-edit appearance-none bg-transparent border-none w-full text-gray-700 placeholder-gray-600 focus:placeholder-gray-500 font-bold text-2xl mr-3 py-2 leading-tight focus:outline-none"
                name="username"
                placeholder={t("setup.user.usernamePlaceholder")}
                value={model.username}
                onChange={({ target: { value } }) => setModel(user => ({ ...user, username: value }))}
                onKeyPress={currentStep.index === 1 ? nextStepOnEnter : null}
              />
            </div>
            {model.uid && <div className="setup-input-subpanel mt-4">
              <input
                autoComplete="off"
                className="mvc-inline-edit appearance-none bg-transparent border-none w-full text-gray-700 placeholder-gray-600 focus:placeholder-gray-500 font-bold text-2xl mr-3 py-2 leading-tight focus:outline-none"
                disabled={true}
                name="email"
                placeholder={t("setup.user.usernamePlaceholder")}
                value={model.email}
                onChange={({ target: { value } }) => setModel(user => ({ ...user, username: value }))}
                onKeyPress={currentStep.index === 1 ? nextStepOnEnter : null}
              />
            </div>}
          </div>
        </div>
        <div className={`setup-user-slide setup-slide ${currentStep.index === 2 ? 'active' : ''} setup-user-cadence`}>
          <div className="flex flex-row">
            <div className="flex-none flex flex-col items-center" style={{height:'100%'}}>
              <Card namespace="roles" id={currentRole} placeholder={t("setup.user.showRole")} />
            </div>
            <div className="role-select-card flex-shrink">
              <h1 className="">
                {t("setup.user.role")}
              </h1>
              <p>{t("setup.user.roleHelpText")}</p>
              <div className="setup-roles mvc-radio-options flex">
                {roleData.map(role => (
                  <RoleBadge
                    key={role}
                    role={role}
                    onClick={(value, checked) => setModel(current => ({
                      ...current,
                      roles: checked ? current.roles.concat(value) : current.roles.filter(r => r !== value)
                    }))}
                    onHover={setCurrentRole}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={`setup-user-slide setup-slide ${currentStep.index === 3 ? 'active' : ''} setup-user-link`}>
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
              <div className="flex flex-col instruction">
                <img src={voidHelp} alt={t("setup.user.voidHelptext")} />
                <div className="text-center mx-auto mb-3">
                  {t("setup.user.voidHelptext")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SetupUser

import React, { useState, useContext, useMemo } from "react"
import { useTranslation } from "react-i18next"

import Controls from "./controls"
import Card from "./card"
import RoleBadge from "./roleBadge"
import Context from "../contexts/room"
import "../styles/editUser.scss"

const EditUser = ({ onSubmit }) => {
  const { editingUser, roleData, modifyParticipant, setEditingUserId } = useContext(Context)
  const { t } = useTranslation()
  const [user, setUser] = useState(editingUser)
  const [currentRole, setCurrentRole] = useState()

  const roles = useMemo(() => (
    editingUser && Object.values(editingUser.roles || [])
  ), [editingUser])

  if (!editingUser) { return null }

  return (
    <div className="edit-user flex flex-col">
      <div className="setup-panel split">
        <div>
          <Card namespace="roles" id={currentRole || roles[0]} />
        </div>
        <div>
          <h3 className="mvc-subtitle">{t("participant.name")}</h3>
          <input
            className="edit-user-field bg-transparent border-none w-full text-gray-700 placeholder-gray-600 focus:placeholder-gray-500 font-bold text-2xl leading-tight focus:outline-none"
            name="username"
            placeholder={t("setup.user.usernamePlaceholder")}
            value={editingUser.username}
            onChange={({ target: { value } }) => modifyParticipant(editingUser.id, { username: value })}
          />
          <h3 className="mvc-subtitle">{t("participant.roles")}</h3>
          <div className="justify-start mvc-radio-options edit-user-field">
            {roleData.map(role => (
              <RoleBadge
                key={role}
                role={role}
                checked={roles.includes(role)}
                onHover={setCurrentRole}
                onClick={(role, checked) => modifyParticipant(editingUser.id, {
                  roles: checked ? roles.concat(role) : roles.filter(r => r !== role)
                })}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditUser

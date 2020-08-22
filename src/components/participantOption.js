import React, { useContext } from "react"
import Context from "../contexts/room"

import ParticipantIcon from "./participantIcon"

export default ({ data, innerProps, innerRef }) => {
  const { participants } = useContext(Context)
  const { id, image, username, roles } = participants[data.value]

  return (
    <div ref={innerRef} {...innerProps}>
      <div className="flex items-center">
        <ParticipantIcon id={id} image={image} username={username} roles={roles} />
        <div className="participant-name">{username}</div>
      </div>
    </div>
  )
}

import React, { useMemo, useContext } from "react"
import Context from "../contexts/room"
import Ceremony from "../components/ceremony"
import { Droppable } from "react-beautiful-dnd"

import "../styles/cadence.scss"

const Cadence = ({ id, basis, klass, showTitle }) => {
  const { cadences, placedOn } = useContext(Context)
  const cadence = useMemo(() => cadences[id], [cadences, id])

  return (
    <div style={{flexBasis: `${100 / basis}%`}} className={`cadence flex-grow ${id}`}>
      <Droppable droppableId={cadence.name} type="cadence">
        {({ innerRef, droppableProps, placeholder} ) => (
          <div className="cadence-droppable" ref={innerRef} {...droppableProps}>
            <div>{cadence.name}</div>
            {placedOn(id).map(({ id, icon, name, description }, index) => (
              <Ceremony
                key={id}
                id={id}
                icon={icon}
                name={name}
                description={description}
                index={index}
              />
            ))}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default Cadence

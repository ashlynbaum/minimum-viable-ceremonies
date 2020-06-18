import React, { useMemo } from "react"
import { window } from "browser-monads"

const TYPES = ['circle', 'circle', 'squiggle']
const COLORS = ['#2ecc71','#3498db','#e67e22','#e67e22','#e74c3c']
const generateNumber = (min, max) => (
  min + Math.floor(Math.random() * (max - min))
)

export default ({ id }) => {
  const type     = useMemo(() => TYPES[generateNumber(0, TYPES.length)], [])
  const size     = useMemo(() => generateNumber(...(type === 'circle' ? [5,10] : [30,70])), [type])
  const color    = useMemo(() => COLORS[generateNumber(0, COLORS.length)], [])
  const rotation = useMemo(() => type === 'circle' ? [15,45] : [-45,45], [type])
  const speed    = useMemo(() => generateNumber(5,20) / 10.0, [])
  const drift    = useMemo(() => generateNumber(1,4), [])

  const style = useMemo(() => ({
    position: "absolute",
    animation: `drift-${drift} ${speed*3}s infinite ease-in-out`,
    width: size,
    height: size,
    backgroundColor: type === "circle" && color,
    borderRadius: type === "circle" && size,
    transform: `rotateZ(${generateNumber(...rotation)}deg)`,
    left: generateNumber(0, window.innerWidth),
    top: generateNumber((window.innerHeight/2) - window.innerHeight, (window.innerHeight/10)),
  }), [size, type, color, rotation, speed, drift])

  return (
    <div className={`particle particle-${type}`} style={style}>
      {type === 'squiggle' && (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill={color} d="M428.127,0l-12.716,10.062l12.718-10.06c8.785,11.101,19.716,24.917,19.716,51.051 s-10.932,39.951-19.716,51.053c-7.382,9.331-12.716,16.072-12.716,30.927c0,14.854,5.334,21.594,12.716,30.925   c8.784,11.101,19.716,24.917,19.716,51.05c0,26.135-10.931,39.949-19.715,51.051c-7.383,9.331-12.717,16.072-12.717,30.927   c0,14.855,5.332,21.593,12.711,30.919l-25.435,20.124c-8.781-11.097-19.708-24.909-19.708-51.042 c0-26.135,10.931-39.949,19.715-51.051c7.383-9.331,12.717-16.072,12.717-30.927c0-14.855-5.335-21.595-12.717-30.926 c-8.784-11.101-19.715-24.916-19.715-51.049s10.931-39.95,19.715-51.051c7.383-9.331,12.717-16.072,12.717-30.928 c0-14.855-5.335-21.596-12.718-30.927L428.127,0z"/>
        </svg>
      )}
    </div>
  )
}

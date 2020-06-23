import { useState, useMemo } from "react"

const useRoomContext = (initialModel, steps = [], close, submit) => {
  const [model, setModel] = useState(initialModel)
  const [index, setIndex] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const currentStep = useMemo(() => (
    { canProceed: () => true, index, ...steps[index] }
  ), [steps, index])

  const prevStep = () => setIndex(i => i - 1)
  const nextStep = () => index < steps.length - 1
    ? currentStep.canProceed(model) && setIndex(i => i + 1)
    : setSubmitting(true) || submit(model).then(
      () => close(null) || setModel(initialModel)
    ).finally(
      () => setSubmitting(false)
    )

  return {
    model, setModel,
    submitting,
    currentStep,
    close,
    prevStep, nextStep,
    nextStepOnEnter: ({ which }) => (
      which === 13 &&
      currentStep.canProceed(model) &&
      nextStep()
    )
  }
}

export default useRoomContext

import { useState } from 'react'
import Stage from "./Stage"

export default function Stages() {

  const [currentStep, setCurrentStep] = useState(0)

  return (
    <nav aria-label="Progress">
      <ol role="list" className="overflow-hidden">
        <Stage
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          position={0}
          isLast={false}
          title={"Create a message"}
          description={"Share with the world you favorite ETHTokyo story"}
        />
        <Stage
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          position={1}
          isLast={false}
          title={"Verify yourself"}
          description={"Prove that you are not a bot"}
        />
        <Stage
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          position={2}
          isLast={true}
          title={"Send the post"}
          description={"Submit your message to our Lens account"}
        />
      </ol>
    </nav>
  )
}

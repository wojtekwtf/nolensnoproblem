import { useState } from 'react'
import Stage from "./Stage"
import ContentInput from './ContentInput'
import CustomSismoConnectButton from './SismoConnectButton'
import Button from './Button'

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
          component={<ContentInput />}
        />
        <Stage
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          position={1}
          isLast={false}
          title={"Verify yourself"}
          description={"Prove that you are not a bot"}
          component={<CustomSismoConnectButton />}
        />
        <Stage
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          position={2}
          isLast={true}
          title={"Send the post"}
          description={"Submit your message to our Lens account"}
          component={<Button />}
        />
      </ol>
    </nav>
  )
}

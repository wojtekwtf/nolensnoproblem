import { useEffect, useState } from 'react'
import Stage from "./Stage"
import ContentInput from './ContentInput'
import CustomSismoConnectButton from './SismoConnectButton'
import Button from './Button'
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
import axios from 'axios'


export default function Stages() {

  const [currentStep, setCurrentStep] = useState(0)
  const [content, setContent] = useState("")
  const { width, height } = useWindowSize()

  const postToLens = async () => {
    const res = await axios.post('/api/post', { content: content })
  }

  useEffect(() => {
    if (currentStep === 3) {
      postToLens()
    }
  }, [currentStep])


  return (
    <nav aria-label="Progress" className='w-full'>
      <ol role="list" className="overflow-hidden">
        <Stage
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          position={0}
          isLast={false}
          title={"Create a message"}
          description={"Share with the world you favorite ETHTokyo story"}
          component={<ContentInput content={content} setContent={setContent} />}
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
          component={<Button setCurrentStep={setCurrentStep} />}
        />
        {currentStep === 3 &&
          <div>
            <Confetti
              width={width}
              height={height}
              numberOfPieces={400}
              recycle={false}
            />
            <p>Congratulations! Your post will be soon available on our <a target='_blank' href="https://testnet.lenster.xyz/u/ethtokyo" className='font-bold underline'>Lens profile 🌿</a></p>
          </div>}
      </ol>
    </nav>
  )
}

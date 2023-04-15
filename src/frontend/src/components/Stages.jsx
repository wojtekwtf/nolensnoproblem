import { useEffect, useState } from 'react'
import Stage from "./Stage"
import ContentInput from './ContentInput'
import VerificationButtons from './VerificationButtons'
import Button from './Button'
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
import axios from 'axios'


export default function Stages() {

  const [currentStep, setCurrentStep] = useState(0)
  const [content, setContent] = useState("")
  const [loadingPost, setLoadingPost] = useState(false)

  const { width, height } = useWindowSize()

  const postToLens = async () => {
    setLoadingPost(true)
    await axios.post('/api/post', { content: content })
    setLoadingPost(false)
    setCurrentStep(3)
  }

  return (
    <nav aria-label="Progress" className='w-full'>
      <ol role="list" className="overflow-hidden">
        <Stage
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          position={0}
          isLast={false}
          title={"Create a message"}
          description={"Tell the world about your funny ETHTokyo experience"}
          component={<ContentInput content={content} setContent={setContent} />}
        />
        <Stage
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          position={1}
          isLast={false}
          title={"Verify yourself"}
          description={"Prove that you are not a bot"}
          component={<VerificationButtons />}
        />
        <Stage
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          position={2}
          isLast={true}
          title={"Send the post"}
          description={"Submit your message to our Lens account"}
          component={<Button loadingPost={loadingPost} postToLens={postToLens} />}
        />
        {currentStep === 3 &&
          <div>
            <Confetti
              width={width}
              height={height}
              numberOfPieces={400}
              recycle={false}
            />
            <p>Congratulations! Your post will be soon available on our <a target='_blank' href="https://testnet.lenster.xyz/u/ethtokyoanon" className='font-bold underline'>Lens profile 🌿</a></p>
          </div>}
      </ol>
    </nav>
  )
}

import { CheckIcon } from '@heroicons/react/20/solid'
import ContentInput from './ContentInput'


export default function Stage(props) {

  return (
    <li key={1} className='pb-10 relative'>
      {props.currentStep > props.position ? (
        <>
          {!props.isLast ? (
            <div className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-basil" aria-hidden="true" />
          ) : null}
          <div onClick={() => props.setCurrentStep(props.position)} className="group relative flex items-start hover:cursor-pointer">
            <span className="flex h-9 items-center">
              <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-basil group-hover:bg-basil">
                <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
              </span>
            </span>
            <span className="ml-4 flex min-w-0 flex-col">
              <span className="text-sm font-medium">{props.title}</span>
              <span className="text-sm text-gray-500">{props.description}</span>
            </span>
          </div>
        </>
      ) : props.currentStep === props.position ? (
        <>
          {!props.isLast ? (
            <div className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300" aria-hidden="true" />
          ) : null}
          <div className="group relative flex items-start hover:cursor-pointer" aria-current="step">
            <span className="flex h-9 items-center" aria-hidden="true">
              <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-basil bg-white">
                <span className="h-2.5 w-2.5 rounded-full bg-basil" />
              </span>
            </span>
            <span className="ml-4 flex min-w-0 flex-col">
              <span className="text-sm font-medium text-basil">{props.title}</span>
              <span className="text-sm text-gray-500 mb-1">{props.description}</span>
              {props.component}
            </span>
          </div>
        </>
      ) : (
        <>
          {!props.isLast ? (
            <div className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300" aria-hidden="true" />
          ) : null}
          <div onClick={() => props.setCurrentStep(props.position)} className="group relative flex items-start hover:cursor-pointer">
            <span className="flex h-9 items-center" aria-hidden="true">
              <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
              </span>
            </span>
            <span className="ml-4 flex min-w-0 flex-col">
              <span className="text-sm font-medium text-gray-500">{props.title}</span>
              <span className="text-sm text-gray-500">{props.description}</span>
            </span>
          </div>
        </>
      )}
    </li>
  )
}

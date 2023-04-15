import Stages from "../components/Stages"


export default function Home() {

  return (
    <div className="min-h-screen">
      <div className="flex flex-row justify-center items-center text-lime-900 text-2xl mt-10">
        <p>No </p>
        <img src="/lens_logo.svg" alt="lens-logo" className="w-20 h-20" />
        <p>no problem</p>
      </div>
      <div className="flex flex-col justify-center items-center pt-6">
        <Stages />
      </div>
    </div>
  )
}

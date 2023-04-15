import Stages from "../components/Stages"


export default function Home() {

  return (
    <div className="min-h-screen">
      <div className="flex flex-row justify-center items-center text-lime-900 text-2xl mt-10">
        <p>ETHTokyo anon</p>
      </div>
      <div className="flex flex-col justify-center items-center pt-6 w-[320px] mx-auto px-4 md:px-0">
        <Stages />
      </div>
    </div>
  )
}

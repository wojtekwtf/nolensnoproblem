import Stages from "../components/Stages"


export default function Home() {

  return (
    <div className="min-h-screen">
      <div className="flex flex-col justify-center items-center mt-10 px-10 md:px-0">
        <div className="flex flex-row items-center">
          <p className="text-gray-900 text-4xl mb-4 md:mb-2">ETHTokyo anon</p>
        </div>
        <p className="text-gray-500 text-sm max-w-sm">Send anonymous stories about your ETHTokyo experience to Lens with one tap. Read the stories at <a className="font-bold underline" href="https://testnet.lenster.xyz/u/ethtokyoanon">ethtokyoanon.lens</a></p>
      </div>
      <div className="flex flex-col justify-center items-center pt-10 w-[320px] mx-auto px-4 md:px-0">
        <Stages />
      </div>
      <div className="flex flex-col justify-center items-start mt-10 max-w-sm mx-auto px-10 md:px-0">
        <p className="text-gray-500 text-sm max-w-sm pt-20">Made by <a className="font-bold underline" href="https://lenster.xyz/u/messi">woj.eth</a> and <a className="font-bold underline" href="https://lenster.xyz/u/matteo">mtteo.eth</a> from <a className="font-bold underline" href="https://twitter.com/mazuryxyz">Mazury</a>.</p>
        <p className="text-gray-500 text-sm max-w-sm pt-2">Original hackathon submission is <a className="font-bold underline" href="https://nolensnoproblem.vercel.app/">here</a>.</p>
      </div>
    </div>
  )
}

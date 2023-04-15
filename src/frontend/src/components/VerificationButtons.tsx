import FakeSismoButton from "./FakeSismoButton";
import WorldCoinButton from "./WorldCoinButton";

export default function VerificationButtons() {

  return (
    <div className="flex flex-col">
      <FakeSismoButton />
      <p className="text-sm my-1 text-gray-600">OR</p>
      <WorldCoinButton />
    </div>
  )
}

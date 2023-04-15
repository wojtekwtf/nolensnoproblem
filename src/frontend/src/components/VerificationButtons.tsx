import CustomSismoConnectButton from "./SismoConnectButton";
import WorldCoinButton from "./WorldCoinButton";

export default function VerificationButtons() {

  return (
    <div>
      <CustomSismoConnectButton />
      <p className="text-sm my-1 text-gray-600">OR</p>
      <WorldCoinButton />
    </div>
  )
}

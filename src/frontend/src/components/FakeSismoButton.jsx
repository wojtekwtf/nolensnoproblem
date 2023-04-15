export default function FakeSismoButton() {

  return (
    <button
      onClick={() => alert("Verification disabled for demo purposes. Proceed to posting.")}
      className="flex rounded-xl bg-blue-950 text-white px-3.5 py-2.5 text-sm"
    >
      <svg className="mr-2" width="16" height="17" viewBox="0 -2 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.99994 15.75L15.6234 10.2115L12.7113 1.25H3.28855L0.376465 10.2115L7.99994 15.75Z" fill="url(#paint0_linear_123_4882)"></path><path d="M7.99994 15.75L15.6234 10.2115M7.99994 15.75L0.376465 10.2115M7.99994 15.75L13.4088 9.89149M7.99994 15.75L2.6347 9.89149M15.6234 10.2115L12.7113 1.25M15.6234 10.2115L13.4088 9.89149M12.7113 1.25H3.28855M12.7113 1.25L13.4088 9.89149M3.28855 1.25L0.376465 10.2115M3.28855 1.25L13.4088 9.89149M3.28855 1.25L2.6347 9.89149M0.376465 10.2115L2.6347 9.89149" stroke="url(#paint1_linear_123_4882)" stroke-width="0.5" stroke-miterlimit="10"></path><defs><linearGradient id="paint0_linear_123_4882" x1="3.5" y1="1.5" x2="11.75" y2="13.25" gradientUnits="userSpaceOnUse"><stop offset="0.0876413" stop-color="#0F1D42"></stop><stop offset="0.55703" stop-color="#877C6A"></stop><stop offset="0.914377" stop-color="#E2C488"></stop></linearGradient><linearGradient id="paint1_linear_123_4882" x1="3.5" y1="1" x2="11.75" y2="13.25" gradientUnits="userSpaceOnUse"><stop stop-color="#E2C488"></stop><stop offset="1" stop-color="#13203D"></stop></linearGradient></defs></svg>
      Verify with Sismo
    </button>
  )
}
import { BsGoogle } from 'react-icons/bs';

type Props  = {
    text:string
}

const SignInWithGoogleButton = ({text}: Props) => {
  return (
    <button className="bg-white hover:bg-white/85 transition duration-200 flex items-center text-sm justify-center text-gray-800 rounded-full py-2 px-6 text-center w-full">
      <div className="mr-2">
        <BsGoogle />
      </div>
      {text}
    </button>
  );
}

export default SignInWithGoogleButton
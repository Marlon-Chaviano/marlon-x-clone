
import React from 'react'
import { BsEnvelope, BsGithub, BsInstagram, BsLinkedin, BsTwitterX } from 'react-icons/bs';

const MeCard = () => {
  return (
    <div className="w-full max-w-[500px] p-2 grid md:grid-cols-2 space-x-2 items-center justify-evenly">
      <div className="p-1">
        <div className="font-bold text-gray-500">
          Made with ♥️ by <span className="text-primary">Marlon</span>
        </div>
      </div>

      <div className="flex justify-evenly p-1">
        <div className="hover:text-primary cursor-pointer transition hover:scale-[1.1]">
          <a target="_blank" href="https://www.instagram.com/marlon.developer/">
            <BsInstagram />
          </a>
        </div>

        <div className="hover:text-primary cursor-pointer transition hover:scale-[1.1]">
          <a target="_blank" href="">
            <BsGithub />
          </a>
        </div>

        <div className="hover:text-primary cursor-pointer transition hover:scale-[1.1]">
          <a
            target="_blank"
            href="https://www.linkedin.com/in/marlon-chaviano-563806287"
          >
            <BsLinkedin />
          </a>
        </div>

        <div className="hover:text-primary cursor-pointer transition hover:scale-[1.1]">
          <a target="_blank" href="https://twitter.com/MarlonWebDev">
            <BsTwitterX />
          </a>
        </div>
        <div className="hover:text-primary cursor-pointer transition hover:scale-[1.1]">
          <a target="_blank" href="mailto:chavianomarlon@gmail.com">
            <BsEnvelope />
          </a>
        </div>
      </div>
    </div>
  );
}

export default MeCard
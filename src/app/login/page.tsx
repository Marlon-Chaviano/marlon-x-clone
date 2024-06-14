
import Logo from "@/app/x-social-media-white-icon.svg";
import Image from "next/image";
import SignInWithGoogleButton from "@/components/client-component/SignInButton";
import SignInEmail from "@/components/client-component/SignInEmail";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function LoginPage() {
   const supabase = createClient()
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      redirect("home");
    } 
  return (
    <div className="w-screen overflow-x-hidden h-screen flex items-center relative space-x-4 justify-center text-white pt-12">
      <div className="flex justify-center lg:visible lg:relative invisible absolute  items-center w-[600px]">
        <Image alt="X logo" src={Logo} width={400} />
      </div>
      <div>
        <div className="w-[90%] p-4 flex flex-col space-y-10 max-w-[450px] mx-auto">
          <div className="w-full mx-auto">
            <Image alt="X logo" src={Logo} width={40} height={40} />
          </div>

          <div className="w-full mx-auto pt-1">
            <div className="grid text-5xl font-extrabold text-white/85 space-y-2">
              <p>Lo que está</p>
              <p>pasando</p>
              <p>ahora</p>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <div className="mb-2">
              <h3 className="text-2xl font-bold text-white/85">Únete Hoy</h3>
            </div>
            <div className="flex flex-col space-y-2">
              <SignInWithGoogleButton text={"Registrarse con Google"} />
              <SignInEmail />
            </div>
            <div className="flex w-full items-center justify-center space-x-2">
              <div className="w-[150px] h-[0.5px] bg-slate-500"></div>
              <div>o</div>
              <div className="w-[150px] h-[0.5px] bg-slate-500"></div>
            </div>

            <div className="flex flex-col w-full justify-center">
              <Link
                href="login/signup"
                className="w-full hover:opacity-85 transition duration-200 rounded-full py-2 px-6 flex justify-center items-center bg-primary text-white font-extrabold tracking-wider"
              >
                Crear cuenta
              </Link>
              <div className="text-xs text-gray-500 mt-1 text-justify">
                Al registrarse, aceptas los{" "}
                <span className="text-primary">Términos de servicio</span>, la{" "}
                <span className="text-primary">Política de privacidad</span>,
                incluida la política de{" "}
                <span className="text-primary">Uso de Cookies</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-md font-bold">¿Ya tienes cuenta?</h3>
            <button className="rounded-full hover:opacity-85 border border-gray-400 text-primary font-bold text-center mt-2 py-2 px-6 w-full">
              Iniciar sesión
            </button>
            <div className="w-full flex justify-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

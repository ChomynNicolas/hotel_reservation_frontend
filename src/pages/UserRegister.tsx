import { SubmitHandler, useForm } from "react-hook-form";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

type Inputs = {
  name: string;
  email: string;
  password: string;
};


export const UserRegister = () => {
  const navigate = useNavigate();
  const [registerMessage, setRegisterMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);

    try {
      await axios.post("http://127.0.0.1:5000/api/register", data);
      navigate("/login");
    } catch (error) {
      
      if (axios.isAxiosError(error)) {
        if (error.response) {
          
          console.error('Error en la respuesta:', error.response.data);
          setRegisterMessage(error.response.data.error || 'Ocurrió un error en el servidor');
        } else if (error.request) {
          
          console.error('Error en la solicitud, no hay respuesta del servidor:', error.request);
          setRegisterMessage('No hay respuesta del servidor. Intenta nuevamente más tarde.');
        } else {
          
          console.error('Error al configurar la solicitud:', error.message);
          setRegisterMessage('Error al enviar la solicitud. Verifica tu conexión a internet.');
        }
      } else {
        
        console.error('Error desconocido:', error);
        setRegisterMessage('Ocurrió un error inesperado. Intenta nuevamente.');
      }
    }
  };
  return (
    <>
      <div className="font-sans text-gray-900 antialiased">
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#0c0a29]">
          <div>
            <Link to={"/"}>
              <h2 className="font-bold text-3xl text-yellow-500">
                Hotel{" "}
                <span className="bg-yellow-500 text-white px-2 rounded-md">
                  Estrella
                </span>
              </h2>
            </Link>
          </div>

          <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="py-8">
                <center>
                  <span className="text-2xl font-semibold">Registro</span>
                </center>
              </div>

              <div>
                <label
                  className="block font-medium text-sm text-gray-700"
                  htmlFor="name"
                />
                <input
                  id="name"
                  type="name"
                  placeholder="Nombre y Apellido"
                  {...register("name", { minLength: 4, required: true })}
                  className={clsx(
                    "w-full rounded-md py-2.5 px-4 border text-sm outline-yellow-500",
                    errors.name ? "border-2 border-red-300 " : ""
                  )}
                />
                {errors.name?.type === "minLength" && (
                  <span className="text-sm font-semibold text-red-300">
                    El nombre tiene que tener al menos 4 caracteres
                  </span>
                )}
              </div>

              <div className="my-2">
                <label
                  className="block font-medium text-sm text-gray-700"
                  htmlFor="email"
                />
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                  className={clsx(
                    "w-full rounded-md py-2.5 px-4 border text-sm outline-yellow-500",
                    errors.email ? "border-2 border-red-300 " : ""
                  )}
                />
              </div>

              <div>
                <label
                  className="block font-medium text-sm text-gray-700"
                  htmlFor="password"
                />
                <div>
                  <input
                    id="password"
                    type="password"
                    placeholder="Contraseña"
                    {...register("password", { required: true, minLength: 8 })}
                    className={clsx(
                      "w-full rounded-md py-2.5 px-4 border text-sm outline-yellow-500",
                      errors.password ? "border-2 border-red-300 " : ""
                    )}
                  />
                  {errors.password?.type === "minLength" && (
                    <span className="text-sm font-semibold text-red-300">
                      La contraseña tiene que tener al menos 8 caracteres
                    </span>
                  )}
                </div>
                {((registerMessage.length > 0)&&(!(errors.email || errors.password || errors.name ))) ? (
                  <span className="text-sm font-semibold text-red-300">
                    {registerMessage}
                  </span>
                ) : (
                  ""
                )}
              </div>

              <div className="flex items-center justify-center mt-4">
                <button className="ms-4 inline-flex items-center px-4 py-2 bg-yellow-500 border border-transparent rounded-md font-bold text-xs text-white uppercase tracking-widest hover:bg-yellow-600 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
                  Registrarse
                </button>
                <p className="mx-2">-</p>
                <Link
                  className="hover:underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  to={"/login"}
                >
                  Iniciar sesión
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

import axios from "axios";
import clsx from "clsx";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";

type Inputs = {
  email: string;
  password: string;
};

interface ApiResponse {
  access_token?: string;
  error?: string;
  role?: string;
}

export const UserLogin = () => {
  const [loginMessage, setLoginMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await axios.post<ApiResponse>(
        "http://127.0.0.1:5000/api/login",
        data
      );
      if (response.data.access_token) {
        localStorage.setItem("accessToken", response.data.access_token);

        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Error en la respuesta:", error.response.data);
          setLoginMessage(
            error.response.data.error || "Ocurrió un error en el servidor"
          );
        } else if (error.request) {
          console.error(
            "Error en la solicitud, no hay respuesta del servidor:",
            error.request
          );
          setLoginMessage(
            "No hay respuesta del servidor. Intenta nuevamente más tarde."
          );
        } else {
          console.error("Error al configurar la solicitud:", error.message);
          setLoginMessage(
            "Error al enviar la solicitud. Verifica tu conexión a internet."
          );
        }
      } else {
        console.error("Error desconocido:", error);
        setLoginMessage("Ocurrió un error inesperado. Intenta nuevamente.");
      }
    }
  };

  return (
    <>
      <div className="w-full font-sans text-gray-900 antialiased m-0">
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#f8f4f3]">
          <div>
            <a href="/">
              <h2 className="font-bold text-3xl">
                Hotel{" "}
                <span className="bg-[#f84525] text-white px-2 rounded-md">
                  Estrella
                </span>
              </h2>
            </a>
          </div>

          <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="py-8">
                <center>
                  <span className="text-2xl font-semibold">Iniciar Sesión</span>
                </center>
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
                    "w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]",
                    errors.email ? "border-2 border-red-500 " : ""
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
                      "w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]",
                      errors.password ? "border-2 border-red-500 " : ""
                    )}
                  />
                  {errors.password?.type === "minLength" && (
                    <span className="text-sm font-semibold text-red-500">
                      La contraseña tiene que tener al menos 8 caracteres
                    </span>
                  )}
                </div>
              </div>
              {loginMessage.length > 0 && !(errors.email || errors.password) ? (
                <span className="text-sm font-semibold text-red-500">
                  {loginMessage}
                </span>
              ) : (
                ""
              )}

              <div className="block mt-4">
                <label htmlFor="remember_me" className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember_me"
                    name="remember"
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                  />
                  <span className="ms-2 text-sm text-gray-600">Recuérdame</span>
                </label>
              </div>

              <div className="flex items-center justify-center mt-4">
                <button
                  type="submit"
                  className="ms-4 inline-flex items-center px-4 py-2 bg-[#f84525] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-800 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                >
                  Iniciar Sesión
                </button>
                <p className="mx-2">-</p>
                <Link
                  className="hover:underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  to={"/register"}
                >
                  Registrarse
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

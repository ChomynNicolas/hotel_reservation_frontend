import { useEffect } from "react";
import { useNavigate } from "react-router-dom"



export const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/rooms')
  
  }, [navigate])
  
  
  return (
    <>
    
      {/* Contenido Desplazable */}
      <div className="flex flex-wrap" style={{ width: "1000px" }}>
        {[...Array(50)].map((_, index) => (
          <div key={index} className="bg-orange-200 h-52 w-52 m-5"></div>
        ))}
      </div>

      {/* Notas */}
      <span className="text-center font-bold my-20">
        MDI (npm i @mdi/font) required for icons
        <hr className="my-4" />
        <a
          href="https://egoistdeveloper.github.io/twcss-to-sass-playground/"
          target="_blank"
          className="text-blue-600"
          rel="noopener noreferrer"
        >
          Convert to SASS
        </a>
      </span>
    </>
  )
}



import useCotizador from "../hooks/useCotizador"
import { MARCAS, PLANES } from "../constants";
import { useCallback, useMemo, useRef } from "react";



const Resultado = () => {
    const { resultado, datos } = useCotizador()
    const [nombreMarca] = useCallback(MARCAS.filter(m => m.id === Number(datos.marca)),[resultado]) 
    const [nombrePlan] = useCallback(PLANES.filter(p => p.id === Number(datos.plan)),[resultado]) 
    const yearRef = useRef(datos.year)

    console.log(nombreMarca)
    if (resultado === 0 ) return null;
  return (
    <div className=" bg-gray-300 shadow-xl p-8 mt-4 rounded-md">
      <h2 className="text-center font-bold text-2xl mb-4 text-[#131B2E]">Resumen: </h2>
      <div className="flex flex-col xl:w-[60%] w-full justify-between mx-auto">
        <p className=" text-black text-2xl border-b-2 border-gray-400 py-2 flex justify-between md:flex-row flex-col">
          Vehículo: 
          <span className=" font-bold">{nombreMarca.nombre}</span>
        </p>
        <p className=" text-black text-2xl border-b-2 border-gray-400 py-2 flex justify-between md:flex-row flex-col">
          Año de Vehículo: 
          <span className=" font-bold">{yearRef.current}</span>
        </p>
        <p className=" text-black text-2xl border-b-2 border-gray-400 py-2 flex justify-between md:flex-row flex-col">
          Plan de seguro: 
          <span className=" font-bold">{nombrePlan.nombre}</span>
        </p>
        <p className=" text-black text-2xl py-2 flex justify-between md:flex-row flex-col">
          Coste total del seguro: 
          <span className=" font-bold text-green-700">{resultado}</span>
        </p>
      </div>
    </div>
  )
}

export default Resultado
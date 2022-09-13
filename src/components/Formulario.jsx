import { MARCAS, YEARS, PLANES } from "../constants"
import { Fragment } from "react"
import useCotizador from "../hooks/useCotizador"
import Error from "./Error"
const Formulario = () => {

    const { handleChangeData, datos, setError, error, cotizarSeguro } = useCotizador()
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if ([datos.marca, datos.year, datos.plan].includes('')){
            setError('Datos inválidos por favor seleccione todos los campos')
            return
        }
        setError('')
        console.log(datos)
        cotizarSeguro()
    }
  return (
    <>
        {error && <Error />}
        <form onSubmit={handleSubmit}>
            <div className="my-5">
                <label htmlFor="" className="block mb-3 font-bold text-gray-400 uppercase">Marca</label>
                <select 
                    name="marca" 
                    className="w-full border-gray-200 border p-2" 
                    onChange={(e) => handleChangeData(e)}
                    value={datos.marca}
                >
                    <option >-- Seleccione Marca --</option>
                    {MARCAS.map(marca => (
                        <option 
                            key={marca.id} 
                            value={marca.id}
                        >
                            {marca.nombre}
                        </option>
                    ))}
                </select>
            </div>
            <div className="my-5">
                <label htmlFor="" className="block mb-3 font-bold text-gray-400 uppercase">Año</label>
                <select 
                    name="year" 
                    className="w-full border-gray-200 border p-2"
                    onChange={(e) => handleChangeData(e)}
                    value={datos.year}
                >
                    <option value="">-- Seleccione Año --</option>
                    {YEARS.map(year => (
                        <option 
                            key={year} 
                            value={year}
                        >
                            {year}
                        </option>
                    ))}
                </select>
            </div>
            <div className="my-5">
                <label htmlFor="" className="block mb-3 font-bold text-gray-400 uppercase">Planes</label>
                <div className="flex py-4 gap-4 items-center">
                    {PLANES.map(plan => (
                        <Fragment key={plan.id}>
                            <label htmlFor="">{plan.nombre}</label>
                            <input type="radio" name="plan" value={plan.id} onChange={(e) => handleChangeData(e)}/>
                        </Fragment>

                    ))}
                </div>
            </div>
            <input 
                type="submit" 
                value="Cotizar" 
                className="w-full bg-button-submit hover:bg-indigo-800 transition-colors duration-100 p-2 uppercase block text-white font-bold text-lg cursor-pointer rounded-md" 
            />
        </form>
    </>
  )
}

export default Formulario
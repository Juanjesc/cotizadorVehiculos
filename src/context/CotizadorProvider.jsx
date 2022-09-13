import { useState } from "react";
import { createContext } from "react";
import { obtenerDiferenciaYear, calcularMarca, calcularPlan, formatearDinero } from "../helpers";

const CotizadorContext = createContext();
const CotizadorProvider = ({children}) => {

    // Aqui podemos definir cualquier uso de js
    const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    })
    const [resultado, setResultado] = useState(0)
    const [error, setError] = useState('')
    const [cargando, setCargando ]= useState(false)
    const handleChangeData = (e) => {
        setDatos({
            ...datos, //si no tomamos los valores de todo nuestro objeto, se eliminarán al cambiar el state
            [e.target.name]: e.target.value
        })
        
    }
    const cotizarSeguro = () => {
        //Una base (la da el cliente)
        let resultado = 2000; //el coste del seguro

        // Obtener diferencia de años
        const diferencia = obtenerDiferenciaYear(datos.year)
        console.log(diferencia)
        

        // Restar el 3% por cada año (el seguro de 2020 es un 3% más barato que el de 2021)
        const porcentaje = 3;
        resultado -= ((diferencia * porcentaje) * resultado) / 100
        console.log('El coste será de '+ resultado)

        //calcular el porcentaje según la marca (ver la función en helpers)
        resultado *= calcularMarca(datos.marca)
        console.log('resultado según marca ' + datos.marca + ' = ' + resultado)
        


        //El seguro básico equivale a 20%
        // El seguro completo equivale a 50%
        resultado *= calcularPlan(datos.plan)
        
        console.log('resultado final acorde al plan: '+ datos.plan+ ' = '+ resultado)

        //Formatear dinero
        resultado = formatearDinero(resultado)
        setCargando(true)
        setTimeout(() => {
            setResultado(resultado)
            setCargando(false)
        }, 3000);
    }


    return(
        <CotizadorContext.Provider
            value={{
                //Y aquí debemos pasar los valores que definimos en nuestra función (CotizadorProvider)
                datos: datos,
                handleChangeData: handleChangeData,
                setError: setError,
                error: error,
                cotizarSeguro: cotizarSeguro,
                resultado: resultado,
                cargando
            }}
        >
            {children}
        </CotizadorContext.Provider>
    )
}

export {
    CotizadorProvider //Este provider es de DONDE salen los datos
}
export default CotizadorContext
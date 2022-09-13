import useCotizador from "../hooks/useCotizador"


const Error = () => {
    const { error } = useCotizador()
  return (
    <div>
        <p className=" text-red-700 uppercase font-bold p-4 pl-0">{error}</p>
    </div>
  )
}

export default Error
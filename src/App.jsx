import { useState, useEffect } from 'react'
import './App.css'
import CardWeather from './Components/CardWeather'

function App() {
  
  //creamos el estado
  const [coords, setCoords] = useState()
  
  //recibe un call back y un arego¡lo de dependencias
  useEffect(() => {
    const success = pos => {
      const latlon = {
        lat: pos.coords.latitude,
        long: pos.coords.longitude
      }
      setCoords(latlon)
    }
    //una ves que llegue la respuesta se ejecuta navigator
    navigator.geolocation.getCurrentPosition(success);
  }, [])

  console.log(coords);
  

  return (
    <div className="App">
      <CardWeather lat={coords?.lat} long={coords?.long} />
    </div>
  )
}

export default App

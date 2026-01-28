import { useEffect, useState } from 'react';
import './App.css';



const WeatherDetails = ({icon ,temp ,city ,country ,lat ,log ,wind , humidity})=>{
  return(
    <>
        <div className="image">
          <img src={icon} alt="Image"/>
        </div>
        <div className="temp">{temp}°C</div>
        <div className="location">{city}</div>
        <div className="country">{country}</div>
        <div className="cord">
          <div>
            <span className="lat">Latitude</span>
            <span>{lat}</span>
          </div>
          <div>
            <span className="log">Longtitude</span>
            <span>{log}</span>
          </div>
        </div>

        <div class="dataContainer">
          <div class="element">
            <img src="humidity.jpg" alt="humidity" className='icon'/>
            <div class="data">
              <div class="humidityPercent">{humidity}%</div>
              <div class="text">HUMIDITY</div>
            </div>
          </div>

          <div class="element">
            <img src="wind.png" alt="wind" className='icon'/>
            <div class="data">
              <div class="windPercent">{wind}KM/H</div>
              <div class="text">Wind Speed</div>
            </div>
          </div>
        </div>
    </>
  )
}



function App() {
  const [icon , setIcon] = useState("humidity.jpg")
  const [temp , setTemp] = useState(0)
  const [city , setCity] = useState("Chennai")
  const [country , setCountry] = useState("IN")
  const [lat , setLat] = useState(0)
  const [log , setLog] = useState(0)
  const[humidity , setHumidity] = useState(0)
  const[wind , setWind] = useState(0)
  const[text , setText] = useState("Chennai")
  const[cityNotFound , setCityNotFound] = useState(false)
  const[loading , setLoading] = useState(false)
  const[error , setError] = useState()


  const weatherIconMap = {
    "01n" : "sun.png",
    "01d" : "sun.png",
    "02d" : "suncloud.png",
    "02n" : "suncloud.png",
    "03d" : "suncloud.png",
    "03n" : "suncloud.png",
    "04d" : "suncloud.png",
    "04n" : "suncloud.png",
    "09d" : "humidity.jpg",
    "09n" : "humidity.jpg",
    "10d" : "rain.png",
    "10n" : "rain.png",
    "11d" : "drizzle.png",
    "11n" : "drizzle.png",
    "13n" : "snow.png",
    "13d" : "snow.png",
    "50d" : "wind.png",
    "50n" : "wind.png"

  }


  const search = async ()=>{
    setLoading(true)
   let apiKey = "b27e14baa6a6d01d97156870bf53f7a3"
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiKey}&units=Metric`

    try{

      let res = await fetch(url);
      let data = await res.json()
      // console.log(data)
      if(data.cod === "404"){
        // console.log("City Not Found")
        setCityNotFound(true)
        setLoading(false)
        return

      }

      setHumidity(data.main.humidity)
      setWind(data.wind.speed)
      setTemp(Math.floor(data.main.temp))
      setCity(data.name)
      setCountry(data.sys.country)
      setLat(data.coord.lat)
      setLog(data.coord.lon)
      const weatherIconCode = data.weather[0].icon
      setIcon(weatherIconMap[weatherIconCode] || "sun.png")
      setCityNotFound(false)
      
          
    }catch(error){
             console.log(error.message)
             setError("An Error Occured While fetching weather Data")
    }finally{
       setLoading(false)
    }

}


const handleCity = (e)=>{
     setText(e.target.value)
}

const handleKeyDown = (e)=>{
      if(e.key === "Enter"){search()}
}

useEffect(()=>{
    search()
},[])


  return (
    <>
       <div className="container">
           <div className="inputContainer">
               <input type="text" 
               className='cityInput' 
               placeholder='Search City' 
               onChange={handleCity} 
               value={text}
               onKeyDown={handleKeyDown}/>
               <div class="searchIcon" onClick={()=>{search()}}>
                <img src="Search.png" alt="SearchIcon"/>
               </div>
           </div>

           {loading && <div class="loadingMessage">Loading...</div>}
           {error && <div class="errorMessage">{error}</div>}
           {cityNotFound && <div class="cityNotFound">City Not Found</div>}
           {!loading && !cityNotFound && <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind}/>}
        </div>  
    </>
  );
}

export default App;

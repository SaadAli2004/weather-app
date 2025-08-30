import { useEffect, useState } from "react";

//Weather icons
import { TiWeatherStormy } from "react-icons/ti";
import { TiWeatherCloudy } from "react-icons/ti";
import { TiWeatherDownpour } from "react-icons/ti";
import { TiWeatherNight } from "react-icons/ti";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { TiWeatherSnow } from "react-icons/ti";
import { TiWeatherSunny } from "react-icons/ti";
import { TiWeatherShower } from "react-icons/ti";
import { TiWeatherWindy } from "react-icons/ti";
import { TiWeatherWindyCloudy } from "react-icons/ti";
import { RiMistFill } from "react-icons/ri";

import { IoIosSearch } from "react-icons/io";


import { WiDayWindy, WiHumidity, WiWindy } from "react-icons/wi";
import { FaWind } from "react-icons/fa";




function App() {

  const key = import.meta.env.VITE_APP_ID;

  const [weatherData, setWeatherData] = useState(null);
  const [userInput, setUserInput] = useState("")

  const location = (e) => {
    setUserInput(e.target.value)
  }
  const allIcons = {

     "01d" : <TiWeatherSunny/>,
     "02d" : <TiWeatherPartlySunny/>,
     "03d" : <TiWeatherCloudy/>,
     "04d" : <TiWeatherCloudy/>,
     "09d" : <TiWeatherShower/>,
     "10d" : <TiWeatherDownpour/>,
     "11d" : <TiWeatherStormy/>,
     "13d" : <TiWeatherSnow/>,
     "50d" : <RiMistFill/>,

     //Night

     "01n" : <TiWeatherNight/>,
     "02n" : <TiWeatherPartlySunny/>,
     "03n" : <TiWeatherCloudy/>,
     "04n" : <TiWeatherCloudy/>,
     "09n" : <TiWeatherShower/>,
     "10n" : <TiWeatherDownpour/>,
     "11n" : <TiWeatherStormy/>,
     "13n" : <TiWeatherSnow/>,
     "50n" : <RiMistFill/>


  }

  console.log("API Key:", key);


  const search = async (city) => {
     if (city === ""){
      alert("Enter city name")
      return;
     }


    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
      const response = await fetch(url);
      const data = await response.json();
      
      const icons = allIcons[data.weather[0].icon];


     if (data.cod !== 200) {
  alert(data.message || "City not found");
  return;}
      setWeatherData({
        temp: Math.floor(data.main.temp),
        humidity: data.main.humidity,
        city: data.name,
        weather: data.weather[0].main,
        wind: Math.round(data.wind.speed),
        icon: icons 

      })
    } catch (error) {
      alert("Incorrect location");
    }
  };


  return (
    <>
    <div className="flex justify-center py-[10rem]">

      <div className="w-4/12 text-lg p-10 rounded-lg bg-gray-400">
        <div className="flex gap-2 p-2 justify-center">
          <div className="">
            <input
              type="text" onChange={location}
              className="bg-gray-500 p-1 border rounded-xl w-[20rem]"
              placeholder="Enter city"
            />
          </div>
          <div className="flex">
            <button onClick={() => search(userInput)} className="border p-2 rounded-xl"><IoIosSearch/></button>
          </div>
        </div>
       {!weatherData ? 
       <>
       <div className="flex justify-center p-8  ">
        <h1>Enter the city name</h1>
       </div>
       </> : 
       
       <>
       <div className="bg-gray-700 my-5 p-15 rounded-2xl">

        <div className="flex  justify-center">
          <div className="">
            <h1 className="text-3xl font-bold">{weatherData.city}</h1>
            <p className="text-7xl px-4">
              {weatherData.icon}
            </p>
          </div>
        </div>
        <div className=" ">
          <div className="flex justify-center items-center">
          <h1 className="text-6xl font-bold">{weatherData.temp}</h1>
          <h1 className="text-3xl font-semibold">°C</h1>

          </div>
        </div>
       </div>

        <div className="  flex justify-between p-5">
          <div className="text-2xl font-semibold">
            <span className="text-5xl"><WiWindy/></span>
            <h1>Wind</h1>
            <p className="text-lg">{weatherData.wind + " km/h"}</p>
          </div>

          <div className="text-2xl font-semibold">
                        <span className="text-5xl"><WiHumidity/></span>

            <h1>Humidity</h1>
            <p className="text-lg">{weatherData.humidity}%</p>
          </div>
        </div>
       </>}
      </div>
    </div>
    
    </>
  );
}

export default App;

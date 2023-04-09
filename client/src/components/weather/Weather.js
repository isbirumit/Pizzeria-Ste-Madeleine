import { useEffect, useState } from "react";
import styled from "styled-components";



const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [show, setShow] = useState(false)
    // useEffect(() => {
    //     fetch(`/stm/weather`)
    //     .then((res) => res.json())
    //     .then((data) => {
    //         if(data.status === 404){
    //             console.log(data)
    //         }else if(data.status === 200){
    //             setWeatherData(data.data)
    //             setShow(true)
    //         }
    //     })
    // },[])

    return(
            !show ? null :
            <WeatherBox>
                <WeatherTitle>Temperature : {weatherData.temperature}°C</WeatherTitle>
                <img style={{width : "100px"}} src={weatherData.weather_icons}/>
            </WeatherBox>
        

    )
}
const WeatherBox = styled.div`
    border-radius: 10px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-between;
    padding: 20px;
    width: 300px;
    margin: auto;
    background-color: hsl(230,41%,40%);
`
const WeatherTitle = styled.h1`
    font-size:2.2rem;
    text-align:center;
    color: white;
`
const WeatherP = styled.p`
    font-size:2.2rem;
    text-align:center;
    margin: 30px 0;
`

export default Weather
import { useState, useEffect } from "react";
import Icon from "react-icons-kit";
import { search } from "react-icons-kit/feather/search";

import { useDispatch, useSelector } from "react-redux";
import { get5DaysForecast, getCityData } from "../../Store/Slices/WeatherSlice";






export default function Search () {


    const {
        citySearchLoading,
        forecastLoading,
      } = useSelector((state) => state.weather);
    
     
      const [loadings, setLoadings] = useState(true);
    
      
  
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const allLoadings = [citySearchLoading, forecastLoading];
      useEffect(() => {
        const isAnyChildLoading = allLoadings.some((state) => state);
        setLoadings(isAnyChildLoading);
      }, [allLoadings]);
    
      // изначальный город
      const [city, setCity] = useState("Москва");
    
    
      const [unit] = useState("metric"); 
    
    
      // const toggleUnit = () => {
      //   setLoadings(true);
      //   setUnit(unit === "metric" ? "imperial" : "metric");
      // };
    
      
      const dispatch = useDispatch();
    
    
      const fetchData = () => {
        dispatch(
          getCityData({
            city,
            unit,
          })
        ).then((res) => {
          if (!res.payload.error) {
            dispatch(
              get5DaysForecast({
                lat: res.payload.data.coord.lat,
                lon: res.payload.data.coord.lon,
                unit,
              })
            );
          }
        });
      };
    
    
      useEffect(() => {
        fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [unit]);
    
     
      const handleCitySearch = (e) => {
        e.preventDefault();
        setLoadings(true);
        fetchData();
      };
    
    
      // const filterForecastByFirstObjTime = (forecastData) => {
      //   if (!forecastData) {
      //     return [];
      //   }
    
      //   const firstObjTime = forecastData[0].dt_txt.split(" ")[1];
      //   return forecastData.filter((data) => data.dt_txt.endsWith(firstObjTime));
      // };
    
      // function getMetric() {
      //   return unit === "metric" ? "c" : "f"
      // }
    
      // const filteredForecast = filterForecastByFirstObjTime(forecastData?.list);

    return (
  
     
      <>
      <form autoComplete="off" onSubmit={handleCitySearch}>
        <label>
          <Icon icon={search} size={20} />
        </label>
        <input
          type="text"
          className="city-input"
          placeholder="Введите город"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
          readOnly={loadings}
        />
        <button type="submit">Поиск</button>
      </form>

 
  
      </>
      

 
    
     
    )
}
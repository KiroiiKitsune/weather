import { useState, useEffect } from "react";
import Icon from "react-icons-kit";
import { arrowUp } from "react-icons-kit/feather/arrowUp";
import { arrowDown } from "react-icons-kit/feather/arrowDown";
import { droplet } from "react-icons-kit/feather/droplet";
import { wind } from "react-icons-kit/feather/wind";
import { activity } from "react-icons-kit/feather/activity";
import { useDispatch, useSelector } from "react-redux";
import { get5DaysForecast, getCityData } from "../../Store/Slices/WeatherSlice";
import { SphereSpinner } from "react-spinners-kit";
import './style.css'

export default function CurrentWeather() {


    const {
        citySearchLoading,
        citySearchData,
        forecastLoading,
        forecastData,
        forecastError,
      } = useSelector((state) => state.weather);
    
     
      const [loadings, setLoadings] = useState(true);
    
      
   
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const allLoadings = [citySearchLoading, forecastLoading];
      useEffect(() => {
        const isAnyChildLoading = allLoadings.some((state) => state);
        setLoadings(isAnyChildLoading);
      }, [allLoadings]);
    

      const [city] = useState("Москва");
    
    
      const [unit, setUnit] = useState("metric"); 
    
    
      const toggleUnit = () => {
        setLoadings(true);
        setUnit(unit === "metric" ? "imperial" : "metric");
      };
    
      
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
    
    
      const filterForecastByFirstObjTime = (forecastData) => {
        if (!forecastData) {
          return [];
        }
    
        const firstObjTime = forecastData[0].dt_txt.split(" ")[1];
        return forecastData.filter((data) => data.dt_txt.endsWith(firstObjTime));
      };
    
      function getMetric() {
        return unit === "metric" ? "c" : "f"
      }
    
      const filteredForecast = filterForecastByFirstObjTime(forecastData?.list);




    return (


        <div className="current-weather-details-box">
       
        <div className="details-box-header">
    
          <h4>Текущая погода</h4>
 
       
          <div className="switch" onClick={toggleUnit}>
            <div
              className={`switch-toggle ${getMetric()}`}
            ></div>
            <span className="c">C</span>
            <span className="f">F</span>
          </div>
        </div>
    
 
        
        {loadings ? (
          <div className="loader">
            <SphereSpinner loadings={loadings} color="#2fa5ed" size={20} />
          </div>
        ) : (
          <>
            {citySearchData && citySearchData.error ? (
              <div className="error-msg">такого города не существует</div>
            ) : (
              <>
                {forecastError ? (
                  <div className="error-msg">{forecastError}</div>
                ) : (
                  <>
                    {citySearchData && citySearchData.data ? (
                      <div className="weather-details-container">
               
                        <div className="details">
                          <h4 className="city-name">
                            {citySearchData.data.name}
                          </h4>
 
                          <div className="icon-and-temp">
                            <img
                              src={`https://openweathermap.org/img/wn/${citySearchData.data.weather[0].icon}@2x.png`}
                              alt="icon"
                            />
                            <h1>{citySearchData.data.main.temp}&deg;{getMetric()}</h1>
                          </div>
 
                          <h4 className="description">
                            {citySearchData.data.weather[0].description}
                          </h4>
                        </div>
 
              
                        <div className="metrices">
              
                          <h4>
                            по ощущению {citySearchData.data.main.feels_like}
                            &deg;{getMetric()}
                          </h4>
 
                 
                          <div className="key-value-box">
                            <div className="key">
                              <Icon
                                icon={arrowUp}
                                size={20}
                                className="icon"
                              />
                              <span className="value">
                                {citySearchData.data.main.temp_max}
                                &deg;{getMetric()}
                              </span>
                            </div>
                            <div className="key">
                              <Icon
                                icon={arrowDown}
                                size={20}
                                className="icon"
                              />
                              <span className="value">
                                {citySearchData.data.main.temp_min}
                                &deg;{getMetric()}
                              </span>
                            </div>
                          </div>
 
                
                          <div className="key-value-box">
                            <div className="key">
                              <Icon
                                icon={droplet}
                                size={20}
                                className="icon"
                              />
                              <span>Влажность</span>
                            </div>
                            <div className="value">
                              <span>
                                {citySearchData.data.main.humidity}%
                              </span>
                            </div>
                          </div>
 
                    
                          <div className="key-value-box">
                            <div className="key">
                              <Icon icon={wind} size={20} className="icon" />
                              <span>Ветер</span>
                            </div>
                            <div className="value">
                              <span>{citySearchData.data.wind.speed}км/ч</span>
                            </div>
                          </div>
 
                       
                          <div className="key-value-box">
                            <div className="key">
                              <Icon
                                icon={activity}
                                size={20}
                                className="icon"
                              />
                              <span>Давление</span>
                            </div>
                            <div className="value">
                              <span>
                                {citySearchData.data.main.pressure}
                                гПа
                              </span>
                            </div>
                          </div>
                        </div>
 
 
 
                      </div>
                    ) : (
                      <div className="error-msg">Данные не найдены</div>
                    )}
           
                    <h4 className="extended-forecast-heading">
                      Прогноз на 5 дней
                    </h4>
                    {filteredForecast.length > 0 ? (
                      <div className="extended-forecasts-container">
                        {filteredForecast.map((data, index) => {
                          const date = new Date(data.dt_txt);
                          const day = date.toLocaleDateString("ru-RU", {
                            weekday: "short",
                          });
                          return (
                            <div className="forecast-box" key={index}>
                              <h5>{day}</h5>
                              <img
                                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                                alt="icon"
                              />
                              <h5>{data.weather[0].description}</h5>
                              <h5 className="min-max-temp">
                                {data.main.temp_max}&deg; /{" "}
                                {data.main.temp_min}&deg;
                              </h5>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="error-msg">Данные не найдены</div>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    )
}
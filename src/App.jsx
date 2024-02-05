import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import {Navbar} from "./components/navbar/Navbar"
import Search from "./components/search/search";


function App() {
  return (
<>
<Navbar/>
<div className="sun"></div>

<div className="box"> 
    <Search/>
    <CurrentWeather/> 
     </div>

</>
  );
}

export default App;

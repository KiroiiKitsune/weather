
import BtnDarkMode from '../btnDarkMode/BtnDarkMode';
import logo from './logo.png'
import './styles.css';

export  const Navbar =()=> {
 

  return (
    <nav className='nav'>
      <div className='container'>
        <div className='nav-row'>
      <div className='nav-logo'>
         <p className='logo'>Weather</p>
          <img src={logo} sizes={50}/>
      </div>
          
           <BtnDarkMode />
        </div>
      
      </div>
    </nav>
  );
}



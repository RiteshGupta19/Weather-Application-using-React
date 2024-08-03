import './App.css';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';


function App() {
  let [input,inpfunc]=useState('');
  let [gett,getfunc]=useState();
  let [loading,loadfunc]=useState(false);

  let sub=(event)=>{
    loadfunc(true)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=b59a2fc2773a996db1a32c806ce9865b&units=metric`)
    .then((res)=>res.json())
    .then((finalres)=>{
      if(finalres.cod=="404"){
        getfunc(undefined)
      }
      else{
        getfunc(finalres)
      }
      loadfunc(false)
      console.log(finalres)

    })
    event.preventDefault()
  }
  useEffect(()=>{
    console.log("welcome ")
  },[])
  return (
    <div className="App w-50 p-5 bg-info rounded-4 shadow-lg m-auto mt-3">
      <form onSubmit={sub}>
        <div className='d-flex mb-4'>
          <input type='text' className='form-control w-75 fs-4 ms-4' value={input} onChange={(e)=>inpfunc(e.target.value)}></input>
          <FontAwesomeIcon onClick={sub} icon={faMagnifyingGlass} className='search-icon bg-success text-white fs-3 p-3 rounded-circle ms-5' />
        </div>
        </form>
        <div className='text-center'>
          <img src='https://media1.tenor.com/m/zecVkmevzcIAAAAC/please-wait.gif' className={`loading ${loading ? '' : 'd-none'} `}/>
        { 
        gett!==undefined
          ?
          <>
            <img src={`https://openweathermap.org/img/w/${gett.weather[0].icon}.png`} className='w-25'/>
            <h3>{gett.weather[0].main}</h3>
            <h1 className='fw-bold mt-4'>{gett.main.temp} <sup>o</sup>C</h1>
            <h1 className='fw-bold my-3'>{gett.name} {gett.sys.country}</h1>
            <div className='d-flex justify-content-between'>
              <div>
                <h1>{gett.main.humidity}</h1>
                <h1>Humidity</h1>
              </div>
              <div>
                <h1>{gett.wind.speed}</h1>
                <h1>wind speed</h1>
              </div>
            </div>
        </>
        :
        "no data"
        }
      </div>
      
    </div>
  );
}

export default App;

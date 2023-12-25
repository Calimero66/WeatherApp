
import React, { useState, useRef, useEffect } from 'react';

import axios from 'axios';
import './weather.css';

import search from '../icons/search.png';
// import React, { useState, useRef } from 'react';
// import clear from '../../icons/clear.png';
// import cloud from '../../icons/cloud.png';
// import drizzle from '../../icons/drizzle.png';
// import rain from '../../icons/rain.png';
// import snow from '../../icons/snow.png';
import humidity from '../icons/humidity.png';
import wind from '../icons/wind.png';


const WeatherApp = () => {
    const [datas, setDatas] = useState();
    const [error, setError] = useState(null);
    const cityRef = useRef();
    // const weatherApiUrl = "https://api.weatherapi.com/v1/current.json";
    const token = '26ad0cabf1c244c8b16125430232412';

    const handelClick = async () => {
        console.log(cityRef.current.value)
        try {
            const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${token}&q=${cityRef.current.value}`

                //     weatherApiUrl, {
                //     params: {
                //         key: token,
                //         q: encodeURIComponent(cityRef.current.value),
                //     },
                // }
            );
            setDatas(response.data);
            setError(null);
        } catch (error) {
            setError('"Error" City not found ');
            setDatas(null);

        }
        // console.log(datas)


    };
    useEffect(() => {
        console.log("Datas updated:", datas);
    }, [datas]); // This will log the datas whenever it changes





    


    return (
        <div className='BG'>
            <div className=" mx-[400px] max-w-470 bg-opacity-80 bg-gray-700 text-white mt-10 rounded-2xl p-10 md:p-16 text-center">
                <div className="w-full flex items-center justify-between">
                    <input
                        type="text"
                        placeholder="Enter the name of your city"
                        ref={cityRef}
                        className="border-4 outline-none bg-white text-gray-500 px-4 md:px-8 h-12 rounded-full flex-1 mr-auto md:mr-8 text-sm md:text-2xl" 
                    />
                    <button
                        onClick={handelClick} 
                        className="border-0 outline-none bg-white rounded-full w-6 md:w-10 h-10 cursor-pointer"
                    >
                        <img src={search} alt="LogoSearch" className='  pl-3 ' />
                    </button>
                </div>
                {datas && (
                    <div className="">
                        
                        <div className="grid grid-cols-1 gap-1 ">
                            <img src={datas.current.condition.icon} alt={datas.current.condition.text} className='  pl-[190px] ' />
                            <p className=" text-red-900 font-bold font-mono text-[4rem] ">{datas.current.temp_c}°C  
                                <span className=' block text-white font-bold font-mono text-[2.5rem] '>{datas.location.name},{datas.location.country}</span> 
                            </p>
                            {/* <p className=" text-black font-bold font-mono text-[2.5rem] ">{datas.location.name}, {datas.location.country}</p> */}
                        </div>
                        
                        <div className="flex flex-row justify-evenly">
                            <div className="flex flex-col gap-2 text-center">

                                <img src={wind} alt="Wind Speed" className='w-[50px]'/>
                                <p className=" text-white font-bold font-mono  ">Wind Speed: {datas.current.wind_kph}km/h</p>
                                
                            </div>
                            <div className="flex flex-col gap-2 text-center" >
                                    <img src={humidity} alt="humidity" className=' w-[50px] object-right-bottom ' />
                                    <p className="text-white font-bold font-mono  ">
                                        Humidity: {datas.current.humidity}
                                    </p>
                            </div>

                        </div>
                    </div>
                )}
                {error && (
                    <div className=" ">
                        <p className='mt-4 md:mt-10 ml-4 md:ml-16 text-lg md:text-2xl text-rgb-22-5-48 text-red-950 pr-[100px] m-[-15px] font-bold font-mono  '>{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WeatherApp;

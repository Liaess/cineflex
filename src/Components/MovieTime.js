import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";

export default function MovieTime(){
    const { idMovie } = useParams();
    const [movie, setMovie] = useState([]);
    const [showtimes, setShowTimes] = useState([]);

    useEffect(()=>{
        const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/cineflex/movies/${idMovie}/showtimes`);
        promise.then(response=>{
            setMovie(response.data);
            setShowTimes(response.data.days.map(day=>(day.showtimes)));
        })
    }, []);

    if(showtimes.length === 0){
        return(
            <div>
            </div>
        ) 
    }

    return(
        <>
            <Header />
            <div>
                <h2>Selecione o horário</h2>
            </div>
            <div className="all-movies">
                {movie.days.map((days,i)=>(
                <div className="session-day">
                    <p>{days.weekday} - {days.date} </p>
                    <div className="hour-option">
                        {showtimes[i].map(showtime=>(
                            <Link to={`/assentos/${showtime.id}`}>
                                <div className="hour-info" id={showtime.id}>
                                    <p>{showtime.name}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                    
                </div>
                ))}
            </div>      
            <div className="movie-info">
                <div className="img-position">
                    <img src={movie.posterURL}></img>
                </div>
                <div>
                    <p>{movie.title}</p>
                </div>
            </div>
        </>
    )
}



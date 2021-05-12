import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";

export default function MovieTime(){
    const { idMovie } = useParams();
    const [movie, setMovie] = useState([])

    useEffect(()=>{
        const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/cineflex/movies/${idMovie}/showtimes`);
        promise.then((response)=>{
            console.log(response.data)
            setMovie(response.data)
        })
    }, []);

    return(
        <>
            <Header />
            <div>
                <h2>Selecione o horário</h2>
            </div>
            
            <div>
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
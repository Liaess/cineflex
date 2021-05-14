import Header from "./Header";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"

export default function SeatList(){

    const { idSeat } = useParams();
    const [seats, setSeats] = useState([]);
    const [eachSeat, setEachSeat] = useState([]);
    const [aaa, setAAA] = useState("each-seat")

    
    useEffect(()=>{
        const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/cineflex/showtimes/${idSeat}/seats`);
        promise.then(response=>{
            setSeats(response.data);
            setEachSeat(response.data.seats)
        })
    }, []);

    if(seats.length === 0){
        return(
            <div>
            </div>
        ) 
    }

    return(
        <>
            <Header />
            <div>
                <h2>Selecione o(s) assento(s)</h2>
            </div>
            <div className="seat">
                {eachSeat.map(seat=>(
                <div className={`each-seat ${seat.isAvailable ? "selected" : "each-seat"}`} onClick={(e)=>`${seat.isAvailable?alert("Esse assento não está disponível"):""}`}>
                    <p>{seat.name}</p>
                </div>
                ))}
                <div className="movie-info">
                    <div className="img-position">
                        <img src={seats.movie.posterURL}></img>
                    </div>
                    <div>
                        <p>{seats.movie.title}</p>
                        <div className="movie-info-day">
                            <p>{seats.day.weekday} - </p><p>{seats.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
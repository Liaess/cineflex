import Header from "./Header";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"
import loading from "../loading.gif"

export default function SeatList({request, setRequest}){
    const { idSeat } = useParams();
    const [seats, setSeats] = useState([]);
    const [eachSeat, setEachSeat] = useState([]);
    const [inputValue, setInputValue] = useState("")
    const [inputValueCPF, setInputValueCPF] = useState("")

    useEffect(()=>{
        const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/cineflex/showtimes/${idSeat}/seats`);
        promise.then(response=>{
            setSeats(response.data);
            setEachSeat(response.data.seats.map((seats)=>({...seats, isSelected:false})))
        })
    }, [idSeat]);

    if(seats.length === 0){
        return(
            <div>
                <img className="loading" src={loading} alt="loading"></img>
            </div>
        )
    }

    function Toggle(id){
        const changeSeat = eachSeat.map((seat)=>{
            if(seat.id === id && seat.isAvailable === false){
                alert("Esse assento não está disponível")
            }if(seat.id === id && seat.isAvailable){
                seat.isSelected = !seat.isSelected
            }
            return seat
        })
        setEachSeat(changeSeat)
    }

    function Reserve(){
        const selectedSeats = [];
        const selectedNames = [];
        eachSeat.forEach((seat)=>{
            if(seat.isSelected){
                selectedSeats.push(seat.id)
                selectedNames.push(seat.name)
            }
        })
        const buyerInfo = ({...request, ids: selectedSeats, name: inputValue, cpf: inputValueCPF});
        setRequest({...request, ids: selectedSeats, seat: selectedNames ,name: inputValue, cpf: inputValueCPF, weekday: seats.day.date, title:seats.movie.title, date:seats.name})
        axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/cineflex/seats/book-many`, buyerInfo);
    }
    
    return(
        <>
            <Header />
            <div>
                <h2>Selecione o(s) assento(s)</h2>
            </div>
            <div className="seat">
                {eachSeat.map((seat)=>(
                <div className={`each-seat ${seat.isAvailable ? "color-grey" : "color-orange"} ${seat.isSelected ? "color-green" : ""}  `} onClick={()=>{Toggle(seat.id)}}>
                    <p>{seat.name}</p>
                </div>
                ))}
                <div className="movie-info">
                    <div className="img-position">
                        <img src={seats.movie.posterURL} alt={seats.movie.title}></img>
                    </div>
                    <div>
                        <p>{seats.movie.title}</p>
                        <div className="movie-info-day">
                            <p>{seats.day.weekday} - </p><p>{seats.name}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="its-avalable">
                <div className="each-seat color-green">
                    <p>Selecionado</p>
                </div>
                <div className="each-seat color-grey">
                    <p>Disponível</p>
                </div>
                <div className="each-seat color-orange">
                    <p>Indisponível</p>
                </div>
            </div>

            <div className="userinfo">
                <div>
                    <p>Nome do comprador:</p>
                    <input onChange={(e)=>{setInputValue(e.target.value)}} placeholder={"Digite seu nome..."}></input>
                </div>
                <div>
                    <p>CPF do comprador:</p>
                    <input onChange={(e)=>{setInputValueCPF(e.target.value)}} placeholder={"Digite seu CPF..."}></input>
                </div>
            </div>
            <Link to={"/sucess"}>
                <div className = "confirmation" onClick={()=>Reserve()}>
                    <p>Reservar assento(s)</p>
                </div>
            </Link>
        </>
    )
}
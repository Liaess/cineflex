import Header from "./Header";
import loading from "../loading.gif"
import { Link } from "react-router-dom"

export default function Sucess({request}){
    if(request.length === 0){
        return(
            <div>
                <img className="loading" src={loading} alt="loading"></img>
            </div>
        )
    }
    
    return(
        <>
            <Header />
            <div className="finalization">
                <div>
                    <h3>Pedido feito com sucesso!</h3>
                </div>
                <div className={"all-infos"}>
                    <div>
                        <h4>Filme e sessão</h4>
                        <p>{request.title}</p>
                        <p>{request.weekday} - {request.date}</p>
                    </div>
                    <div>
                        <h4>Ingressos</h4>
                        {request.seat && request.seat.map((e)=>(
                            <p>{`Assento     ${e}`}</p>
                        ))}
                    </div>
                    <div>
                        <h4>Comprador</h4>
                        <p>{request.name}</p>
                        <p>{request.cpf} </p>
                    </div>
                </div>
            </div>
            <Link to={"/"}>
                <div className = "confirmation final">
                    <p>Voltar pra Home</p>
                </div>
            </Link>
        </>
    )
}
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import loading from "../loading.gif"


export default function MovieList(){
    const [catalog, setCatalog] = useState([]);

    useEffect(()=>{
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/cineflex/movies");
        promise.then(response =>{
            setCatalog(response.data)
        })
    }, []);

    if(catalog.length === 0){
        return(
            <>
            <Header />
            <div>
                <img className="loading" src={loading} alt="loading"></img>
            </div>
            </>
        ) 
    }


    return(
        <>
            <Header />
            <div>
                <h2>Selecione o filme</h2>
            </div>
            <div className="movie-list">
                {catalog.map(catalog =>(
                    <Link to={`sessoes/${catalog.id}`}>
                        <div className="each-movie" key={catalog.id}>
                            <img src={catalog.posterURL} alt={catalog.title}></img>
                        </div>
                    </Link>
                ))} 
            </div>
        </>
    )
}
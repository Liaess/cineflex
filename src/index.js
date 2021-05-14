import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useState } from "react";
import "./CSS/reset.css";
import "./CSS/styles.css"
import MovieList from "./Components/MovieList";
import MovieTime from "./Components/MovieTime";
import SeatList from "./Components/SeatList";
import Sucess from "./Components/Sucess"


function App(){
    const [request, setRequest] = useState({});

    return(
        <>
            <BrowserRouter>
                <Switch>

                    <Route path="/" exact>
                        <MovieList /> 
                    </Route>

                    <Route path="/sessoes/:idMovie" exact>
                        <MovieTime />
                    </Route>
 
                    <Route path="/assentos/:idSeat" exact>
                        <SeatList 
                            request={request}  setRequest={setRequest}
                        />
                    </Route>

                    <Route path="/sucess" exact>
                        <Sucess request={request}/>
                    </Route>

                </Switch>
            </BrowserRouter>
        </>
    )
}

ReactDOM.render(<App />, document.querySelector(".root"));
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./CSS/reset.css";
import "./CSS/styles.css"
import MovieList from "./Components/MovieList";
import MovieTime from "./Components/MovieTime";
import SeatList from "./Components/SeatList"

function App(){
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
                         <SeatList />
                    </Route>

                </Switch>
            </BrowserRouter>
        </>
    )
}

ReactDOM.render(<App />, document.querySelector(".root"));
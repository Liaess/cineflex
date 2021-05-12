import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./CSS/reset.css";
import "./CSS/styles.css"
import MovieList from "./Components/MovieList";
import MovieTime from "./Components/MovieTime";

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

                </Switch>
            </BrowserRouter>
        </>
    )
}

ReactDOM.render(<App />, document.querySelector(".root"));
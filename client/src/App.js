import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import CreatePirate from "./components/PirateForm";
import PirateList from "./components/PirateList";
import PirateDetail from "./components/PirateDetail";

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/pirate/new">
            <CreatePirate/>
          </Route>
          <Route exact path="/pirates">
            <PirateList/>
          </Route>
          <Route exact path="/pirate/:id">
            <PirateDetail/>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./authentication/Login";
import RegisterContainer from "./authentication/RegistroContainer";
import Home from "./Home";
import AddRuta from "./ruta/AddRuta";
import VerRutas from "./ruta/VerRutas";
import Footer from "./fragments/Footer";
import "leaflet/dist/leaflet.css";
import NotLoggedInLayout from "../layouts/NotLoggedInLayout/not-logged-in.layout";
import PrivateLayout from "../layouts/PrivateLayout/private.layout";
import PublicLayout from "../layouts/PublicLayout/public.layout";

function App() {
    return (
      <div> 
        <Router>
          <div>
            <Switch>
              <PublicLayout exact path="/viade_es5b/" component={Home} />
              <PrivateLayout path="/viade_es5b/ver-rutas" component={VerRutas} />
              <PrivateLayout path="/viade_es5b/add-ruta" component={AddRuta} />
              <NotLoggedInLayout path="/viade_es5b/login" component={Login}/>
              <NotLoggedInLayout path="/viade_es5b/signup" component={RegisterContainer}/>
            </Switch>
          </div>
        </Router>
        <Footer />
      </div>
    );

}

export default App;

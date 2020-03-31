import React, { Component } from "react";
import RouteList from "./RouteList";
import PacmanViewLoader from "../../util/Loaders/PacmanViewLoader";

class VerRutas extends Component {
  state = {
    loading: true
  };

  render() {
    return (
      <div>
        <header>
          <h1>Mis rutas</h1>
          <p>
            En este apartado puedes echar un vistazo a tus rutas, visualizarlas
            en un mapa, ver sus detalles o bien eliminarlas.
          </p>
        </header>
        <PacmanViewLoader // Overlay de carga para mostrar la vista de las rutas.
          text={"Espera un momento, estamos recuperando tus rutas..."}
          children={<RouteList handleLoaded={this.handleLoaded} />}
          loading={this.state.loading}
        />
      </div>
    );
  }

  /**
   * Invocado desde la lista de rutas para indicar que ya se han
   * cargado las rutas del usuario.
   */
  handleLoaded = () => {
    this.setState({ loading: false });
  };
}

export default VerRutas;

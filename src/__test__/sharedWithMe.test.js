import React from "react";
import { render, cleanup, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom";
import SharedWithMe from "../front-end/components/share/SharedWithMe";
import RutaService from "../__test__/__mocks__/RutaService";

let rutaService = new RutaService();

test("Se renderizan bien los componentes de SharedWithMe", () => {
    afterAll(cleanup);
    const { getByTestId } = render(<SharedWithMe 
      handleLoaded={rutaService.handleLoaded}
      getRutasCompartidasConmigo={rutaService.getRutasCompartidasConmigo}
      subirFicheroAMiRuta={rutaService.subirFicheroAMiRuta}
      obtenerFicherosRuta={rutaService.obtenerFicherosRuta}
      comentarMiRuta={rutaService.comentarMiRuta}
      obtenerComentariosRuta={rutaService.obtenerComentariosRuta}></SharedWithMe>);
    expect(getByTestId("title")).toHaveTextContent("Compartido conmigo");
});

test("No nos han compartido ninguna ruta, por tanto, se muestra la alerta",async ()=>{
  afterAll(cleanup);
    const { getByTestId } = render(<SharedWithMe 
      handleLoaded={rutaService.handleLoaded}
      getRutasCompartidasConmigo={rutaService.getNoRutasCompartidas}
      subirFicheroAMiRuta={rutaService.subirFicheroAMiRuta}
      obtenerFicherosRuta={rutaService.obtenerFicherosRuta}
      comentarMiRuta={rutaService.comentarMiRuta}
      obtenerComentariosRuta={rutaService.obtenerComentariosRuta}></SharedWithMe>);
      let alertaNoRutasCompartidas = await waitForElement(() => getByTestId("alertaNoRutasCompartidas"));
      expect(alertaNoRutasCompartidas).toHaveTextContent("Aún no te han compartido ninguna ruta.");
});

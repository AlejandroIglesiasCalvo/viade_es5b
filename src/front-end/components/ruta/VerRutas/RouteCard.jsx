import React, { Component } from "react";
import { Card, Container, Row, Col, Table, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import MapRuta from "../../map/MapRuta";
import "../../../css/map-style.css";
import CommentBox from "../../share/CommentBox";
import PhotoGallery from "../../share/PhotoGallery";

/**
 * Representa un elemento Card con la
 * información de la ruta que encapsula.
 */
class RouteCard extends Component {
  state = {
    isDeleting: false, // Indica si la ruta está  siendo eliminada del POD.
  };

  render() {
    return (
      <Card>
        <Card.Header>
          <h3 data-testid="r-title">{this.props.ruta.getNombre()}</h3>
          <Button
            data-testid="rb-compartir"
            variant="success"
            className="mr-2"
            onClick={() => this.props.handleShare(this.props.ruta)}
          >
            Compartir
          </Button>
          <Button
            data-testid="rb-eliminar"
            variant="danger"
            onClick={() => this.delete()}
          >
            {this.handleIsDeleting()}
          </Button>
        </Card.Header>
        <Card.Body>
          <Container fluid>
            <Row>
              <Col md={8}>
                <Row>
                  <Col md="auto">
                    <Card.Title>Descripción</Card.Title>
                    <Card.Text data-testid="r-description">
                      {this.props.ruta.getDescripcion()}
                    </Card.Text>
                    <Card.Title>Hitos</Card.Title>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>Latitud</th>
                          <th>Longitud</th>
                        </tr>
                      </thead>
                      <tbody data-testid="r-hitos">
                        <tr>
                          <td>
                            <b>Inicio</b>
                          </td>
                          <td>{this.props.ruta.getInicio()[0]}</td>
                          <td>{this.props.ruta.getInicio()[1]}</td>
                        </tr>
                        {this.props.ruta.getHitos().map((h, key) => (
                          <tr key={key++}>
                            <td>{h.getNombre()}</td>
                            <td>{h.getLat()}</td>
                            <td>{h.getLong()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>
                  <Col>
                    <CommentBox
                      author={null}
                      ruta={this.props.ruta}
                      onlyRead={false}
                      comentarMiRuta={this.props.comentarMiRuta}
                      obtenerComentariosRuta={this.props.obtenerComentariosRuta}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <PhotoGallery
                      author={null}
                      ruta={this.props.ruta}
                      onlyRead={false}
                      subirFicheroAMiRuta={this.props.subirFicheroAMiRuta}
                      obtenerFicherosRuta={this.props.obtenerFicherosRuta}
                    />
                  </Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row>
                  <Col>
                    <div
                      id={`mapa-${this.props.ruta.getNombre()}`}
                      className="ml-3 mb-3"
                    >
                      {this.props.showMap && (
                        <MapRuta
                          className="map"
                          ruta={this.props.ruta}
                          data-testid="mapa"
                        />
                      )}
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    );
  }

  /**
   * Método que se encarga de renderizar un componente
   * u otro en función de si se está eliminando la ruta actual.
   */
  handleIsDeleting = () => {
    if (this.state.isDeleting) {
      return (
        <div>
          <Spinner
            className="mr-2"
            as="span"
            size="sm"
            animation="border"
            role="status"
          />
          Eliminando...
        </div>
      );
    }
    return "Eliminar";
  };

  /**
   * Manejador para el evento de eliminar una ruta del POD.
   */
  delete = async () => {
    this.setState({ isDeleting: true });
    await this.props.handleDelete(
      this.props.ruta.getUUID(),
      this.props.ruta.getNombre()
    );
    this.setState({ isDeleting: false });
  };
}

export default RouteCard;

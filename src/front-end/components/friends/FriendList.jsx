import React, { Component } from "react";


class FriendList extends Component{
    constructor(props){
        super(props);
        this.amigos=this.props.amigos;
        console.log("lista de amigos1:")
        console.log(this.amigos);
       
    }

    state ={
        amigos: []
    }

    async componentDidMount() {
        const response = await this.props.amigos;
        this.setState({ amigos: response });
        console.log("lista de amigos2:")
        console.log(this.state.amigos);
      }

    render(){
        return (
            <div>
                <h3>Tus amigos:</h3>
                <div className="centered-container">
                    <table  className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.amigos.map((amigo,key)=>(
                                    <tr>
                                        <th scope="row">{key++}</th>
                                        <td>{amigo.getNombre()}</td>
                                    </tr>
                                ))
                            }
                            
                        </tbody>
                    </table>
                </div>
            </div>
                
        )
    }
}

export default FriendList;
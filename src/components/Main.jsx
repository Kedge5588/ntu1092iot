import React from 'react';

import {
    Container
} from 'reactstrap';
import {
    Navbar,
    Nav,
    Form,
    FormControl,
    Button
} from 'react-bootstrap';
import Home from './Home.jsx'
import Record from './Record.jsx'

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: 'Home'
        };
    }

    render() {
        return (
            <div>
                <Navbar>
                    <Container style = {{marginBottom: '25px', borderBottom: 'double' }}>
                        <Navbar.Brand type='button' style = {{marginLeft: 'auto'}} onClick={()=>this.setState({mode: 'Home'})}>Home</Navbar.Brand>
                        <Navbar.Brand type='button' style = {{marginRight: 'auto'}} onClick={()=>this.setState({mode: 'Record'})}>Record</Navbar.Brand>
                    </Container>
                </Navbar>

                {this.state.mode === 'Home' ? <Home/> : (this.state.mode === 'Record' ? <Record/> : <Home/>)}
            </div>
        );
    }
}

import React from 'react';

import {
    Tab,
    Row,
    Col,
    Nav,
    Image
} from 'react-bootstrap';

import {getRecord, camera} from '../api/api.js';

var timeoutID;

export default class Record extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            log: [],
            imgShow: [],
            x: ''
        };

        this.knock = this.knock.bind(this);
        this.getRecord = this.getRecord.bind(this);
    }

    componentDidMount() {
        this.getRecord();
        timeoutID = window.setInterval(this.knock, 3000);
    }

    componentWillUnmount() {
        window.clearInterval(timeoutID);
    }

    render() {
        return (
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={2} style={this.styles['leftCol']}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">{this.state.log[0]}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">{this.state.log[1]}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third">{this.state.log[2]}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="fourth">{this.state.log[3]}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="fifth">{this.state.log[4]}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="sixth" style = {{fontSize: '24px'}}>...</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={10} >
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <Image src={this.state.imgShow[0]} style={this.styles['standby']}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <Image src={this.state.imgShow[1]} style={this.styles['standby']}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <Image src={this.state.imgShow[2]} style={this.styles['standby']}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="fourth">
                                <Image src={this.state.imgShow[3]} style={this.styles['standby']}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="fifth">
                                <Image src={this.state.imgShow[4]} style={this.styles['standby']}/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        );
    }


    getRecord() {
        getRecord().then(res => {
            var a = [];
            var b = [];
            for(let i in res){
                a.push(res[i]['time']);
                b.push('http://140.112.42.22:8124' + res[i]['img_url']);
            }
            this.setState({
                log: a,
                imgShow: b
            });
        });
    }


    knock() {
        getRecord().then(res => {
            console.log(res);
            if(this.state.x !== res[0]['time']){
                this.setState({
                    x: res[0]['time']
                });
                var a = [];
                var b = [];
                for(let i in res){
                    a.push(res[i]['time']);
                    b.push('http://140.112.42.22:8124' + res[i]['img_url']);
                }
                this.setState({
                    log: a,
                    imgShow: b
                });
            }
        });
    }


    styles = {
        'leftCol': {
            textAlign: 'center'
        },
        'rightCol': {
            textAlign: 'center'
        },
        'standby': {
            marginLeft:'23%',
            width: '360px',
            height: '360px',
            border: 'ridge'
        }
    }

}

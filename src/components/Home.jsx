import React from 'react';

import {
    Container,
    Image,
    Button
} from 'react-bootstrap';
import {camera, open, getVideo} from '../api/api.js';
import outside from '../images/tree.png';
import unlock from '../images/padlock.png';
import takeVideo from '../images/video-camera.png';
import visitor from '../images/man.png';

var timeoutID;

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pic: outside,
            time: '',
            x: ''
        };

        this.camera = this.camera.bind(this);
        this.open = this.open.bind(this);
        this.knock = this.knock.bind(this);
        this.videoShow = this.videoShow.bind(this);
        this.setTime = this.setTime.bind(this);
    }


    componentDidMount() {
        this.setTime();
        timeoutID = window.setInterval(this.knock, 3000);
    }


    componentWillUnmount() {
        window.clearInterval(timeoutID);
    }


    render() {
        return (
            <div>
                <Container style={this.styles['align']}>
                    <Image src={this.state.pic} style={this.styles['standby']}/>
                    <p>{this.state.time}</p>
                </Container>
                <Container style={this.styles['align']}>
                    <Button style={this.styles['button']} onClick = {this.open}>
                        <Image src={unlock} fluid/>
                    </Button>
                    <Button style={this.styles['button']} onClick = {this.camera}>
                        <Image src={visitor} fluid/>
                    </Button>
                    <Button style={this.styles['button']} onClick = {this.videoShow}>
                        <Image src={takeVideo} fluid/>
                    </Button>
                </Container>
            </div>
        );
    }


    camera() {
        camera().then(res => {
            //console.log(res);
            this.setState({
                pic: 'http://140.112.42.22:8124' + res[0]['img_url'],
                time: res[0]['time']
            });
            if (this.socket){
                if (this.socket.readyState === WebSocket.OPEN) {
                    this.socket.close();
                }
            }
        });
    }


    open() {
        open().then(res => {
            console.log(res);
        });
    }


    videoShow() {
        var client = {
            // Connects to Pi via websocket
            connect: function(ip) {
                console.log(ip);
                var self = this;
                this.socket = new WebSocket("ws://" + ip  + "/websocket");

                // Request the video stream once connected
                this.socket.onopen = function() {
                    console.log("Connected!");
                    self.readCamera();
                };

                // Currently, all returned messages are video data. However, this is
                // extensible with full-spec JSON-RPC.
                this.socket.onmessage = function(messageEvent) {
                    //video.src = "data:image/jpeg;base64," + messageEvent.data;
                    this.setState({
                        pic: "data:image/jpeg;base64," + messageEvent.data
                    });
                };
            },

            // Requests video stream
            readCamera: function() {
                this.socket.send("read_camera");
            }
        };
        getVideo().then(res => {
            this.setState({
                time: ''
            });
            client.connect(res['ip']);
        });
    }


    setTime() {
        camera().then(res => {
            //console.log(res);
            this.setState({
                x: res[0]['time']
            });
        });
    }


    knock() {
        camera().then(res => {
            //console.log(res);
            if(this.state.x !== res[0]['time']){
                this.setState({
                    pic: 'http://140.112.42.22:8124' + res[0]['img_url'],
                    time: res[0]['time'],
                    x: res[0]['time']
                });
            }
        });
    }


    styles = {
        'button': {
            margin:'12px',
            borderRadius: '50%',
            width: '56px',
            height: '56px',
            textAlign: 'center',
            backgroundColor: '#ECECFF',
            borderColor: '#FFD2D2'
        },
        'align': {
            textAlign: 'center'
        },
        'standby': {
            width: '360px',
            height: '360px',
            border: 'ridge'
        }
    }

}

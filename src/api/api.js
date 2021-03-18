const fetch = require("node-fetch");

var url ='http://140.112.42.22:8124/bell';


export function camera(){
    let params = {
        method:'POST',
        body:JSON.stringify({
            'num': 1
        }),
    }
    return fetch(url + '/fnRecordShow', params).then(res => {
        return res.json();
    });
}


export function getRecord(){
    let params = {
        method:'POST',
        body:JSON.stringify({
            'num': 5
        }),
    }
    return fetch(url + '/fnRecordShow', params).then(res => {
        return res.json();
    });
}


export function open(){
    let params = {
        method:'GET'
    }
    return fetch(url + '/open', params).then(res => {
        return res;
    });
}


export function getVideo(){
    let params = {
        method:'GET'
    }
    return fetch(url + '/ws', params).then(res => {
        return res.json();
    });
}

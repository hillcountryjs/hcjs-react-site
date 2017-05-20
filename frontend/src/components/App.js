import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Events from "./events/events";

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
    }
    componentDidMount(){
        if(this.props.location.hash){
            let hash_split = this.props.location.hash.replace("#", "").split("&");
            let hash_obj = {};
            for(let i = 0; i < hash_split.length; i++){
                let key_value = hash_split[i].split("=");
                hash_obj[key_value[0]] = key_value[1];
            }
            let access_token = hash_obj['access_token'];
            let url = `https://api.meetup.com/2/member/self?&access_token=${access_token}`;
            let headers = new Headers();
            headers.append("Content-Type", "application/x-www-form-urlencoded");
            headers.append("X-Meta-Photo-Host", "secure");

            fetch(url,{
                headers: headers
            }).then((res)=>{
                return res.json()
            }).then((json)=>{
                json['access_token'] = access_token;
                this.setState(json);
            })
        }
    }
    _auth() {
        console.log("called");
        const consumer_key = "change-me";
        const consumer_redirect_uri = `${window.location.origin}`;
        let oauth2_step1 = `https://secure.meetup.com/oauth2/authorize?client_id=${consumer_key}&response_type=token&redirect_uri=${consumer_redirect_uri}`;

    }
    render() {

        const { access_token, city, country, joined, name} = this.state;
        let joined_date = new Date(joined);
        joined_date = joined_date.toString()
        let message;
        let photo;
        if(city){
            message = <span>Hi {name}. You're coming from {city}, {country.toUpperCase()}. You joined meetup.com on {joined_date}.</span>;
            photo = <img src={this.state.photo.thumb_link} className="" alt="avatar" />;
        } else {
            message = <span>hi!</span>
            photo = null;
        }

        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                    {photo}
                <p className="App-intro">
                    {message}
                </p>
            <button onClick={this._auth}>Click Me!</button>
            <Events token={access_token}/>
            </div>
        );
    }
}

export default App;

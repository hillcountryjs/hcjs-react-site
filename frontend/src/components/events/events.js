import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './events.css';
import Event from "./event";
import { post_rsvp } from "./actions";

class Events extends Component {
    constructor(props){
        super(props);
        this.state = {
            events: []
        };
    }
    componentDidMount(){
        const req_events_url = `${window.location.origin}/api/events`
        fetch(req_events_url
        ).then((res)=>{
            console.log(res);
            return res.json();
        }).then((json)=>{
            this.setState({events: json});
        })
    }
    render() {
        const { events } = this.state;
        let event_list;
        if(Object.keys(events).length > 1){
            event_list = events.map((item, index)=>{
                return(<Event {...item} index={index} key={index} />);
            });
        } else {
            event_list = "Well this is awkward. Contact your Organizers, this isn't supposed to happen.";
        }

        return (
            <div className="">
                {event_list}
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        events: state.events
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(post_rsvp, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);

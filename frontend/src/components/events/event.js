import React, { Component } from 'react';
import moment from "moment";

import "./_event.scss";

class Event extends Component {
    render() {
        const { id, group, name, time, utc_offset, venue, description, rsvp, link } = this.props;
        //let fmt_time = moment(time).format("LT, MMM Do YYYY z");
        let fmt_time = moment.utc(time + utc_offset).format("LLLL");

        const _wrapper = {
            border: "1px solid black",
            borderRadius: "5px",
            margin: "1em",
            padding: "2em",
            maxWidth: "30vw",
            display: "inline-block",
            minHeight: "20vh",
            maxHeight: "80%",
        };
        let loc_link;
        if(venue){
            const location = `${venue.address_1},+${venue.city},+${venue.country}`;
            loc_link =
                <div className="">
                        <a href={`https://maps.google.com/maps?f=q&hl=en&q=${location}`}>{venue.address_1}, {venue.city}</a>
                </div>;
        } else {
            loc_link = null;
        }

        /* Styles */
        const _content = {
            minHeight: "18vh",
            maxHeight: "80%",
            overflowY: "auto"
        };
        const _title = {};

        return (
            <div style={_wrapper}>
                <div style={_content}>
                    <h2 style={_title}>
                        {name}
                    </h2>
                    <div className="">
                        {fmt_time}
                    </div>
                        {loc_link}
                    <div dangerouslySetInnerHTML={{__html: description}}/>
                    <a target="_blank" href={link}><button>More</button></a>
                </div>
            <button className="btn" onClick={()=>rsvp(group.urlname, id, 0)}>RSVP</button>
            <button onClick={()=>rsvp(group.urlname, id, 1)}>+1</button>
            <button onClick={()=>rsvp(group.urlname, id, 2)}>+2</button>
            </div>
        );
    }
}

Event.propTypes = {
    id: React.PropTypes.string,
    group: React.PropTypes.object,
    name: React.PropTypes.string,
    time: React.PropTypes.number,
    venue: React.PropTypes.object,
    description: React.PropTypes.string,
    rsvp: React.PropTypes.func,
    link: React.PropTypes.string
}

export default Event;

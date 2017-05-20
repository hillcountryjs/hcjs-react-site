export function post_rsvp(url, data) {
    let init = {
        method: "POST",
        body: JSON.stringify(data)
    };

    fetch(url, init).then(
        (res)=>{
            return(res.json());
        }).then((json)=>{
            console.log(json);
        });

}


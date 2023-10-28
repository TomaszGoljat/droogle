import React from "react";

function ContactBox() {
    return (
        <div className="contactBox">
            <div className="contactBox--header">..:: Contact ::..</div>
            <div className="contactBox--label">secured email:</div>
            <div className="contactBox--value"><a href="unharmed-info@proton.me">unharmed-info@proton.me</a></div>
            <div className="contactBox--label">email:</div>
            <div className="contactBox--value"><a href="admin@unharmed.info">admin@unharmed.info</a></div>
            <div className="contactBox--label">subreddit:</div>
            <div className="contactBox--value"><a href="https://www.reddit.com/r/unharmed/" target="_blank" rel="noreferrer">r/unharmed</a></div>
            <div className="contactBox--label">reddit user:</div>
            <div className="contactBox--value"><a href="https://www.reddit.com/user/stayunharmed" target="_blank" rel="noreferrer">u/stayunharmed</a></div>
            <div className="contactBox--label">discord channel:</div>
            <div className="contactBox--value"><a href="https://discord.gg/suJq9xBD" target="_blank" rel="noreferrer">invite</a></div>
            <div className="contactBox--label">ko-fi page:</div>
            <div className="contactBox--value"><a href="https://ko-fi.com/unharmed" target="_blank" rel="noreferrer">ko-fi.com/unharmed</a></div>
        </div>
    )
}

export default ContactBox;
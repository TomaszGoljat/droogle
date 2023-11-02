import { Link } from "react-router-dom";


export default function Support() {
    return (
    <div className="support--div">
        <h1 className="pageTitle">Support</h1>
       <h2 className="pageSubtitle">If you can, please consider supporting us on <br/><a href="https://ko-fi.com/unharmed" className="support--kofi">ko-fi.com/unharmed</a></h2>
       <p>Monthly cost of running this website:</p>
       <div className="support--maintenance">
        <div className="support--firstRow"></div><div className="support--firstRow">per month</div>
        <div className="support--costTitle">Hosting</div><div className="support--costValue">19$</div>
        <div className="support--costTitle">Search Functions</div><div className="support--costValue">25$</div>
        <div className="support--costTitle">Domain</div><div className="support--costValue">2$</div>
        <div className="support--costTotal">Total</div><div className="support--valueTotal">46$</div>
       </div>
       <br />
       <p style={{margin: 0}}>About supporting unharmed:</p>
       <ul className="pageList">
            <li className="support--perkItem">All features on this website will be always free to use.</li>
            <li className="support--perkItem">If you decide to support this project you will get supporter tag next to your nickname on Unharmed subreddit and Discord channel.</li>
            <li className="support--perkItem">If you're one of the vendors already listed on our vendor list and decide to support us - we will put your supporter tag next to your name.</li>
            <li className="support--perkItem">Vendors list is sorted by sponsor tag and then alphabetically.</li>
            <li className="support--perkItem">At higher rank monthly membership (20$+) supporter will be listed on blue marquee element above (with name and link).</li>
            <li className="support--perkItem">Monthly supporters will get an opportunity to vote on new features.</li>
        </ul>
        <p className="pageSubtitle">To read more about project itself: <br /><br />
        <Link className="topbar--link" to="/info">Check Out About Page</Link></p>
        <div className="support--wall">
        <h2>Wall of Supporters</h2>
            <a href="https://dutchnaturalhealing.com/" className="bronze">Dutch Natural Healing</a><br />
            You can still be the second one here! <br />
            Or maybe the third? <br />
            <a href="https://ko-fi.com/unharmed" style={{color: "blue", textAlign: "center"}}>Check out ko-fi.com/unharmed</a><br />
        </div>
    </div>
    )
}
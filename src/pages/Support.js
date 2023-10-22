

export default function Support() {
    return (
    <div className="support-div">
        <h2>If you like what we are doing here, please consider supporting us on <a href="https://ko-fi.com/unharmed" className="support--kofi">ko-fi.com/unharmed</a></h2>
        <p>We offer little perks for our supporters to show our gratitude:</p>
        <ul className="support--perkList">
            <li className="support--perkItem">Supporter tag on vendor list for monthly supporters (at 5$ / month).</li>
            <li className="support--perkItem">Your name (and link) on the blue marquee element above (at 20$ / month).</li>
            <li className="support--perkItem">All of our donors will be listed at the bottom of this page.</li>
            <li className="support--perkItem">Supporter tag on our Discord and Subreddit (at 5$ / month).</li>
            <li className="support--perkItem">Monthly supporters will get an opportunity to vote on new features.</li>
            <li className="support--perkItem"></li>
            <li className="support--perkItem"></li>
            <li className="support--perkItem"></li>
            <li className="support--perkItem"></li>
            
        </ul>
       <p>Monthly cost of running this website:</p>
       <div className="support--maintenance">
        <div className="support--firstRow"></div><div className="support--firstRow">per month</div>
        <div className="support--costTitle">Hosting</div><div className="support--costValue">19$</div>
        <div className="support--costTitle">Search Functions</div><div className="support--costValue">25$</div>
        <div className="support--costTitle">Domain</div><div className="support--costValue">2$</div>
        <div className="support--costTotal">Total</div><div className="support--valueTotal">46$</div>
       </div>
    </div>
    )
}
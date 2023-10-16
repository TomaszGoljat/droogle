function Privacy() {
    return (
        <div className="privacy--div">
            <h1>Privacy Policy</h1>
            <h2>Our privacy policy is very simple:</h2>
            <ul>
                <li>We <span className="redEmphasis">do not</span> track your activity on our website.</li>
                <li>We <span className="redEmphasis">do not</span> store any identifiable informations about our users.</li>
                <li>We <span className="redEmphasis">do not</span> use cookies.</li>
                <li>We <span className="redEmphasis">do not</span> provide informations about our users to third parties.</li>
                <li>We <span className="redEmphasis">do not</span> use Google Analytics.</li>
            </ul>
            <h2>Does it mean I'm 100% anonymous?</h2>
            <p><span className="redEmphasis">No.</span> Unfortunately there's plenty ways to track your activity on Internet and we do not have any control over it. You should, for example, use VPN service to hide your Internet activity from Internet Service Provider.</p>
            <p>There's plenty of guides and tools to help you stay partially anonymous on Internet and at some point we will provide you with links to useful resources about this topic, but at this point that's not our priority. </p>
            <h2>What about tools on this website?</h2>
            <p>As long as you don't leave this website, you're fine. All search queries are performed through proxy - it means your informations (for example your IP or browser headers) are not provided to any of the external websites until you visit them yourself.</p>
            <p>We use privacy focused DuckDuckGo search engine to perform searches on websites on which we cannot use internal search functionality.</p>
            <p>We do not store any informations you put in our tools and calculators.</p>
            <p>We do not share any data with vendors listed on our website.</p>
        </div>
    )
}

export default Privacy;
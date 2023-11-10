import styles from "./Home.module.css"
import { Link } from "react-router-dom"

export default function Home() {
    return (
        <div className={styles.main}>
            <div className={styles.section} id="welcome">
                <h2 className={styles.title}>
                    <Link to="/">👋 Welcome</Link></h2>
                <p>Thank you for visiting unharmed.info</p>
                <p>
                    Privacy focused platform committed to reducing harm associated with the use of psychoactive substances. 
                </p>
            </div>
            <div className={styles.section} id="search">
                <h2 className={styles.title}>
                    <Link to="/search">🔍 Search</Link>
                </h2>
                <p>Anonymous search tool.</p>
                <p>
                    Conduct anonymous searches only on relevant forums and websites.
                </p>
            </div>
            <div className={styles.section} id="tools">
                <h2 className={styles.title}>
                    <Link to="/tools">🛠️ Tools</Link>
                </h2>
                <p>Free harm-reduction tools. </p><p>
                    Calculate the appropriate dosage or craft a foolproof plan to gradually quit your addiction.
                </p>
            </div>
            <div className={styles.section} id="vendors">
                <h2 className={styles.title}>
                    <Link to="/vendors">🛒 Vendors</Link>
                </h2>
                <p>Compiled list of trustworthy online vendors. </p>
                <p>
                    Frequently updated and audited to ensure subpar stores are kept at bay.</p>
            </div>
            <div className={styles.section} id="support">
                <h2 className={styles.title}>
                    <Link to="/support">💛 Support</Link>
                </h2>
                <p>Collaborate! </p><p>
                    Spread the word about your blog, personal project, or shop while promoting harm-reduction initiatives.</p>
            </div>
            <div className={styles.section} id="about">
                <h2 className={styles.title}>
                    <Link to="/info">ℹ️ About</Link>
                </h2>
                <p>Learn more about unharmed.info. </p>
                <p>
                    Discover the purpose of this project and get in touch through our contact information. </p>
            </div>
            <div className={styles.section} id="privacy">
                <h2 className={styles.title}>
                    <Link to="/privacy-policy">📜 Privacy</Link>
                </h2>
                <p>A brief overview of our privacy policy. </p>
                <p>
                    Spoiler alert: no tracking, using cookies or storing any of your personal information.</p>
            </div>
            <div className={styles.section} id="blog">
                <h2 className={styles.title}>
                    <Link to="https://ko-fi.com/unharmed/posts" target="_blank">📰 Blog</Link>
                </h2>
                <p>Our ko-fi blog. </p>
                <p>
                    Explore the most recent updates, planned features and the math behind tools.</p>
            </div>
        </div>
    )
}
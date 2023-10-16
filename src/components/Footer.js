import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer>
            <p>No tracking and no cookies - <Link to='/privacy-policy'>check here for details.</Link></p>
            <p>copyright 2023 unharmed.info</p>
        </footer>
    )
}
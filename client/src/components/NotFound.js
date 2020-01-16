import React from 'react';
import {Link} from "react-router-dom";
// Page Not Found Component
export default () => (
    <div className="bounds">
        <h1>Not Found</h1>
        <p>Sorry! We couldn't find the page you're looking for.</p>
        <Link to="/">Home</Link>
    </div>
);

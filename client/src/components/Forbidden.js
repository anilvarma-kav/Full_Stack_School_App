import React from 'react'
//router
import { Link } from 'react-router-dom'

const Forbidden = () => {
    return (
        <div className="bounds">
            <h1>Forbidden</h1>
            <p>Oh oh! You can't access this page.</p>
            <Link to="/">Return</Link>
        </div>
    )
}

export default Forbidden

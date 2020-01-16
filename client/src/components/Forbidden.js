import React from 'react'
//router
import { Link } from 'react-router-dom'

const Forbidden = () => {
    return (
        <div className="bounds">
            <h1>Forbidden</h1>
            <p>Sorry, You are not allowed here</p>
            <Link to="/">Home</Link>
        </div>
    )
}

export default Forbidden

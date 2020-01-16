import React from 'react'
//router
import { Link } from 'react-router-dom'

const UnhandledError = () => {
    return(
        <div className="bounds">
            <h1>Error</h1>
            <p>Sorry! Things are a little unstable here. I suggest come back later</p>
            <Link to="/">Home</Link>
        </div>
    )
}

export default UnhandledError

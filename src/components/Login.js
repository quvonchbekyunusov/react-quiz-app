import React from 'react'

function Login({onHandleChange, handleLogin}) {
    return (
        <div className="card">
            <div className="card-content">
                <div className="content">
                    <h1>Enter your name</h1>
                    <input 
                        className="input is-primary" 
                        type="text" 
                        placeholder="Primary input" 
                        onChange={onHandleChange}
                    />
                    <button className="button is-info is-medium" onClick={handleLogin} style={{marginTop:20}}>
                        Start
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login

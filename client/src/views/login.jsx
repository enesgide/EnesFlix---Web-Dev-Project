import { Link, useHistory } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const Login = () => {

    // Store states for user details
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();


    // Login to account
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login attempted");

        axios.post("http://localhost:3001/users/login", { username, password })
            .then(res => {
                history.push("/");
            })
            .catch(err => {
                history.push("/login");
            });
    }


    // Render page
    return (
        <div className="page-content" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

            <div className="login-content">

                <div className="login-heading">
                    Log in to EnesFlix
                </div>
                
                <form className="login-form" onSubmit={ handleSubmit }>
                    <input type="text" required placeholder="Username"
                    value={username} onChange={(e) => setUsername(e.target.value)}/>

                    <input type="password" required placeholder="Password"
                    value={password} onChange={(e) => setPassword(e.target.value)}/>

                    <button className="login-btn">
                        Log in
                    </button>

                    <div style={{fontFamily: 'Poppins', marginTop: '30px'}}>
                        Don't have an account?&nbsp;
                        <Link to="/signup">
                            <span className="signup-btn" style={{fontWeight: '500'}}>
                                Sign up
                            </span>                            
                        </Link>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default Login;
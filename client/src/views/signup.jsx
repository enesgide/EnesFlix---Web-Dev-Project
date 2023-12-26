import { Link, useHistory } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const SignUp = () => {

    // Store states for user details
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const history = useHistory();

    
    // Create new account
    const handleSubmit = (e) => {
        console.log("handle create account trigger");
        e.preventDefault();        

        if (password !== confirmPassword) {
            return console.warn("Passwords do not match");
        }        

        console.log("Create new user:", { username, password, confirmPassword });

        axios.post("http://localhost:3001/users", { username, password })
            .then(res => {
                console.log(res);
                history.push("/");
            })
            .catch(err => {
                console.error(err);
                history.push("/signup");                
            });
    }


    // Render page
    return (
        <div className="page-content" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

            <div className="login-content"  style={{padding: '50px', backgroundColor: 'rgb(40, 40, 40)', borderRadius: '20px',
            display: 'inline-flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', transform: 'translateY(-50px)',}}>

                <div className="login-heading">
                    Sign up to EnesFlix
                </div>
                
                <form className="login-form" onSubmit={ handleSubmit }>                    

                    <input type="text" required placeholder="Username"
                    value={username} onChange={(e) => setUsername(e.target.value)}/>

                    <input type="password" required placeholder="Password"
                    value={password} onChange={(e) => setPassword(e.target.value)}/>

                    <input type="password" required placeholder="Repeat Password"
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>

                    <button className="login-btn">
                        Sign up
                    </button>

                    <div style={{fontFamily: 'Poppins', marginTop: '30px'}}>
                        Already have an account?&nbsp;
                        <Link to="/login">
                            <span className="signup-btn" style={{fontWeight: '500'}}>
                                Log in
                            </span>                            
                        </Link>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default SignUp;
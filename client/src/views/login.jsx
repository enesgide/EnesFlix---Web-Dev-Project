import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Login = () => {
    // Store states for user details
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [hiddenPassword, setHiddenPassword] = useState(null);

    // Helper functions
    const handleSubmit = () => {
        console.log("Form is submitted");
    }

    useEffect(() => {
        if (!password) return;
        const hidden = "•".repeat(password.length);
        setHiddenPassword(hidden);
    }, [password]);

    // Render page
    return (
        <div className="page-content" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

            <div className="login-content" center>

                <div className="login-heading">
                    Log in to EnesFlix
                </div>
                
                <form className="login-form" onSubmit={ handleSubmit }>
                    <input type="text" required placeholder="Username"
                    value={username} onChange={(e) => setUsername(e.target.value)}/>

                    <input type="text" required placeholder="Password"
                    value={hiddenPassword} onChange={(e) => setPassword(e.target.value)}/>

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
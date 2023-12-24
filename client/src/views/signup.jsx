import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const SignUp = () => {

    // Store states for user details
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);


    // Helper functions
    const handleSubmit = (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            console.log("Create new user:", {username, password, confirmPassword});            
        } else {
            console.warn("Passwords do not match");
        }        
    }


    // Render page
    return (
        <div className="page-content" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

            <div className="login-content" center style={{padding: '50px', backgroundColor: 'rgb(40, 40, 40)', borderRadius: '20px',
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
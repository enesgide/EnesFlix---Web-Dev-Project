import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="page-content" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

            <div center style={{padding: '50px', backgroundColor: 'rgb(40, 40, 40)', borderRadius: '20px',
            display: 'inline-flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', transform: 'translateY(-50px)',}}>

                <div style={{color: 'white', fontFamily: 'Poppins', fontSize: '3rem', marginBottom: '20px'}}>
                    Error 404: Page Not Found
                </div>

                <Link to="/">
                    <div className="return-btn">
                        <span>Return to home</span>
                    </div>
                </Link>                    
            </div>
        </div>
    );
}

export default NotFound;
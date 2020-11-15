import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import userDatabase from '../userData'
import bcryptjs from 'bcryptjs';

const LoginPage = () => {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setloginError] = useState(false);

    useEffect(() => {
        const sessionToken = sessionStorage.getItem('sessionToken');

        if (sessionToken) {
            const userData = JSON.parse(sessionToken);

            redirectBasedOnRole(userData.role);
        }
    }, []);

    const authenticateUser = (username, password) => {
        const userData = userDatabase.filter((credential) => {
            return credential.username === username && bcryptjs.compareSync(password, credential.password);
        });
    
        if (userData.length > 0) {
            
            const hashedToken = JSON.stringify({
                username: userData[0].username,
                role: userData[0].role
            });

            return hashedToken;
        } else {
            setloginError(true);
            return false;
            // alert('USER NOT FOUND');
        }
    }

    const redirectBasedOnRole = (role) => {

        switch(role) {
            case ('ADMIN'): {
                history.push('/admin_page');
                break;
            }
            case ('USER'): {
                history.push('/user_page');
                break;
            }
            case ('SUPERADMIN'): {
                history.push('/superadmin_page');
                break;
            }
            default: {
                break;
            }
        } 
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const hashedToken = authenticateUser(username, password);

        if (hashedToken) {
            console.log(hashedToken);
            sessionStorage.setItem('sessionToken', hashedToken);

            const userData = JSON.parse(hashedToken);

            redirectBasedOnRole(userData.role);
        }
    }

    return (
        <div>
            <h2>Welcome</h2>
            <div className="container" id="container">
                <div className="form-container sign-in-container">
                    <form id="signInForm">
                        <h1>Sign in</h1>
                        <div className="social-container">
                        </div>
                        <input required onChange={(e) => { setUsername(e.target.value)}} name="username" placeholder="Username" className="email" id="username"/>
                        <input onChange={(e) => { setPassword(e.target.value)}} name="password" type="password" required placeholder="Password" id="password" />
                        {loginError && <p id="loginError" className="error">Email or password is incorrect</p>}
                        {/* <p id="loggedout" className="error">You have been logged out</p> */}
                        <button onClick={handleSubmit} type="button">Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

        {/* </div> */}
          {/* USERNAME
          <input type="text" onChange={(e) => { setUsername(e.target.value)}} />
          PASSWORD
          <input type="text" onChange={(e) => { setPassword(e.target.value)}}/>
          <button onClick={handleSubmit}>SUBMIT</button>
      </div> */}

export default LoginPage;
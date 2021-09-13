import React from 'react';
import './Login.css'
import logo from '../image/logos/logo.png';
import GoogleButton from 'react-google-button';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebaseConfig/firebaseConfig'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    useLocation
} from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

initializeApp(firebaseConfig);

const Login = () => {

    
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();

        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                sessionStorage.setItem('user',JSON.stringify(user))
                history.replace(from);
            }).catch((error) => {
                console.log(error)
            });
    }

    return (
        <div className="login" >
            <Link to="/"><img src={logo} alt="" /></Link>
            <div className="continueWithGoogle">
                <h4 className="text-center mb-3">Continue With Google</h4>
                <GoogleButton onClick={googleSignIn} style={{ width: '100%', border: '1px solid #ddd', overflow: 'hidden', borderRadius: '50px', backgroundColor: 'none', color: 'black' }} />
            </div>
        </div>
    );
};

export default Login;
import React, { useState } from 'react'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MainSpinner from '../../ui\'s/Spinner/MainSpinner';
// import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5'
import './auth.css';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { userLogin } = useAuthContext();


    async function handleUserLogin(e) {
        e.preventDefault();
        if(!email || !password) throw new Error('');
        await userLogin(email, password);
    }


  return (
    <>     
        {isLoading && (
            <MainSpinner />
        )}

        <Header />

        <section className="section">
            <div className="auth__container">
                <h2 className="auth__heading">Login Account</h2>

                <form className="auth__form">
                    <div className="auth__form--item">
                        <input type="email" className="auth__form--input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email*" required />
                    </div>
                    <div className="auth__form--item">
                        <div className="auth__form--input-box">
                            <input type={isShowPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="auth__form--input" placeholder="Password*" required />

                            <span onClick={() => setIsShowPassword(!isShowPassword)}>
                                {isShowPassword ? (
                                    <IoEyeOffOutline className="icon" />
                                ) : (
                                    <IoEyeOutline className="icon" />
                                )}
                            </span>
                        </div>
                    </div>

                    <Link to={'/forgot-password'} className="auth__link">Forgot your password?</Link>

                    <div className="auth__form--item">
                        <p>Sign up for early Sale access plus tailored new arrivals, trends and promotions. To opt out, click unsubscribe in our emails.</p>
                    </div>

                    <div className="auth__form--actions">
                        <button type="submit" className="auth__form--btn auth__submit" onClick={handleUserLogin}>Login</button>
                        <Link to={'/signup'} className="auth__form--btn auth__button">Sign Up</Link>
                    </div>
                </form>
            </div>
        </section>

        <Footer />
    </>
  )
}

export default Login

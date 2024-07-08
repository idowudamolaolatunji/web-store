import React, { useState } from 'react'
import Header from '../../components/Header';
import './auth.css';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';


function Signup() {
    const [isLoading, setIsLoading] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')


    return (
        <>
            <Header />

            <section className="section">
                <div className="auth__container">
                    <h2 className="auth__heading">Register Account</h2>

                    <form className="auth__form">
                        <div className="auth__form--item">
                            <input type="text" className="auth__form--input" placeholder="First Name*" required />
                        </div>
                        <div className="auth__form--item">
                            <input type="email" className="auth__form--input" placeholder="Last Name" />
                        </div>
                        <div className="auth__form--item">
                            <input type="email" className="auth__form--input" placeholder="Email*" required />
                        </div>
                        <div className="auth__form--item">
                            <div className="auth__form--input-box">
                                <input type={isShowPassword ? 'text' : 'password'} className="auth__form--input" placeholder="Password*" required />
                                <span onClick={() => setIsShowPassword(!isShowPassword)}>
                                    {isShowPassword ? (
                                        <IoEyeOffOutline className="icon" />
                                    ) : (
                                        <IoEyeOutline className="icon" />
                                    )}
                                </span>
                            </div>
                        </div>
                        <div className="auth__form--item">
                            <div className="auth__form--input-box">
                                <input type={isShowPasswordConfirm ? 'text' : 'password'} className="auth__form--input" placeholder="Password Confirm*" required />
                                <span onClick={() => setIsShowPasswordConfirm(!isShowPasswordConfirm)}>
                                    {isShowPasswordConfirm ? (
                                        <IoEyeOffOutline className="icon" />
                                    ) : (
                                        <IoEyeOutline className="icon" />
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className="auth__form--item">
                            <p>Sign up for early Sale access plus tailored new arrivals, trends and promotions. To opt out, click unsubscribe in our emails.</p>
                        </div>

                        <div className="auth__form--actions">
                            <button type="submit" className="auth__form--btn auth__submit">Register</button>
                            <Link to={'/login'} className="auth__form--btn auth__button">Sign In</Link>
                        </div>
                    </form>

                </div>
            </section>
        </>
    )
}

export default Signup

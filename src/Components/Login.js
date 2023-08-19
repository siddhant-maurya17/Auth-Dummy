import React, { useState, useEffect } from 'react';
import "../App.css"

const Login = () => {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            const user = JSON.parse(savedUser);
            setUser(user);
            fetchProfile(user.id);
        }
    }, []);

    const handleLogin = () => {
        if(username==="" || password ===""){
            setLoginError("Please fill up the Field");
            return;
        }
        
        fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
            .then(res => res.json())
            .then(data => {
                console.log("Data",data);
                if (data.username && data) {
                    localStorage.setItem('user', JSON.stringify(data));
                    setUser(data);
                    fetchProfile(data.id);
                    setLoginError('');
                } else {
                    setLoginError(data.message);
                }
            });
    };

    const fetchProfile = (userId) => {
        
        fetch(`https://dummyjson.com/users/${userId}`)
            .then(res => res.json())
            .then(profileData => {
                localStorage.setItem('profile', JSON.stringify(profileData));
                setProfile(profileData);
            });
    };
    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <div className="container">
        {!user ? (
            <div className="form-login">
                <div className="form-input">
                    <p className="welcome-msg">Welcome back! 👋</p>
                    <h3>Sign in to your account</h3>
                    <label for="user" className="label-email">Username</label>
                    <input type="text" className="user" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <label for="password">Password</label>
                    <input type="password" className="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={handleLogin}>CONTINUE</button>
                    <p className="forgot-pass">Forget your password?</p>
                    <p className='error'>{loginError}</p>
                </div>
                <p className="signup">Don't have an account?<span>Sign up</span></p>
            </div>
            ):(
                <div id="profile">
         
          {profile && (
            <div className="user-Profile">
              <p style={{ color: 'gray' }}>Welcome back! 👋</p>
              <h3>Welcome to your Profile</h3>
              <div className='image'>
                <img src={profile.image} alt="profile"/>
              </div>
              <p><strong>FirstName:</strong> {profile.firstName}</p>
              <p><strong>LastName:</strong> {profile.lastName}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Gender:</strong> {profile.gender}</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
          )}
        </div>
    )
}


export default Login;
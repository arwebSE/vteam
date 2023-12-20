import userModel from '../models/userModel';
// Function for handling login
export const handleLogin = async (setIsLoggedIn, navigate, username, passwd) => {
     const passdata = await userModel.passVerif(username, passwd);
    
    if (passdata) {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true'); // save login state
        localStorage.setItem('userName', username);
        localStorage.setItem('userId', passdata.userId);
        navigate('/home');
    }
    else {
        alert("Wrong username or password");
    } 
};

export const handleOauthlogin = async (setIsLoggedIn, navigate, state) => {
    
    if (state) {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true'); // save login state
        localStorage.setItem('userName', username);
        localStorage.setItem('userId', passdata.userId);
        navigate('/home');
    }
    else {
        alert("Wrong username or password");
    } 
};

export const handleOauthlogin = async (setIsLoggedIn, navigate, state) => {
    
    if (state) {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true'); // save login state
        localStorage.setItem('userName', username);
        localStorage.setItem('userId', passdata.userId);
        navigate('/home');
    }
    else {
        alert("Wrong username or password");
    } 
};

// Function for handling logout
export const handleLogout = (setIsLoggedIn, navigate) => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); // clear login state
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    navigate('/'); // redirect to login
};
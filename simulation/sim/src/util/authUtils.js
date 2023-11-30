// Function for handling login
export const handleLogin = (setIsLoggedIn, navigate) => {
    setIsLoggedIn(true);
    // todo: OAuth login logic here
    localStorage.setItem('isLoggedIn', 'true'); // save login state
    navigate('/home');
};

// Function for handling logout
export const handleLogout = (setIsLoggedIn, navigate) => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); // clear login state
    navigate('/'); // redirect to login
};
import userModel from '../models/userModel';
// Function for handling login
export const handleLogin = async (setIsLoggedIn, username, passwd) => {
    const passdata = await userModel.passVerif(username, passwd);
    console.log(passdata)
    if (passdata) {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true'); // save login state
        localStorage.setItem('userName', username);
        localStorage.setItem('userId', passdata.userId);
        localStorage.setItem('userRole', passdata.userrole);
    } else {
        alert("Wrong username or password");
    }
};


export const handleOauthlogin = async (setIsLoggedIn, state, userid) => {
    let user = await userModel.getUser(userid);
    console.log(user)
    // let userData = await userModel.passVerif(user.username, state);
    if (state && user) {
        setIsLoggedIn(true);
        localStorage.setItem('userId', userid);
        localStorage.setItem('isLoggedIn', 'true'); // save login state
        localStorage.setItem('userName', user.username);
        localStorage.setItem('userRole', user.userrole);
    } else {
        alert("User created login again");
    }
};
// Function for handling logout
export const handleLogout = (setIsLoggedIn) => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); // clear login state
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
};
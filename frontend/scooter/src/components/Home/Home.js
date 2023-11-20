import { useState } from 'react';
import logo from '../../boi.png';
import './Home.css';

function Home() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = (event) => {
        event.preventDefault();
        // login logic here
        setIsLoggedIn(true);
    };

    return (
        <div className="Home bg-grey-600">
            <header className="Home-header">
                <img src={logo} className="App-logo" alt="logo" />

                <div className='p-4 rounded-lg'>
                    <div className='text-black text-xl mb-4'>Welcome to BOI</div>
                    {!isLoggedIn ? (
                        <form onSubmit={handleLogin} className="bg-white p-4 rounded-lg">
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                                    Username
                                </label>
                                <input type="text" id="username" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                                    Password
                                </label>
                                <input type="password" id="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Login
                            </button>
                        </form>
                    ) : (
                        <div className="text-white">You are logged in!</div>
                    )}
                </div>
            </header>
        </div>
    );
}

export default Home;

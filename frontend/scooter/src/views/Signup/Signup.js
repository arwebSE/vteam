
import userModel  from '../../models/userModel'
import { useNavigate} from 'react-router-dom'
import "./style.css";

function Signup() {
    const navigate = useNavigate();
    const signup = () => {
        
        userModel.createUser(
            document.getElementById("username").value,
            document.getElementById("email").value,
            document.getElementById("password").value
        );
        navigate("/");
    }
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="p-8 md:p-12 lg:p-16 rounded-lg shadow-lg bg-white max-w-md md:max-w-lg">

                <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-extrabold text-indigo-600 mb-8 font-sans">
                    Create an account
                </h2>

                <form onSubmit={signup} className="space-y-6">
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm md:text-base lg:text-lg font-medium text-gray-700"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm md:text-base lg:text-lg font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm md:text-base lg:text-lg font-medium text-gray-700"
                        >
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-base md:text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sign up
                    </button>

                </form>            
            </div>
        </div>
    );
}

export default Signup;

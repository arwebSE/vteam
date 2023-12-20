import { useContext, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../util/AuthContext";
import { handleOauthlogin } from "../../util/authUtils";

function LoginAuth () {
    const navigate = useNavigate();
    const location = useLocation();
    const { isLoggedIn} = useContext(AuthContext);

    useEffect(() => {
        const handleLoginRedirect = () => {
          const urlParams = new URLSearchParams(location.search);
          const state = urlParams.get('state');
          if (state && isLoggedIn) {
            navigate('/home');
          }
        };
        handleLoginRedirect();
      }, [location, isLoggedIn, navigate]);
    
      if (isLoggedIn) {
        return null;
      }
    return (
        <p>Nu är dina fiskar ordentligt varma! Antagligen gick något fel här.</p>
    );
}

export default LoginAuth;
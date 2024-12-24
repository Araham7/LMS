import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function RequireAuth( { allowedRoles } ) {
  // console.log(`allowedRoles => ${JSON.stringify(allowedRoles)}`);

    const { isLoggedIn , role } = useSelector((state)=> state.auth);
    // console.log({
      //  isLoggedIn,
      //  role
    // });
    

  return (
    (isLoggedIn && allowedRoles.find((myRole) => myRole === role )) ?(
        <Outlet/> /* "RequireAuth" ke component me wraped route me upasthit Component ka user, agar "login" hai aur uska role "allowedRoles" se match karta hai tabhi route me upasthit component ko render karega. */
    ) : (isLoggedIn ? ( <Navigate to="/denied" />) : ( <Navigate to="/login" /> ) )
    /* Aur agar user "login" hai magar uska role "allowedRoles" se match nahi karta hai to "/denied" page par lejayega & agar "login" nahi hai to use "/login" route par redirect kardega. */
  )
}

export default RequireAuth;

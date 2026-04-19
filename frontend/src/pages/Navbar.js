import { useNavigate } from "react-router-dom";

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="navbar">
      <h2>🎯 JobMatcher</h2>

      <div>
        <span>{user}</span>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
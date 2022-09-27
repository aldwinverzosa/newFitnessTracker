
const logout = () => {
  localStorage.clear();
  window.location.href = "/";
};

const LogoutButton = () => {
  return (
    <button className="logout" onClick={() => logout()}>
      Logout
    </button>
  );
};


export default LogoutButton;

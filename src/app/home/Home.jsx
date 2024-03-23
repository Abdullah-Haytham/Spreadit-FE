import React from "react";

function Home() {
  const Logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div>
      <h1>homepage</h1>
      <button type="button" onClick={Logout}>
        Logout
      </button>
    </div>
  );
}
export default Home;

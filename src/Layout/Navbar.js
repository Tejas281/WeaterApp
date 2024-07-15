import { Outlet } from "react-router-dom";

const Navbar = () => (
  <>
    <div className="weather-card">
      <Outlet />
    </div>
  </>
);

export default Navbar;

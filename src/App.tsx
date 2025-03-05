import "./App.css";
import {NavLink, Outlet} from "react-router";
function App() {
  return (
      <main>
        <NavLink to="/" className={({isActive}) => (isActive ? "active" : "")}>
          Home
        </NavLink>
        <div className="flex flex-col gap-4">
          <Outlet />
        </div>
      </main>
  );
}

export default App;

import "./App.css";
import { Outlet } from "react-router";
import AppSidebar from "./components/AppSidebar";

function App() {
  return (
    <main>
      <div className="flex min-h-screen">
        <AppSidebar />
        <Outlet />
      </div>
    </main>

  );
}

export default App;

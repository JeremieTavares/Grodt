import "./App.css";
import AppSidebar from "./components/app-sidebar";
import {Routes, Route} from "react-router-dom";
import Landing from "./views/Landing";
import {Profile} from "./views/profile/Profile";

function App() {
  return (
    <main>
      <div className="flex min-h-screen">
        <AppSidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default App;

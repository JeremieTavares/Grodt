import "./App.css";
import AppSidebar from "./components/AppSidebar";
import {Routes, Route} from "react-router-dom";
import Landing from "./views/Landing";
import {Profile} from "./views/profile/Profile";
import BudgetTracking from "./views/budget/BudgetTracking";
import {Toaster} from "@/components/ui/sonner";

function App() {
  return (
    <main>
      <div className="flex min-h-screen">
        <AppSidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/budget" element={<BudgetTracking />} />
          </Routes>
          <Toaster position="top-right" richColors />
        </div>
      </div>
    </main>
  );
}

export default App;

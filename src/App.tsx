import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store } from "./store";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import ReportPage from "./components/ReportPage";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-light-gray">
          <Navigation />
          <main className="ml-64">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/report" element={<ReportPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

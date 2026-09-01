import AnalyzerForm from "./components/analyzer/AnalyzerForm";
import ResultPage from "./components/results/ResultPage";
import { Route, Routes } from "react-router-dom";
import LoadingPage from "./components/loading/loadingPage";
import LoginPage from "./components/auth/LoginPage";
import SignUpPage from "./components/auth/SignUpPage";
import AppLayout from "./components/layout/AppLayout";

function App() {
  return (
    <>
      {/* <Navbar /> */}

      <main className="page-container">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/" element={<SignUpPage />} />
          <Route element={<AppLayout />}>
            <Route path="/analyzer" element={<AnalyzerForm />} />
            <Route path="/analyzing" element={<LoadingPage />} />
            <Route path="/results" element={<ResultPage />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;

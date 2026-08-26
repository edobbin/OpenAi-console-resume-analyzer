import Navbar from "./components/layout/Navbar";
import AnalyzerForm from "./components/analyzer/AnalyzerForm";
import ResultPage from "./components/results/ResultPage";
import { Route, Routes } from "react-router-dom";
import LoadingPage from "./components/loading/loadingPage";

function App() {
  return (
    <>
      <Navbar />

      <main className="page-container">
        <Routes>
          <Route path="/" element={<AnalyzerForm />} />
          <Route path="/analyzing" element={<LoadingPage />} />
          <Route path="/results" element={<ResultPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

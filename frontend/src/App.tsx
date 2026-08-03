import Navbar from "./components/layout/Navbar";
import AnalyzerForm from "./components/analyzer/AnalyzerForm";
import ResultPage from "./components/results/ResultPage";

function App() {
  return (
    <>
      <Navbar />

      <main className="page-container">
        <AnalyzerForm />
        <ResultPage />
      </main>
    </>
  );
}

export default App;

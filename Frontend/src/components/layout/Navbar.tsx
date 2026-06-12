// Frontend/src/components/layout/Navbar.tsx

import Clock from "./Clock";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__brand">
        <span className="navbar__logo">MyATS</span>
        <span className="navbar__subtitle">AI Resume Analyzer</span>
      </div>

      <div className="navbar__right">
        <Clock />

        <nav className="navbar__links" aria-label="Main navigation">
          <a href="#analyzer">Analyze</a>
          <a href="#sample-report">Sample Report</a>
          <a
            href="https://github.com/edobbin/OpenAi-console-resume-analyzer"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
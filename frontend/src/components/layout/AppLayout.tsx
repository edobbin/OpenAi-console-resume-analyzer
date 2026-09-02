import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function AppLayout() {
  return (
    <>
      <Navbar />

      <main className="page-container">
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;

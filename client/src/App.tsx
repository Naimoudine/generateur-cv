import { Outlet } from "react-router-dom";
import Navbar from "./components/nav/Navbar";

function App() {
  return (
    <>
      <header className="mb-8">
        <Navbar />
      </header>
      <main className="px-4">
        <Outlet />
      </main>
    </>
  );
}

export default App;

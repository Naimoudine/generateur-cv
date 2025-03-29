import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between m-4">
      <Link to="/">GenCv</Link>
      <ul className="flex items-center gap-16">
        <li>
          <NavLink to="resumes">Cv</NavLink>
        </li>
        <li>
          <NavLink to="letters">Lettre de motivation</NavLink>
        </li>
      </ul>
      <button type="button">Connexion</button>
    </nav>
  );
}

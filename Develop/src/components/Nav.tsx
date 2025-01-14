import { NavLink } from 'react-router-dom';

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <nav className="nav">
      <ul>
        <li className="nav-item">
          <NavLink to="/" className="nav-link" activeClassName="active">
            Search Candidates
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/savedCandidates" className="nav-link" activeClassName="active">
            Saved Candidates
          </NavLink>
        </li>
      </ul>
    </nav>
  )
};

export default Nav;

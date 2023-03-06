import { Link } from "react-router-dom"
import "../Styles/Nav.css"
import Logo from "../Assets/silhouette.png"

const Nav = () => {
    return (
        <section className="navbar">
            <div className="nav-header">
                <img src={Logo}></img>
                <h1>Tarkov Loadouts</h1>
            </div>
            <div className="nav-button-container">
               <Link to="/"><button>Hideout</button></Link> 
            </div>
        </section>
    )
}

export default Nav
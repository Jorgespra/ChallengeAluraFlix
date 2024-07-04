import { Link } from "react-router-dom";
import styles from "./Cabecera.module.css"
import logo from "./LogoMain.png"
import CabeceraLink from "./CabeceraLink";

function Cabecera() {
    return (
    
            <header className={styles.cabecera}>
                <Link to="/">
                    <section className={"styles.logoContainer"}>
                        <img src={logo} alt="logo Alura" /><span></span>
                    </section>
                </Link>
                <nav className={styles.nav}>
                    <CabeceraLink url="/">Home</CabeceraLink>
                    <CabeceraLink url="/nuevovideo">Nuevo Video</CabeceraLink>
                </nav>
            </header>
            
      


    )

}

export default Cabecera; 
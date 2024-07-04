import logo from "../Cabecera/LogoMain.png"
import styles from "./Pie.module.css"

function Pie (){
    return(
        <div className={styles.pie}>
            <img src={logo} alt="logo" className="logoPie" />
        </div>

    )
}

export default Pie
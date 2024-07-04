import styles from "./Banner.module.css"


function Banner(color) {
    return (
        <div
            className={styles.capa}
            style={{ backgroundImage: `url("/img/banner-home.png")` }}
        >
            <div className={styles.gradient} style={{ background: `${color}` }}>

            </div>

        </div>
    )
}

export default Banner
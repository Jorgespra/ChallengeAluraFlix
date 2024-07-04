import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./Category.module.css";

function Category({ categoria }) {
    return (
        <div>
            {categoria.map((category, index) => (
                <Link to={`categoria${index}`} key={index}>
                    <div className={styles.texto}>
                        <h1>{category}</h1>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Category;

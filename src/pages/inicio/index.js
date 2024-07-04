import React, { useEffect, useState } from 'react';
import Banner from 'components/Banner';
import Cabecera from 'components/Cabecera';
import VideoCard from 'components/VideoCard';
import styles from './Inicio.module.css';
import Category from 'components/Category';
import Pie from 'components/Pie';

function Inicio() {
    const [videos, setVideos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/videos")
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                if (Array.isArray(data) && data.length > 0) {
                    const allCategorias = data.reduce((acc, video) => {
                        return acc.concat(video.categoria || []); // Aseguramos que video.categoria sea un array
                    }, []);
                    const uniqueCategorias = [...new Set(allCategorias)];
                    setVideos(data);
                    setCategorias(uniqueCategorias);
                } else {
                    throw new Error('Data format is incorrect or empty');
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setError(error);
            });
    }, []);

    // Función para agrupar videos por categoría
    const groupVideosByCategory = (categoria) => {
        return videos.filter(video => video.categoria && video.categoria.includes(categoria));
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        return (
            <>
                <Cabecera />
                <Banner color="#154580" />
                <section className={styles.container}>
                    {categorias.map((categoria, index) => (
                        <div key={index}>
                            <Category categoria={[categoria]} />
                            <div className={styles.videoContainer}>
                                {groupVideosByCategory(categoria).map((video) => (
                                    <VideoCard key={video.id} id={video.id} capa={video.imagen} titulo={video.titulo} />
                                ))}
                            </div>
                        </div>
                    ))}
                </section>
                <Pie />
            </>
        );
    }
}

export default Inicio;

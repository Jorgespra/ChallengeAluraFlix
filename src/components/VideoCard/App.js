import React, { useState, useEffect } from 'react';
import Modal from './components/Modal/Modal';
import NotFound from '../'; // Ajusta la ruta si es necesario

function App() {
    const [video, setVideo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Simulación de carga del video (puedes adaptarlo a tu lógica real)
        const fetchVideo = async () => {
            try {
                const response = await fetch('http://localhost:3000/videos?id=1');
                if (!response.ok) {
                    throw new Error('Video no encontrado');
                }
                const data = await response.json();
                if (Array.isArray(data) && data.length > 0) {
                    setVideo(data[0]);
                } else {
                    throw new Error('Video no encontrado');
                }
            } catch (error) {
                console.error('Error fetching video:', error);
                // Manejo de errores o configuración inicial del video
            }
        };

        fetchVideo();
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (!video) return <NotFound />; // Verifica si video está definido antes de renderizar

    return (
        <div>
            <button onClick={openModal}>Reproducir Video</button>
            {isModalOpen && <Modal onClose={closeModal} video={video} />}
        </div>
    );
}

export default App;

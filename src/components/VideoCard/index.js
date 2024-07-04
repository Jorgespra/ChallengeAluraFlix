import React, { useState, useEffect } from 'react';
import styles from './VideoCard.module.css';
import iconBorrar from './iconBorrar.png';
import iconEditar from './iconEditar.png';
import Modal from './modal';
import VideoModal from 'components/VideoModal/VideoModal';

const VideoCard = ({ id, capa, titulo, categoria, link, descripcion, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [videos, setVideos] = useState([]);
    const [editingVideo, setEditingVideo] = useState(null);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [currentVideoLink, setCurrentVideoLink] = useState('');

    const handleDeleteClick = async () => {
        try {
            const response = await fetch(`http://localhost:3000/videos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to delete video with id ${id}. Status: ${response.status} ${response.statusText}`);
            }

            onDelete(id); 
        } catch (error) {
            console.error('Error al eliminar el video:', error);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            const response = await fetch('http://localhost:3000/videos');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setVideos(data);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    const handleEdit = (video) => {
        setEditingVideo(video);
    };

    const handleUpdateVideo = async (updatedVideo) => {
        try {
            const response = await fetch(`http://localhost:3000/videos/${updatedVideo.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedVideo),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

           
            const updatedVideos = videos.map((video) =>
                video.id === updatedVideo.id ? updatedVideo : video
            );
            setVideos(updatedVideos);

           
            closeModal();
        } catch (error) {
            console.error('Error updating video:', error);
        }
    };

    const handleImageClick = () => {
        console.log(`Imagen del video ${id} clickeada`);

        const video = videos.find(video => video.id === id);
        if (video) {
            
            setCurrentVideoLink(video.link);
            setIsVideoModalOpen(true);
        }
        
        
    };

    return (
        <div className={styles.frameVideoContainer}>
            <img
                src={capa}
                alt={titulo}
                className={styles.capa}
                onClick={handleImageClick} 
            />
            <div className={styles.buttonFrame}>
                <img
                    src={iconEditar}
                    alt="Icono Editar"
                    className={styles.iconButton}
                    onClick={openModal}
                />
                <img
                    src={iconBorrar}
                    alt="Icono Borrar"
                    className={styles.iconButton}
                    onClick={handleDeleteClick}
                />
            </div>
            {isModalOpen && (
                <Modal
                    onClose={closeModal}
                    id={id}
                    video={{ id, capa, titulo, categoria, link, descripcion }}
                    onUpdate={handleUpdateVideo}
                />
            )}
            {isVideoModalOpen && (
                <VideoModal
                    onClose={() => setIsVideoModalOpen(false)}
                    link={currentVideoLink}
                />
            )}
        </div>
    );
};

export default VideoCard;

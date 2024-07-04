import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './VideoModal.module.css';

const VideoModal = ({ onClose, link }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentVideoLink, setCurrentVideoLink] = useState(null); 

    useEffect(() => {
        setIsLoading(true);
        setCurrentVideoLink(link); 
        setIsLoading(false);
    }, [link]);

    const handleClose = () => {
        onClose();
    };

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleUpdateVideo = () => {
        console.log('Video actualizado');
    };

    return (
        <div className={styles.modalOverlay} onClick={handleClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={handleClose}>
                    &times;
                </button>
                <div className={styles.modalBody}>
                    <iframe
                        width="100%"
                        height="100%"
                        src={currentVideoLink} 
                        title="Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

VideoModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    link: PropTypes.string.isRequired,
};

export default VideoModal;

import React, { useState } from 'react';
import Modal from './modal';

const ParentComponent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Datos de ejemplo
    const video = {
        id: 1,
        titulo: 'Sample Title',
    };

    return (
        <div>
            <button onClick={openModal}>Abrir Modal</button>
            {isModalOpen && <Modal onClose={closeModal} video={video} />}
        </div>
    );
};

export default ParentComponent;

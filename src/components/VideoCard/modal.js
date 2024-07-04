import React from 'react';
import styles from './Modal.module.css'; 
import { useForm } from 'react-hook-form';

const categories = [
    "FRONT END",
    "BACK END",
    "UX/UI",
    "INNOVACION"
];

const Modal = ({ onClose, id, video, onUpdate }) => {
    const { register, handleSubmit, setValue } = useForm();

    React.useEffect(() => {
        if (video) {
            setValue('titulo', video.titulo || '');
            setValue('categoria', video.categoria || '');
            setValue('capa', video.capa || '');
            setValue('link', video.link || '');
            setValue('descripcion', video.descripcion || '');
        }
    }, [video, setValue]);

    const handleFormSubmit = (data) => {
        const updatedVideo = {
            ...data,
            id: id
        };
        onUpdate(updatedVideo); // Llamar a onUpdate como función pasada desde props
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button onClick={onClose} className={styles.closeButton}>X</button>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <div>
                        <label htmlFor="id">ID</label>
                        <input
                            id="id"
                            name="id"
                            type="text"
                            readOnly
                            value={id} // Mostrar el número de id del objeto
                        />
                    </div>

                    <div>
                        <label htmlFor="titulo">Título</label>
                        <input
                            id="titulo"
                            name="titulo"
                            type="text"
                            {...register('titulo', { required: true })}
                        />
                    </div>
                    <div>
                        <label htmlFor="categoria">Categoría</label>
                        <select
                            id="categoria"
                            name="categoria"
                            {...register('categoria', { required: true })}
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="capa">Capa (URL)</label>
                        <input
                            id="capa"
                            name="capa"
                            type="text"
                            {...register('capa', { required: true })}
                        />
                    </div>
                    <div>
                        <label htmlFor="link">Link</label>
                        <input
                            id="link"
                            name="link"
                            type="text"
                            {...register('link', { required: true })}
                        />
                    </div>
                    <div>
                        <label htmlFor="descripcion">Descripción</label>
                        <textarea
                            id="descripcion"
                            name="descripcion"
                            {...register('descripcion', { required: true })}
                        />
                    </div>
                    <button type="submit">Guardar Cambios</button>
                    
                </form>
            </div>
        </div>
    );
};

export default Modal;

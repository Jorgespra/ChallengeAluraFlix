import React from 'react';
import VideoCard from './index'; // Asegúrate de importar el componente VideoCard desde la ubicación correcta

function ParentComponent() {
    const handleEdit = (id) => {
        console.log(`Edit video with id ${id}`);
        // Lógica para editar el video
    };

    const handleDelete = async (id) => {
        console.log(`Delete video with id ${id}`);
        // Lógica para eliminar el video
    };

    return (
        <div>
            <VideoCard
                id={1}  // Puedes pasar el id del video como prop
                capa="url_de_la_imagen"  // Reemplaza con la URL real de la imagen
                titulo="Título del Video"
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
}

export default ParentComponent;

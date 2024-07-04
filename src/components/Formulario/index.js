import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from "./Formulario.module.css";

let nextId = Date.now();

const FormData = {
    fields: [
        { name: 'titulo', html_element: 'text', label: 'Título', required: true, placeholder: "Ingrese el título" } 
    ]
};

const FormData1 = {
    fields: [
        { name: 'capa', html_element: 'url', label: 'Capa', placeholder: 'Ingrese el enlace de la imagen del video' },
        { name: 'link', html_element: 'url', label: 'Link', required: true, placeholder: 'Ingrese el enlace del video' }
    ]
};

const FormData2 = {
    fields: [
        { name: 'descripcion', html_element: 'text', label: 'Descripción', placeholder: 'Ingrese la descripción' }
    ]
};

function Formulario() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [successMessage, setSuccessMessage] = useState('');
    const [idGenerado, setIdGenerado] = useState(null);

    const onSubmit = async data => {
        
        const id = nextId++;
        setIdGenerado(id); 

        try {
            const response = await fetch('http://localhost:3000/videos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, ...data }) 
            });

            if (response.ok) {
                setSuccessMessage('Datos guardados correctamente');
                setTimeout(() => {
                    setSuccessMessage('');
                    setIdGenerado(null); // Limpiar el estado del ID después de un tiempo
                    reset(); // Limpiar el formulario después de guardar
                }, 3000);
            } else {
                console.error('Error al guardar los datos:', response);
                alert('Error al guardar los datos');
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            alert('Error al enviar la solicitud');
        }
    };

    const handleReset = () => {
        reset({
            titulo: '',
            capa: '',
            link: '',
            descripcion: '',
            categoria: ''
        });
    };

    return (
        <div className={styles.Formulario}>
            <section className={styles.tituloFormulario}>
                <h1 className={styles.titulo}>NUEVO VIDEO</h1>
                <p className={styles.parrafoTitulo}>Complete el formulario para crear una nueva tarjeta de video</p>
            </section>

            <div className={styles.crearTarjeta}>
                <div className={styles.tarjeta}>
                    <h1>Crear Tarjeta</h1>
                </div>
                <section className={styles.datas}>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.formulario}>
                        
                        <div className={styles.seccion1}>
                            <div className={styles.ingreso}>
                                <label>Categoría</label>
                                <select 
                                    className={`${styles.cuadrito} ${errors.categoria ? styles.error : ''}`} 
                                    {...register('categoria', { required: true })}
                                >
                                    <option value="">Seleccione una categoría</option>
                                    <option value="FRONT END">FRONT END</option>
                                    <option value="BACK END">BACK END</option>
                                    <option value="UX/UI">UX/UI</option>
                                    <option value="INNOVACION">INNOVACIÓN</option>
                                </select>
                                {errors.categoria && <span className={styles.errorMessage}>Este campo es obligatorio</span>}
                            </div>

                            {FormData.fields.map(inputData => (
                                <div className={styles.ingreso} key={inputData.name}>
                                    {inputData.name !== 'id' && ( // Evitar mostrar el campo 'id' en el formulario
                                        <div className={styles.ingreso}>
                                            <label>{inputData.label}</label>
                                            <input
                                                className={`${styles.cuadrito} ${errors[inputData.name] ? styles.error : ''}`}
                                                type={inputData.html_element}
                                                placeholder={inputData.placeholder}
                                                {...register(inputData.name, { required: inputData.required })}
                                            />
                                            {errors[inputData.name] && <span className={styles.errorMessage}>Este campo es obligatorio</span>}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className={styles.seccion1}>
                            {FormData1.fields.map(inputData => (
                                <div className={styles.ingreso} key={inputData.name}>
                                    <label>{inputData.label}</label>
                                    <input
                                        className={`${styles.cuadrito} ${errors[inputData.name] ? styles.error : ''}`}
                                        type={inputData.html_element}
                                        placeholder={inputData.placeholder}
                                        {...register(inputData.name, { required: inputData.required })}
                                    />
                                    {errors[inputData.name] && <span className={styles.errorMessage}>Este campo es obligatorio</span>}
                                </div>
                            ))}
                        </div>

                        <div className={styles.seccion2}>
                            {FormData2.fields.map(inputData => (
                                <div className={styles.ingreso2} key={inputData.name}>
                                    <label>{inputData.label}</label>
                                    <input
                                        className={`${styles.cuadrito2} ${errors[inputData.name] ? styles.error : ''}`}
                                        type={inputData.html_element}
                                        placeholder={inputData.placeholder}
                                        {...register(inputData.name)}
                                    />
                                    {errors[inputData.name] && <span className={styles.errorMessage}>Este campo es obligatorio</span>}
                                </div>
                            ))}
                        </div>

                        <div className={styles.botones}>
                            <button type="submit" className={styles.boton}>Enviar</button>
                            <button type="button" onClick={handleReset} className={styles.boton}>Limpiar</button>
                        </div>
                    </form>
                </section>
            </div>

            {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
            {idGenerado && <div className={styles.idGenerado}>ID generado: {idGenerado}</div>}
        </div>
    );
}

export default Formulario;

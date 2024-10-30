import React, { useState } from "react";
import documentService from "../services/document.service";

const CreditApplication = () => {
    const [files, setFiles] = useState([null, null, null, null]); // Estado para hasta 4 archivos
    const [rut, setRut] = useState("");      // Para almacenar el RUT del cliente
    const [status, setStatus] = useState(""); // Para mostrar mensajes de estado

    // Función que maneja el cambio en los inputs de archivo
    const handleFileChange = (index, e) => {
        const newFiles = [...files];
        newFiles[index] = e.target.files[0]; // Almacena solo un archivo por índice
        setFiles(newFiles);
    };

    // Función que maneja el cambio en el input del RUT
    const handleRutChange = (e) => {
        setRut(e.target.value);
    };

    // Función para manejar la subida de documentos
    const handleUpload = async () => {
        if (files.every(file => !file) || !rut) {
            setStatus("Por favor selecciona al menos un archivo y proporciona el RUT del cliente.");
            return;
        }

        try {
            // Subir cada archivo que no sea nulo
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (file) {
                    await documentService.uploadDocument(file, file.name, file.type, rut);
                }
            }
            setStatus("Documentos subidos con éxito");
        } catch (error) {
            console.error("Error al subir el documento", error);
            setStatus("Error al subir el documento");
        }
    };

    return (
        <div>
            <h2>Subir Documentos PDF</h2>
            {files.map((file, index) => (
                <div key={index}>
                    <input 
                        type="file" 
                        accept="application/pdf" 
                        onChange={(e) => handleFileChange(index, e)} 
                    />
                    {file && <span>{file.name}</span>} {/* Muestra el nombre del archivo seleccionado */}
                </div>
            ))}
            <br />
            <input 
                type="text" 
                placeholder="Ingrese el RUT del cliente" 
                value={rut} 
                onChange={handleRutChange} 
            />
            <br />
            <button onClick={handleUpload}>Subir Documentos</button>
            <p>{status}</p>
        </div>
    );
};

export default CreditApplication;

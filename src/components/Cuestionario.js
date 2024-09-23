import React, { useState } from 'react';
import './Cuestionario.css';  // Archivo CSS para estilos

const preguntasPreCharla = [
    { id: 1, texto: "¿Cuenta con Sala ERA?", opciones: ["C", "NC", "NA"] },
    { id: 2, texto: "¿Cuenta con la habilitación del servicio de urgencias?", opciones: ["C", "NC", "NA"] },
    { id: 3, texto: "¿Realizan tamizaje para identificación de IRA?", opciones: ["C", "NC", "NA"] },
    { id: 4, texto: "¿Aplica protocolo de manejo de IRA?", opciones: ["C", "NC", "NA"] },
    { id: 5, texto: "¿Tiene un programa de capacitación activa?", opciones: ["C", "NC", "NA"] }
];

const preguntasPostCharla = [
    { id: 1, texto: "¿Implementó un nuevo protocolo de manejo?", opciones: ["C", "NC", "NA"] },
    { id: 2, texto: "¿Se capacitó al personal adicionalmente?", opciones: ["C", "NC", "NA"] },
    { id: 3, texto: "¿Se evaluaron los resultados de las medidas implementadas?", opciones: ["C", "NC", "NA"] },
    { id: 4, texto: "¿Realizó seguimiento en las áreas críticas?", opciones: ["C", "NC", "NA"] }
];

const Cuestionario = ({ tipoCuestionario, onResultSubmit }) => {
    const [nombre, setNombre] = useState('');
    const [respuestas, setRespuestas] = useState({});

    const preguntas = tipoCuestionario === 'Pre-Charla' ? preguntasPreCharla : preguntasPostCharla;

    const handleSubmit = (event) => {
        event.preventDefault();
        const aciertos = Object.values(respuestas).filter(r => r === 'C').length;
        const porcentaje = (aciertos / preguntas.length) * 100;
        onResultSubmit({ nombre, porcentaje, tipoCuestionario });
    };

    const handleRespuestaChange = (id, value) => {
        setRespuestas({ ...respuestas, [id]: value });
    };

    return (
        <div className="cuestionario-container">
            <h1>Cuestionario {tipoCuestionario}</h1>
            
            {/* Sección de explicación sobre las respuestas */}
            <div className="explicacion">
                <h3>Instrucciones</h3>
                <p>Por favor, seleccione una respuesta para cada pregunta de acuerdo con la siguiente clave:</p>
                <ul>
                    <li><strong>C:</strong> Cumple con el criterio</li>
                    <li><strong>NC:</strong> No cumple con el criterio</li>
                    <li><strong>NA:</strong> No aplica en este caso</li>
                </ul>
            </div>
            
            <form onSubmit={handleSubmit} className="cuestionario-form">
                <label>Nombre:
                    <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} required />
                </label>
                {preguntas.map(pregunta => (
                    <div key={pregunta.id} className="pregunta">
                        <p>{pregunta.texto}</p>
                        {pregunta.opciones.map(opcion => (
                            <label key={opcion}>
                                <input
                                    type="radio"
                                    name={`pregunta-${pregunta.id}`}
                                    value={opcion}
                                    onChange={() => handleRespuestaChange(pregunta.id, opcion)}
                                    required
                                />
                                {opcion}
                            </label>
                        ))}
                    </div>
                ))}
                <button type="submit" className="btn-enviar">Enviar</button>
            </form>
        </div>
    );
};

export default Cuestionario;

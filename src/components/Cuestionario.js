import React, { useState } from 'react';
import './Cuestionario.css';  // Archivo CSS para estilos

// Preguntas de Pre-Charla
const preguntasPreCharla = [
    { id: 1, texto: "¿Qué es una Sala ERA?", opciones: ["A: Espacio de atención para enfermedades respiratorias agudas.", "B: Área de consulta externa general.", "C: Unidad de cuidados intensivos."], correcta: "A" },
    { id: 2, texto: "¿Qué servicio se debe habilitar para la atención de urgencias?", opciones: ["A: Servicio de emergencias pediátricas.", "B: Servicio de urgencias generales.", "C: Consulta externa."], correcta: "B" },
    { id: 3, texto: "¿Qué es el tamizaje de IRA?", opciones: ["A: Evaluación para detectar enfermedades respiratorias agudas.", "B: Programa de vacunación.", "C: Consulta de rutina."], correcta: "A" },
    { id: 4, texto: "¿Qué es un protocolo de manejo de IRA?", opciones: ["A: Manual para tratamiento de enfermedades respiratorias.", "B: Programa de salud ocupacional.", "C: Plan de emergencias."], correcta: "A" },
    { id: 5, texto: "¿Qué implica un programa de capacitación activa?", opciones: ["A: Capacitación periódica para mejorar conocimientos.", "B: Entrenamiento inicial.", "C: Talleres anuales de actualización."], correcta: "A" }
];

// Preguntas de Post-Charla
const preguntasPostCharla = [
    { id: 1, texto: "¿Qué tipo de protocolo de manejo se recomienda implementar?", opciones: ["A: Protocolo basado en evidencia clínica.", "B: Protocolo administrativo.", "C: Protocolo para emergencias no respiratorias."], correcta: "A" },
    { id: 2, texto: "¿Qué es importante al capacitar al personal?", opciones: ["A: Actualizar los conocimientos del personal.", "B: Solo capacitar al nuevo personal.", "C: Capacitación cada 5 años."], correcta: "A" },
    { id: 3, texto: "¿Qué es evaluar los resultados?", opciones: ["A: Revisar el impacto de las medidas implementadas.", "B: Registrar las actividades diarias.", "C: Hacer informes mensuales."], correcta: "A" },
    { id: 4, texto: "¿Qué significa hacer seguimiento en áreas críticas?", opciones: ["A: Monitorear constantemente las áreas de alto riesgo.", "B: Supervisar solo una vez al año.", "C: Revisar resultados de áreas no críticas."], correcta: "A" }
];

const Cuestionario = ({ tipoCuestionario, onResultSubmit }) => {
    const [nombre, setNombre] = useState('');
    const [respuestas, setRespuestas] = useState({});
    const [preguntaActual, setPreguntaActual] = useState(0);  // Control de la pregunta actual

    const preguntas = tipoCuestionario === 'Pre-Charla' ? preguntasPreCharla : preguntasPostCharla;

    // Manejar envío de resultados
    const handleSubmit = (event) => {
        event.preventDefault();
        const aciertos = Object.values(respuestas).filter(r => r === 'correcta').length;
        const porcentaje = (aciertos / preguntas.length) * 100;
        onResultSubmit({ nombre, porcentaje, tipoCuestionario });
    };

    // Manejar cambio de respuesta seleccionada
    const handleRespuestaChange = (id, value) => {
        const esCorrecta = value === preguntas[preguntaActual].correcta;
        setRespuestas({ ...respuestas, [id]: esCorrecta ? 'correcta' : 'incorrecta' });
    };

    // Ir a la siguiente pregunta
    const handleNextQuestion = () => {
        if (preguntaActual < preguntas.length - 1) {
            setPreguntaActual(preguntaActual + 1);
        }
    };

    return (
        <div className="cuestionario-container">
            <h1 className="titulo">Cuestionario {tipoCuestionario}</h1>

            {/* Sección de instrucciones */}
            <div className="explicacion">
                <h3>Instrucciones</h3>
                <p>Por favor, selecciona la respuesta correcta para cada pregunta:</p>
            </div>

            <form onSubmit={handleSubmit} className="cuestionario-form">
                <label className="nombre-input">
                    Nombre:
                    <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} required />
                </label>

                {/* Mostrar una pregunta a la vez */}
                {preguntaActual < preguntas.length ? (
                    <div key={preguntas[preguntaActual].id} className="pregunta">
                        <p>{preguntas[preguntaActual].texto}</p>
                        {preguntas[preguntaActual].opciones.map(opcion => (
                            <label key={opcion}>
                                <input
                                    type="radio"
                                    name={`pregunta-${preguntas[preguntaActual].id}`}
                                    value={opcion}
                                    onChange={() => handleRespuestaChange(preguntas[preguntaActual].id, opcion[0])}
                                    required
                                />
                                {opcion}
                            </label>
                        ))}
                        <button type="button" className="btn-enviar" onClick={handleNextQuestion}>
                            Siguiente Pregunta
                        </button>
                    </div>
                ) : (
                    <button type="submit" className="btn-enviar">Enviar Cuestionario</button>
                )}
            </form>
        </div>
    );
};

export default Cuestionario;

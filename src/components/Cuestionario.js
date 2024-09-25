import React, { useState } from 'react';
import './Cuestionario.css';  // Archivo CSS para estilos

// Preguntas de Pre-Test
const preguntasPreTest = [
    { id: 1, texto: "¿Qué es una Sala ERA?", opciones: ["A: Espacio de atención para enfermedades respiratorias agudas.", "B: Área de consulta externa general.", "C: Unidad de cuidados intensivos."], correcta: "A" },
    { id: 2, texto: "¿Qué servicio se debe habilitar para la atención de urgencias?", opciones: ["A: Servicio de emergencias pediátricas.", "B: Servicio de urgencias generales.", "C: Consulta externa."], correcta: "B" },
    { id: 3, texto: "¿Qué es el tamizaje de IRA?", opciones: ["A: Evaluación para detectar enfermedades respiratorias agudas.", "B: Programa de vacunación.", "C: Consulta de rutina."], correcta: "A" },
    { id: 4, texto: "¿Qué es un protocolo de manejo de IRA?", opciones: ["A: Manual para tratamiento de enfermedades respiratorias.", "B: Programa de salud ocupacional.", "C: Plan de emergencias."], correcta: "A" },
    { id: 5, texto: "¿Qué implica un programa de capacitación activa?", opciones: ["A: Capacitación periódica para mejorar conocimientos.", "B: Entrenamiento inicial.", "C: Talleres anuales de actualización."], correcta: "A" },
    { id: 6, texto: "¿Cuál es el objetivo del tamizaje de IRA?", opciones: ["A: Reducir el número de consultas externas.", "B: Identificar rápidamente los casos de IRA.", "C: Mejorar la infraestructura hospitalaria."], correcta: "B" },
    { id: 7, texto: "¿Qué característica debe tener una Sala ERA?", opciones: ["A: Debe estar alejada de otras áreas del hospital.", "B: Debe contar con equipo de diagnóstico adecuado.", "C: No necesita personal especializado."], correcta: "B" },
    { id: 8, texto: "¿Qué es un protocolo de manejo?", opciones: ["A: Un documento que establece pasos a seguir en un procedimiento.", "B: Una guía de precios para consultas.", "C: Un manual de servicios generales."], correcta: "A" },
    { id: 9, texto: "¿Por qué es importante la capacitación continua?", opciones: ["A: Para cumplir con los requisitos legales.", "B: Para asegurar que el personal esté actualizado.", "C: No es importante."], correcta: "B" },
    { id: 10, texto: "¿Qué deben evaluar los protocolos de manejo de IRA?", opciones: ["A: La satisfacción del paciente.", "B: La eficacia del tratamiento.", "C: El costo de los medicamentos."], correcta: "B" }
];

// Preguntas de Post-Test
const preguntasPostTest = [
    { id: 1, texto: "¿Qué tipo de protocolo de manejo se recomienda implementar?", opciones: ["A: Protocolo basado en evidencia clínica.", "B: Protocolo administrativo.", "C: Protocolo para emergencias no respiratorias."], correcta: "A" },
    { id: 2, texto: "¿Qué es importante al capacitar al personal?", opciones: ["A: Actualizar los conocimientos del personal.", "B: Solo capacitar al nuevo personal.", "C: Capacitación cada 5 años."], correcta: "A" },
    { id: 3, texto: "¿Qué es evaluar los resultados?", opciones: ["A: Revisar el impacto de las medidas implementadas.", "B: Registrar las actividades diarias.", "C: Hacer informes mensuales."], correcta: "A" },
    { id: 4, texto: "¿Qué significa hacer seguimiento en áreas críticas?", opciones: ["A: Monitorear constantemente las áreas de alto riesgo.", "B: Supervisar solo una vez al año.", "C: Revisar resultados de áreas no críticas."], correcta: "A" },
    { id: 5, texto: "¿Cuál es el principal objetivo de un protocolo de manejo de IRA?", opciones: ["A: Mejorar la atención al paciente.", "B: Disminuir el número de consultas.", "C: Aumentar la rentabilidad del hospital."], correcta: "A" },
    { id: 6, texto: "¿Qué debe incluir un programa de capacitación?", opciones: ["A: Evaluaciones periódicas.", "B: Solo información teórica.", "C: No necesita un seguimiento."], correcta: "A" },
    { id: 7, texto: "¿Cómo se debe realizar el seguimiento de los protocolos?", opciones: ["A: Revisar los protocolos anualmente.", "B: Con supervisión continua y ajustes según sea necesario.", "C: No es necesario hacer seguimiento."], correcta: "B" },
    { id: 8, texto: "¿Qué indicador se puede usar para evaluar la efectividad de un protocolo?", opciones: ["A: El costo del material médico.", "B: La tasa de satisfacción del personal.", "C: La reducción en el número de casos graves de IRA."], correcta: "C" },
    { id: 9, texto: "¿Qué se debe hacer si un protocolo no está funcionando?", opciones: ["A: Ignorarlo y continuar.", "B: Hacer ajustes y reevaluar.", "C: Crear un nuevo protocolo desde cero."], correcta: "B" },
    { id: 10, texto: "¿Cuál es un resultado esperado de una buena capacitación?", opciones: ["A: Reducción de errores en el manejo de IRA.", "B: Mayor rotación de personal.", "C: Aumento de costos operativos."], correcta: "A" }
];

const Cuestionario = ({ tipoCuestionario, onResultSubmit }) => {
    const [nombre, setNombre] = useState('');
    const [respuestas, setRespuestas] = useState({});
    const [preguntaActual, setPreguntaActual] = useState(0);  // Control de la pregunta actual

    const preguntas = tipoCuestionario === 'Pre-Test' ? preguntasPreTest : preguntasPostTest;

    // Manejar envío de resultados
    const handleSubmit = (event) => {
        event.preventDefault();
        const aciertos = Object.values(respuestas).filter(r => r === 'correcta').length;
        const porcentaje = (aciertos / preguntas.length) * 100;
        onResultSubmit({ nombre, porcentaje, tipoCuestionario });
    };

    // Manejar cambio de respuesta seleccionada
    const handleRespuestaChange = (id, value) => {
        const esCorrecta = value.charAt(0) === preguntas.find(p => p.id === id).correcta;
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
                <div key={preguntas[preguntaActual].id} className="pregunta">
                    <p>{preguntas[preguntaActual].texto}</p>
                    {preguntas[preguntaActual].opciones.map(opcion => (
                        <label key={opcion}>
                            <input
                                type="radio"
                                name={`pregunta-${preguntas[preguntaActual].id}`}
                                value={opcion}
                                onChange={() => handleRespuestaChange(preguntas[preguntaActual].id, opcion)}
                                required
                            />
                            {opcion}
                        </label>
                    ))}
                </div>

                {/* Mostrar botón de siguiente pregunta o de enviar cuestionario */}
                {preguntaActual < preguntas.length - 1 ? (
                    <button type="button" className="btn-enviar" onClick={handleNextQuestion}>
                        Siguiente Pregunta
                    </button>
                ) : (
                    <button type="submit" className="btn-enviar">Enviar Cuestionario</button>
                )}
            </form>
        </div>
    );
};

export default Cuestionario;

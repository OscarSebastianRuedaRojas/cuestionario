import React, { useState } from 'react';
import Cuestionario from './components/Cuestionario';  // Asegúrate de que el nombre del archivo sea correcto
import './App.css';  // Archivo CSS para el estilo de la página principal

const App = () => {
    const [tipoCuestionario, setTipoCuestionario] = useState('');
    const [resultado, setResultado] = useState(null);

    const handleTipoSeleccion = (tipo) => {
        setTipoCuestionario(tipo);
    };

    const handleResultSubmit = (data) => {
        // Aquí podrías enviar los datos a la base de datos o hacer cualquier otra acción
        console.log('Resultado enviado a la base de datos:', data);
        setResultado(data);
    };

    return (
        <div className="app-container">
            {!tipoCuestionario ? (
                <div className="seleccion-cuestionario">
                    <h1>Seleccione el tipo de cuestionario</h1>
                    <button className="btn-seleccion" onClick={() => handleTipoSeleccion('Pre-Charla')}>Pre-Charla</button>
                    <button className="btn-seleccion" onClick={() => handleTipoSeleccion('Post-Charla')}>Post-Charla</button>
                </div>
            ) : (
                <Cuestionario tipoCuestionario={tipoCuestionario} onResultSubmit={handleResultSubmit} />
            )}

            {resultado && (
                <div className="resultado">
                    <h2>Resultado del Cuestionario {resultado.tipoCuestionario}</h2>
                    <p>Nombre: {resultado.nombre}</p>
                    <p>Porcentaje de aciertos: {resultado.porcentaje.toFixed(2)}%</p>
                </div>
            )}
        </div>
    );
};

export default App;
import React, { useState } from 'react';
import axios from 'axios';  // Importar axios
import Cuestionario from './components/Cuestionario';  // Asegúrate de que el nombre del archivo sea correcto
import './App.css';  // Archivo CSS para el estilo de la página principal

const App = () => {
    const [tipoCuestionario, setTipoCuestionario] = useState('');
    const [resultado, setResultado] = useState(null);

    const handleTipoSeleccion = (tipo) => {
        setTipoCuestionario(tipo);
    };

    const handleResultSubmit = (data) => {
        fetch('https://cuestionariobackend-production.up.railway.app/api/cuestionario/guardar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => setResultado(data))
        .catch(error => console.error('Error:', error));
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

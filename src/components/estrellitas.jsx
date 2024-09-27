import React from "react";

export const Estrellitas = ({ ken }) => {
    //console.log("Ken del personaje: ", ken);

    // Calcula el número de estrellas basado en el valor de ken
    const nDestino = Math.floor(ken / 100);

    const getEstrellaSrc = (ken) => {
        if (ken >= 200) {
            return "./estrellaDorada.svg"; 
        } else {
            return "./estrellaGris.svg"; 
        } 
    };


    // Genera un array de estrellas según nDestino
    const estrellas = Array.from({ length: nDestino }, (_, index) => (
        <img
            key={index}
            alt="estrella dorada"

            src={getEstrellaSrc(ken)}
            width="24"
            height="24"
            className="d-inline-block align-top barrelRoll"      
        />
    ));

    return <div className="">{estrellas}</div>;
};


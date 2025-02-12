import React from "react";

export const Estrellitas = ({ ken }) => {
    const nDestino = Math.floor(ken / 100);

    const getEstrellaSrc = (ken) => {
        if (ken >= 200) {
            return "./estrellaDorada.svg"; 
        } else {
            return "./estrellaGris.svg"; 
        } 
    };

    // Determinar el tamaño de las estrellas en función de `ken`
    const size = ken > 700 ? 22 : 24; // Si `ken` es mayor a 700, las estrellas serán más pequeñas

    const estrellas = Array.from({ length: nDestino }, (_, index) => (
        <img
            key={index}
            alt="estrella dorada"
            src={getEstrellaSrc(ken)}
            width={size}
            height={size}
            className="d-inline-block align-top barrelRoll"      
        />
    ));

    return <div className="">{estrellas}</div>;
};

//import { Direction } from "@dnd-kit/core/dist/types";
import React, { useState, useEffect } from "react";


import { Form, Container } from 'react-bootstrap';


export const Item = ({ id, itemValues, handleItemChange }) => {
  const handleChange = (field, value) => {
    const newValues = { ...itemValues, [field]: value };
    handleItemChange(id, newValues);
  };



  const [isEnabled, setIsEnabled] = useState(true);

  const handleToggleChange = (event) => {
    setIsEnabled(event.target.checked);
  };

  return (
    <div className="container-fluid tecnicaEspecial" style={{marginTop:"2em"}}>
      <div style={{display:"flex", flexDirection:"row"}}>
      <input
        className="inputInventario"
        type="text"
        value={itemValues.nombre}
        onChange={(e) => handleChange('nombre', e.target.value)}
        placeholder="Nombre"
        style={{fontFamily:"cursive", fontSize:"1em", color:"yellow"}}
      />  
      <div>
          < input
            type="checkbox"
            id="custom-checkbox"
            checked={isEnabled}
            onChange={handleToggleChange}
            style={{ margin: '10px',transform: 'scale(1.5)',alignItems:"center"}} // Ajustar el margen si es necesario
          />
        </div>
       
      </div>
    
        
 


        <textarea
        className="tecnica"
        value={itemValues.presentacion}  // Mantener la referencia correcta
        onChange={(e) => handleChange('presentacion', e.target.value)}
        placeholder="Presentacion:"  // Corregido aquí
      />
      <textarea
        className="tecnica"
        value={itemValues.sistema}  // Mantener la referencia correcta
        onChange={(e) => handleChange('sistema', e.target.value)}
        placeholder="Sistema:"  // Corregido aquí
      />
    </div>
  );
};







export const TecnicaEspecial = ({ tecEspecialN, setTecEspecialN }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(
      tecEspecialN.map((item, index) => ({
        id: index,
        values: {
          nombre: item.nombre || "",
          presentacion: item.presentacion || "",
          sistema: item.sistema || "",
        },
      }))
    );
  }, [tecEspecialN]);

  const handleItemChange = (id, newValues) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, values: newValues } : item
    );

    // Verificar si todos los campos están vacíos y eliminar el elemento si es así
    const isEmpty = Object.values(newValues).every((value) => value === "");
    const finalItems = isEmpty
      ? updatedItems.filter((item) => item.id !== id)
      : updatedItems;

    setItems(finalItems);

    // Actualizar el inventario general con los nuevos valores
    const newTecnicas = finalItems.map((item) => item.values);
    setTecEspecialN(newTecnicas);
  };

  const btnAgregarItem = () => {
    setItems([
      ...items,
      { id: items.length, values: { nombre: "", presentacion: "", sistema: "" } },
    ]);
    setTecEspecialN([
      ...tecEspecialN,
      { nombre: "", presentacion: "", sistema: "" },
    ]);
  };

  return (
    <div className="gradComp">
      <p style={{ color: "aliceblue", fontSize: "30px", fontFamily: "inpact", margin: "10px" }}>PODERES ESPECIALES</p>
      {items.map((item) => (
        <Item
          key={item.id}
          id={item.id}
          itemValues={item.values}
          handleItemChange={handleItemChange}
        />
      ))}
      <button className="btn btn-primary" style={{ margin: "10px" }} onClick={btnAgregarItem}>
        +Tecnica-Porder-Objeto especial
      </button>
    </div>
  );
};



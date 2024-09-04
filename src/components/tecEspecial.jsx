

import React, { useState, useEffect } from "react";
import { Tooltip, OverlayTrigger } from 'react-bootstrap';



export const Item = ({ id, itemValues, handleItemChange }) => {
  const handleChange = (field, value) => {
    const newValues = { ...itemValues, [field]: value };
    handleItemChange(id, newValues);
  };

  const handleToggleChange = (event) => {
    const newValues = { ...itemValues, check: event.target.checked };
    handleItemChange(id, newValues);
  };




    // Definir el tooltip
    const renderTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        ¿Elijes mostrar este poder especial?
      </Tooltip>
    );

  return (
    <div className="container-fluid tecnicaEspecial" style={{ marginTop: "2em" }}>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <input
          className="inputInventario"
          type="text"
          value={itemValues.nombre}
          onChange={(e) => handleChange('nombre', e.target.value)}
          placeholder="Nombre"
          style={{ fontFamily: "cursive", fontSize: "1em", color: "yellow", marginRight: '10px' }}
        />
          <OverlayTrigger
          placement="left"
        overlay={renderTooltip}
      >
        <input
          type="checkbox"
          id="custom-checkbox"
          checked={itemValues.check}
          onChange={handleToggleChange}
          style={{ margin: '0', transform: 'scale(1.5)' }} // Ajustar el tamaño y el margen si es necesario
        />
        </OverlayTrigger>
        
      </div>

      <textarea
        className="tecnica"
        value={itemValues.presentacion}
        onChange={(e) => handleChange('presentacion', e.target.value)}
        placeholder="Presentacion:"
      />
      <textarea
        className="tecnica"
        value={itemValues.sistema}
        onChange={(e) => handleChange('sistema', e.target.value)}
        placeholder="Sistema:"
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
          check: item.check || false,
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


    // Verificar si los campos están vacíos excepto 'check' y 'check' es false, eliminar el elemento
    const areFieldsEmpty = !newValues.nombre && !newValues.presentacion && !newValues.sistema;
    const shouldRemoveItem = areFieldsEmpty && !newValues.check;

    const finalItems = shouldRemoveItem
      ? updatedItems.filter((item) => item.id !== id)
      : updatedItems;

    setItems(finalItems);

    // Actualizar el inventario general con los nuevos valores
    const newTecnicas = finalItems.map((item) => item.values);
    setTecEspecialN(newTecnicas);


    /*
    // Verificar si todos los campos están vacíos y eliminar el elemento si es así
    const isEmpty = Object.values(newValues).every((value) => value === "");
    const finalItems = isEmpty
      ? updatedItems.filter((item) => item.id !== id)
      : updatedItems;

    setItems(finalItems);

    // Actualizar el inventario general con los nuevos valores
    const newTecnicas = finalItems.map((item) => item.values);
    setTecEspecialN(newTecnicas);*/
  };

  const btnAgregarItem = () => {
    setItems([
      ...items,
      { id: items.length, values: { check: false, nombre: "", presentacion: "", sistema: ""} },
    ]);
    setTecEspecialN([
      ...tecEspecialN,
      { check: false, nombre: "", presentacion: "", sistema: ""  },
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


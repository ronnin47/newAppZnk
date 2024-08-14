import { openDB } from 'idb';

const DB_NAME = 'myDatabase';
const DB_VERSION = 3;

const initDB = async () => {
  return await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('coleccionPersonajesDB')) {
        db.createObjectStore('coleccionPersonajesDB', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('personajesDB')) {
        db.createObjectStore('personajesDB', { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

export const dbPromise = initDB();

// Función para obtener todos los personajes de 'coleccionPersonajesDB'
export const getAllPersonajes = async () => {
  const db = await dbPromise;
  return await db.getAll('coleccionPersonajesDB');
};

// Función para guardar todos los personajes en 'coleccionPersonajesDB'
export const setAllPersonajes = async (personajes) => {
  const db = await dbPromise;
  const tx = db.transaction('coleccionPersonajesDB', 'readwrite');
  await tx.store.clesr()
  personajes.forEach(personaje => tx.store.put(personaje));
  await tx.done;
};

// Función para obtener todos los personajes de 'personajesDB'
export const getPersonajesDB = async () => {
  const db = await dbPromise;
  return await db.getAll('personajesDB');
};




// Función para guardar todos los personajes en 'personajesDB'
export const setPersonajesDB = async (personajes) => {
  const db = await dbPromise;
  const tx = db.transaction('personajesDB', 'readwrite');
  
  // Limpia la tienda de objetos antes de agregar los nuevos personajes
  await tx.store.clear();
  
  // Agrega los nuevos personajes
  personajes.forEach(personaje => tx.store.put(personaje));
  
  // Espera a que la transacción se complete
  await tx.done;
};








// Función para borrar todos los datos de los almacenes de objetos
export const clearIndexedDB = async () => {
  const db = await dbPromise;
  const objectStoreNames = db.objectStoreNames;
  
  for (let i = 0; i < objectStoreNames.length; i++) {
    const storeName = objectStoreNames[i];
    const tx = db.transaction(storeName, 'readwrite');
    tx.store.clear(); // Borra todos los datos del almacén de objetos
    await tx.done;
  }
  console.log('IndexedDB ha sido limpiado.');
};


// Función específica para limpiar 'personajesDB'
export const clearPersonajesDB = async () => {
  const db = await dbPromise;
  const tx = db.transaction('personajesDB', 'readwrite');
  await tx.store.clear();
  await tx.done;
};

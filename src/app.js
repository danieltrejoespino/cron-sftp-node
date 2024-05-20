require('dotenv').config();
const fs = require('fs');
const actions = require("./controller/controller")

async function deleteLock() {
  if (fs.existsSync('lock')) {
    try {
        fs.unlinkSync('lock');
        console.log('Archivo eliminado correctamente');
    } catch (err) {
        console.error('Error al eliminar el archivo:', err);
    }
} else {
    console.error('El archivo no existe:', 'lock');
}  
}

function isProcessRunning() {
  return fs.existsSync('lock');
}




async function startProcess() {
  if (isProcessRunning()) {
    console.log('El proceso ya está en ejecución');
    return;
  }

  try {
    fs.writeFileSync('lock', 'running');
    console.log('El proceso se ha iniciado');
    await run(); 
    fs.unlinkSync('lock');
    console.log('El proceso ha finalizado');
  } catch (error) {
    console.error('Error al crear o eliminar el archivo "lock":', error);
  }
}


async function run () {
  try {
    const isConnected = await actions.openConn()        
    if (isConnected) {
      actions.log('Conectado a servidor amex')  
      const isLeads = await actions.getLeads()  
      if (isLeads >=1) {
        actions.log(`Total de archivos descargados: ${isLeads}`)
      }else{
        actions.log(`Sin archivos en el servidor de amex`)
      }
  
    }else{    
      actions.log('Sin conexion con servidor amex')
    }
    
  } catch (error) {
    
  } finally {    
    actions.log('Conexion cerrada')
    await actions.endConn()
    return true;
  } 
  
}

module.exports = {deleteLock,isProcessRunning,startProcess}
require('dotenv').config();

const actions = require("./controller/controller")

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

module.exports = run
require('dotenv').config();
const fs = require('fs');
const actions = require("./controller/controller")

async function deleteLock() {
  if (fs.existsSync('lock')) {
    try {
        fs.unlinkSync('lock');
        console.log('File lock successfully deleted');
    } catch (err) {
        console.error('Error deleting file: ', err);
    }
} else {
    console.error('File does not exist :', 'lock');
}  
}

function isProcessRunning() {
  return fs.existsSync('lock');
}




async function startProcess() {
  let horaEjecucion = new Date().toLocaleString();
  if (isProcessRunning()) {    
    actions.log(`get-leads is already running. It will not be started again. ${horaEjecucion}`)        
    return;
  }
  try {    
    fs.writeFileSync('lock', 'running');    
    actions.log(`get-leads has been initiated. ${horaEjecucion}`)        
    await run(); 
    fs.unlinkSync('lock');
    actions.log(`The process is completed. ${horaEjecucion}`)            
  } catch (error) {
    console.error('Error creating or deleting file "lock":', error);
  }
}


async function run () {
  try {
    const isConnected = await actions.openConn()        
    if (isConnected) {
      actions.log('Connected to amex server')        
      actions.log('Downloading csv files ...')  
      const isLeads = await actions.getLeads()  
      if (isLeads >=1) {
        actions.log(`Total files downloaded: ${isLeads}`)
        return true
      }else{
        actions.log(`No files on the amex server`)
        return false
      }  
    }else{    
      actions.log('No connection to amex server')
      return false
    }
    
  } catch (error) {
    
  } finally {    
    actions.log('Closed connection')
    await actions.endConn()
    return true;
  } 
  
}

module.exports = {deleteLock,isProcessRunning,startProcess}




try {
  
} catch (error) {
  
}finally{

}
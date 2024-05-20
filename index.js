const {deleteLock,isProcessRunning,startProcess} = require('./src/app');
const cron = require('node-cron');
 
 

deleteLock()
// cron.schedule('*/1 * * * *', async () => {
cron.schedule('*/30 * * * * *', async () => {
  if (!isProcessRunning()) {
    await startProcess();
  } else {
    console.log('El proceso ya está en ejecución. No se iniciará nuevamente.');
  }
});

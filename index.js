const {deleteLock,isProcessRunning,startProcess} = require('./src/app');
const cron = require('node-cron');
 
 

deleteLock()
cron.schedule('*/1 * * * *', async () => {
// cron.schedule('*/30 * 8-19 * * *', async () => {
  if (!isProcessRunning()) {
    await startProcess();
  } else {
    console.log('The process is already running. It will not be started again.');
  }
});

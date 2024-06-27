const {deleteLock,isProcessRunning,startProcess,clean} = require('./src/app');
const cron = require('node-cron');
 
deleteLock()

cron.schedule('* * * * *', async () => {
// cron.schedule('*/30 * 8-19 * * *', async () => {
  if (!isProcessRunning()) {
    await startProcess();
  } else {
    console.log('The process is already running. It will not be started again.');
  }
});


cron.schedule('0 22 * * 0', async () => {
    await clean()
  });

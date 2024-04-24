const fs = require('fs');
const run = require('./src/app');
const cron = require('node-cron');

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
    await run(); // Asegúrate de que run() devuelva una promesa si utilizas await
    fs.unlinkSync('lock');
    console.log('El proceso ha finalizado');
  } catch (error) {
    console.error('Error al crear o eliminar el archivo "lock":', error);
  }
}

cron.schedule('*/1 * * * *', async () => {
  if (!isProcessRunning()) {
    await startProcess();
  } else {
    console.log('El proceso ya está en ejecución. No se iniciará nuevamente.');
  }
});
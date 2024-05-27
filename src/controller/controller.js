const Client = require('ssh2-sftp-client')
const path = require('path')

const publicFolderPath = path.join(__dirname, '..', '..', 'public/tempLeads');

const config = {
  host: process.env.sftpHost,
  username: process.env.sftpUser,
  password: process.env.sftpPass,
  // port: 65002
}
const sftp = new Client()


const actions = {
  openConn: async () => {
    try {
      await sftp.connect(config)
      return true
    } catch (error) {
      console.log(error);
      return false
    }

  },
  endConn: async () => {
    try {
      sftp.end()
    } catch (error) {
      return error
    }
  },
  getLeads: async () => {
    const regex = /(WINBACK|CALLME)/;
    try {
      const listFiles = await sftp.list('/outbox')
      // const listFiles = await sftp.list('/home/u466684088/domains/jaudica.com/outbox')
      let total = 0

      if (!listFiles.length) {
        return total
      }

      for (const element of listFiles) {
        if (element.type === '-') {
          if (element.name.endsWith('.csv')) {
            if (regex.test(element.name)) {
              // console.log(element.name);
              // let remoteFilePath = `/home/u466684088/domains/jaudica.com/outbox/${element.name}`
              let remoteFilePath = `/outbox/${element.name}`
              const localFilePath = path.join(publicFolderPath, element.name)
              await sftp.get(remoteFilePath, localFilePath)
              total ++
            }
          }
        }
      } //fin for

      return total
      
    } catch (error) {
      console.log(error);
      return false
    }
  },
  log: async (data) => {
    console.log(data);
  }
}


module.exports = actions

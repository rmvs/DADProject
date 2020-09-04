const multer = require('multer')
const MulterAzureStorage = require('multer-azure-blob-storage').MulterAzureStorage;

const azureStorage = new MulterAzureStorage({
    connectionString: '',
    accessKey: '',
    accountName: 'vmdad2020groupdiag',
    containerName: 'documentos',
    containerAccessLevel: 'blob',
    urlExpirationTime: 60
 });
 
 const upload = multer({
    storage: azureStorage
 });


module.exports = upload
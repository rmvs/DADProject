const multer = require('multer')
const MulterAzureStorage = require('multer-azure-blob-storage').MulterAzureStorage;
const fs = require('fs');
let keys = JSON.parse(fs.readFileSync('src/keys.json'))


const azureStorage = new MulterAzureStorage({
    connectionString: keys['connectionString'],
    accessKey: keys['accessKey'],
    accountName: keys['accountName'],
    containerName: keys['containerName'],
    containerAccessLevel: 'blob',
    urlExpirationTime: 60
 });
 
 const upload = multer({
    storage: azureStorage
 });


module.exports = upload
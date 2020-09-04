const multer = require('multer')
const MulterAzureStorage = require('multer-azure-blob-storage').MulterAzureStorage;

const azureStorage = new MulterAzureStorage({
    connectionString: 'DefaultEndpointsProtocol=https;AccountName=vmdad2020groupdiag;AccountKey=BjCMKLtg7ABjYHZ/hDC2UK+NUtBK/GXaz1znl8UTNWBXIqHoQfB8X1ZE4COFdaEGPT/jvAEIsiBeUlVZKG3uWQ==;EndpointSuffix=core.windows.net',
    accessKey: 'BjCMKLtg7ABjYHZ/hDC2UK+NUtBK/GXaz1znl8UTNWBXIqHoQfB8X1ZE4COFdaEGPT/jvAEIsiBeUlVZKG3uWQ==',
    accountName: 'vmdad2020groupdiag',
    containerName: 'documentos',
    // blobName: resolveBlobName,
    // metadata: resolveMetadata,
    containerAccessLevel: 'blob',
    urlExpirationTime: 60
 });
 
 const upload = multer({
    storage: azureStorage
 });


module.exports = upload
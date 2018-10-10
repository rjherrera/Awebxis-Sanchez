const fs = require('fs');
const { storage } = require('pkgcloud');
const amazonConfig = require('../config/amazon');

const CONTAINER_NAME = 'cambalache';

let client;

try {
  client = storage.createClient({
    provider: 'amazon',
    keyId: 'MINIOACCESSKEY',
    key: 'MINIOSECRETKEY',
    region: 'us-west-2',
    forcePathBucket: true,
    endpoint: 'http://127.0.0.1:9000',
    // ...amazonConfig
  });
} catch (e) {
  console.error('Cloud storage failed to initialize. Upload/download operations will throw error. More details: ', e);
}

function assertClientInitialized() {
  if (!client) throw new Error('Cloud storage client not initialized');
}

/**
 * Uploads the local file to the remote cloud storage
 * @param {String} localPath local path of the file to upload
 * @param {String} remotePath path where to store the file in cloud storage
 * @returns {Promise} resolved when file finishes to upload
 */
function upload(localPath, remotePath) {
  assertClientInitialized();
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(localPath);
    const writeStream = client.upload({
      container: CONTAINER_NAME,
      remote: remotePath,
    });
    writeStream.on('error', reject);
    writeStream.on('success', resolve);
    readStream.pipe(writeStream);
  });
}

/**
 * Gets a read stream for the remote file
 * @param {String} remotePath path of the remote file
 * @returns {ReadableStream}
 */
function download(remotePath) {
  assertClientInitialized();
  return client.download({ container: CONTAINER_NAME, remote: remotePath });
}

function buildRemotePath(fileName, { directoryPath, namePrefix }) {
  const path = directoryPath ? `${directoryPath}/` : '';
  const name = namePrefix ? `${namePrefix}-${fileName}` : fileName;
  return `${path}${name}`;
}

module.exports = {
  client,
  download,
  upload,
  buildRemotePath,
};

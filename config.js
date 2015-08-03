'@namespace PublicVoting';

// General settings
var config = {
	production: false,
	server_listen_port: 3000,
	
	cert_file: '../data/certificate.pem',
	cert_private_key: '../data/private.key',
	
	logLevel: 'debug',
	logFile: '../logs/PublicVoting.log',
};

module.exports = config;
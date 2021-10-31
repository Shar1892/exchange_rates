const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
require('./ipcmain');

function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	// и загрузить index.html приложения.
	//mainWindow.loadFile('index.html')
	const startUrl =
		process.env.ELECTRON_START_URL ||
		url.format({
			pathname: path.join(__dirname, '../index.html'),
			protocol: 'file:',
			slashes: true,
		});

	win.loadURL(startUrl);
	// mainWindow.loadURL('http://localhost:3000');

	// Отображаем средства разработчика.
	// mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
	createWindow();
	app.on('activate', () => {
		// Для MacOS
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		// Кроме MacOS
		app.quit();
	}
});

const { app, Tray } = require('electron');
var platform = require('os').platform();

let tray = null;
var trayImage;
var imageFolder = __dirname + '/assets/images';

function start() {
    // Determine appropriate icon for platform
    if (platform == 'darwin') {
        trayImage = imageFolder + '/osx/trayTemplate.png';
    } else if (platform == 'win32') {
        trayImage = imageFolder + '/win/tray.ico';
    }

    tray = new Tray(trayImage);

    if (platform == "darwin") {
        tray.setPressedImage(imageFolder + '/osx/trayHighlight.png');
    }

    const contextMenu = Menu.buildFromTemplate([
        { label: 'Item1', type: 'radio' },
        { label: 'Item2', type: 'radio' },
        { label: 'Item3', type: 'radio', checked: true },
        { label: 'Item4', type: 'radio' }
    ]);
    tray.setToolTip('This is my application.')
    tray.setContextMenu(contextMenu);
}

app.on('ready', () => {
    start();
});
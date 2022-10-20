const {app, BrowserWindow, Menu, ipcMain } = require('electron');

const url = require('url');

const path = require('path');

if(process.env.NODE_ENV !== 'production'){
   require('electron-reload')(__dirname, {
electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
    });

   
};

let mainWindow


app.on('ready', ()=>{
   mainWindow= new BrowserWindow({
      width: 100,
      height: 600,
      webPreferences: {
         nodeIntegration: true,
         contextIsolation: false,
         enableRemoteModule: true,
       }
   });
   mainWindow.loadURL(url.format({
      pathname: path.join(__dirname,'views/index.html'),
      protocol: 'file',
      slashes: true, 
   }))


   const mainMenu= Menu.buildFromTemplate(templateMenu);
   Menu.setApplicationMenu(mainMenu);

   mainWindow.on('closed', ()=>{
      app.quit();
   });
   
});





function createNewProductWindow(){
   newProductWindow= new BrowserWindow({
      width: 600,
      height: 600,
      title:'Nuevo Producto',
      webPreferences: {
         nodeIntegration: true,
         contextIsolation: false,
         enableRemoteModule: true,
       }
   });
   //newProductWindow.setMenu(null);
   newProductWindow.loadURL(url.format({
      pathname: path.join(__dirname,'views/add-product.html'),
      protocol: 'file',
      slashes: true

 }))
   newProductWindow.on('closed', ()=>{
      newProductWindow = null;
   });
}

function createPriceListWindow(){
   priceListWindow= new BrowserWindow({
      width: 400,
      height: 330,
      title:'Lista de precios'
   });
   //priceListWindow.setMenu(null);
   priceListWindow.loadURL(url.format({
      pathname: path.join(__dirname,'views/price-list.html'),
      protocol: 'file',
      slashes: true

 }))

 priceListWindow.on('closed', ()=>{
   priceListWindow = null;
   });
}

ipcMain.on('product:new',(event, newProduct) =>{
   console.log(newProduct);
   mainWindow.webContents.send('product:new',newProduct);
   newProductWindow.close();
});

const templateMenu = [
   {
      label: 'Opciones',
      submenu: [
         {
            label: 'Nuevo Producto',
            accelerator: 'Ctrl+N',
            click(){
               createNewProductWindow();
            }
         },
         {
            label: 'Lista de Precios',
            accelerator: 'Ctrl+P',
            click(){
               createPriceListWindow();
            }
         },
         {
            label: 'Salir',
            accelerator: 'Ctrl+Q',
            click(){
               app.quit();
            }
         }

      ]
   }

];

if(process.env.NODE_ENV !== 'production'){
   templateMenu.push({
      label:'DevTools',
      submenu:[
      {
         label:'Show/Hide DevTools',
         click(item, focusedWindow){
            focusedWindow.toggleDevTools();
         }
      },

      {
         role: 'reload'
      } 

      ]
   })
}

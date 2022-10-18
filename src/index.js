const {app, BrowserWindow, Menu } = require('electron');

const url = require('url');

const path = require('path');

if(process.env.NODE_ENV !== 'production'){
   require('electron-reload')(__dirname, {
electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
    });

   
};


let mainWindow


app.on('ready', ()=>{
   mainWindow= new BrowserWindow({});
   mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'views/index.html'),
        protocol: 'file',
        slashes: true

   }))


   const mainMenu= Menu.buildFromTemplate(templateMenu);
   Menu.setApplicationMenu(mainMenu);

   mainWindow.on('closed', ()=>{
      app.quit();
   });
   
});



function createNewProductWindow(){
   newProductWindow= new BrowserWindow({
      width: 400,
      height: 330,
      title:'Nuevo Producto'
   });
   newProductWindow.setMenu(null);
   newProductWindow.loadURL(url.format({
      pathname: path.join(__dirname,'views/add-product.html'),
      protocol: 'file',
      slashes: true

 }))

 newProductWindow.on('closed', ()=>{
   app.quit();
   });


}



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
               createNewProductWindow();
            }
         }

      ]
   }

];
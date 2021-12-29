 const getMenuFrontEnd= (role = 'USER_ROLE')=>{

     const menu = [
        {
          titulo: 'Dasboard',
          icono: 'mdi mdi-gauge',
          submenu: [
            {titulo: 'Main', Url: '/' },
            {titulo: 'ProgressBar', Url: 'progress'},
            {titulo: 'Graficas', Url: 'grafica1'},
            {titulo: 'promesas', Url: 'promesas'},
            {titulo: 'rxjs',Url:'rxjs'},
          ]
        },
        {
          titulo: 'Mantenimiento',
          icono: 'mdi mdi-folder-lock-open',
          submenu: [
         //   {titulo: 'Usuarios', Url: 'usuarios' },
            { titulo: 'Hospitales', Url: 'hospitales' },
            {titulo: 'Medicos', Url: 'medicos'},
          ]
        }
    
      ];
    
if(role === 'ADMIN_ROLE'){
    menu[1].submenu.unshift({titulo: 'Usuarios', Url: 'usuarios'})

}

return menu;
}

module.exports={
    getMenuFrontEnd
}
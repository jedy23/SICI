  function getParent(snapshot) {
  // You can get the reference (A Firebase object) from a snapshot
  // using .ref().
  var ref = snapshot.ref();
  // Now simply find the parent and return the name.
  return ref.parent().name();
  }

  //Accedemos a nuestra base de datos mediante la URL de tu app
  
  var ref = firebase.app().database().ref(); 
  
  var storage = firebase.storage();
  var path = "gs://adswsir.appspot.com/";

  //Hacemos referencia a nuestro nodo del sensor Temp
  var proyectos = ref.child("proyectID");
  var usuarios = ref.child("userID");

  var myViewModel = {
    listaProyectos : ko.observableArray([])
  }

/**  usuarios.on('child_added', snap => {
    console.log(snap.val());
  });
**/
  proyectos.on('child_added', snap => {

    snap.forEach( proyectosUsuario => {
        var aux = proyectosUsuario.val();
        console.log(proyectosUsuario.key);
        if(aux.validarComite == 1){
          var gsReference = storage.refFromURL(path + aux.URLAnMerc );
          gsReference.getDownloadURL().then( url => {
            aux.ImagenSrc = url;
            usuarios.child(snap.key).once('value', usr => {
              aux.ResponsableObj = usr.val();
              myViewModel.listaProyectos.push(aux);   
            });
          });
          
        }
        
    });

  });

  /**proyecto.on('value', function(snap) {
    proyectos = snap.val();
    snap.forEach( function(child1){
      child1.forEach( function(child2){
         myViewModel.listaProyectos.push(child2.val());
      });
    });
  });


var auxProyecto = proyectosUsuario.val();
        if(auxProyecto.Responsable){
          usuarios.child(auxProyecto.Responsable).once('value', usuario => {
            auxProyecto.ResponsableObj = usuario.val();
            myViewModel.listaProyectos.push(auxProyecto);
          });
        }  
  **/
  
  console.log(myViewModel.listaProyectos());
  ko.applyBindings(myViewModel);
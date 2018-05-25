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

 //Creado por Eduardo castro

  function notificacion() {
  //Accedemos a nuestra base de datos mediante la URL de tu app
  var db =firebase.firestore();
  //var ref = new Firebase("https://adswsir.firebaseio.com/");
  //Hacemos referencia a nuestro nodo del sensor Temp
  //var comiteRef = ref.child("validarComite");
  var proyecto = ref.child("proyectID");
  //var inver = ref.child("inverID");
  
  proyecto.on("child_added", function(snapshot, prevChildKey) {
  //recuperamos una captura del objeto leido
  var t = snapshot.val();
    //if (t.validarConfCorreo == 0) {   
      db.collection("inverID").get.then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
          console.log('${doc.Correo} => ${doc.Nombre}');
        });
      });
    //}

  });

  //  var correoRef = ref.child("Correo");
}


 //// funcion valida tiempo proyecto
 //// mendoza santos fco eder, aguilar jose carlos,miguel vicario
function validatiempo(){
 
 var stor =firebase.firestore();
 var proyec = stor.child("proyectID");
 var usuarios = stor.child("userID");
 var m= {
    listproy : ko.observableArray([])
  }
var hoy = new Date();
var dd = hoy.getDate();
var mm = hoy.getMonth()+1; 
var yyyy = hoy.getFullYear();
proyec.on('child_added', snap => {
    snap.forEach( proyectosUsuario => {
        var a = proyectosUsuario.val();
        var h = parseInt(a.fechaValComite);
        if((h+20000)>((yyyy)+(mm*10000))){
          listproy.listaProyectos.push(a);
          usr => {
              m.listproy.push(a);
              console.log(m.listproy());
            }; 
        }
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
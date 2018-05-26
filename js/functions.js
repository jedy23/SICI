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

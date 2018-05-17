var i = 0;
var k = 0;
var arrayUIDS = [];
var arrayProyects;
var cons;
var bandComite;
//var arrayDimProy;
var ref = firebase.database().ref("proyectID");

/*
ref.once("value")
  .then(function(snapshot) {
    var cantRep = snapshot.numChildren();
    console.log(cantRep);
  });
*/
/*
ref.once("value")
  .then(function(snapshot) {
    var uids = snapshot.val();
    console.log(uids);
  });
*/

ref.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      //var key = childSnapshot.key;
      //var childData = childSnapshot.val(); //<--Sirve para visalizar la base de datos en Objeto POJO
      arrayUIDS[i] = childSnapshot.key;
      console.log(arrayUIDS[i]);
      i++;
  });
  for(j = 0; j < arrayUIDS.length; j++){
    ref = firebase.database().ref("proyectID/"+arrayUIDS[j]);
    console.log("Arreglo "+j+" = "+arrayUIDS[j]);
    var l=0;
    //arrayDimProy = new Array(arrayUIDS.length);
    ref.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          arrayProyects = childSnapshot.key;
          console.log("Usr["+arrayUIDS[l]+"] Proyecto = "+arrayProyects);
          //""""""""""""""""""""""""""Área de Llenado de Formulario""""""""""""""""""""""""""""""""""""
          cons = firebase.database().ref("proyectID/"+arrayUIDS[l]+"/"+arrayProyects);
          cons.once("value")
            .then(function(snapshot) {

              nomProy = snapshot.child("NombreProyecto").val();
              descProy = snapshot.child("DescripProyecto").val();
              montSol = snapshot.child("Requerido").val();
              montRec = snapshot.child("Recaudado").val();
              montFalt = montSol - montRec;
              console.log("NombreProyecto = ["+nomProy+"]");
              console.log("DescripProyecto = ["+descProy+"]");
              console.log("MontoRequerido = ["+montSol+"]");
              console.log("MontoRecaudado = ["+montRec+"]");
              console.log("MontoRestante = ["+montFalt+"]");

              /*bandComite = snapshot.child("validarComite").val();
              console.log("bandComite = ["+bandComite+"]");
              if(bandComite == 1){
                console.log("Realiza extracción de datos");
              }
              else {
                cons.child('validarFinalizar').set(1);
                console.log("No se realiza nada");
              }*/
            });

          //"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
          /*
          arrayDimProy[l] = new Array(k);
          arrayDimProy[l][k] = childSnapshot.key;
          console.log("Usr["+arrayUIDS[l]+"] Proyecto["+l+"]["+k+"] = "+arrayDimProy[l][k]);
          k++;
          */
          });
          //k=0;
          l++;
        });
  }
});

/*
function verArray(){
  for (i = 0; i < arrayUIDS.length; i++) {
    console.log("Arreglo ["+i+"] -> "+arrayUIDS[i]+" body");
  }
}
iniArreglos();
var delayInMilliseconds = 2000; //1 second

setTimeout(function() {
  verArray();//your code to be executed after 1 second
  for (i = 0; i < arrayUIDS.length; i++) {
    for (j = 0; j < arrayDimProy.length; j++) {
      console.log("Arreglo ["+i+"]["+j+"] -> "+arrayDimProy[i][j]+" body");
    }
  }
}, delayInMilliseconds);
*/

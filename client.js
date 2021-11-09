function traerInformacionClient(){
    $.ajax({
        url: "http://localhost:8080/api/Client/all",
        headers: {
            'Access-Control-Allow-Origin': '*'
        },        
        type: "GET",
        datatype: "JSON",
        success: function(respuesta){
            console.log(respuesta);
            $("#resultadoClient").empty();
            pintarRespuestaClient(respuesta);
        }
    });
}


function pintarRespuestaClient(items){

    let myTable = "<table border=1>";
    for(i=0; i<items.length; i++) {
        let id_Client = parseInt(items[i].id);
        let name = items[i].name;
        let email = items[i].email;
        let password = items[i].password;
        let age = items[i].age;
        let mensajes = items[i].messages;
        let reservaciones = items[i].reservations;
    for (var j = 0; j<reservaciones.length; j++){
                        if (JSON.stringify(reservaciones) != "[]"){
                            //delete reservaciones[j]["idReservation"];
                            delete reservaciones[j]["Client"]["id"];
                            delete reservaciones[j]["Client"]["category"]["idcategory"];
                            
                            for (var k = 0; k<reservaciones[j]["Client"]["messages"].length; k++){
                                delete reservaciones[j]["Client"]["messages"][k]["idMessage"];
                            }
                        }else{
                            console.log(JSON.stringify(reservaciones));
                        }
                    }
                    for (var j = 0; j<mensajes.length; j++){
                        if (JSON.stringify(mensajes) != "[]"){
                            delete mensajes[j]["idMessage"];
                            delete mensajes[j]["Client"]["id"];
                            delete mensajes[j]["Client"]["category"]["idcategory"];
                        }else{
                            console.log(JSON.stringify(mensajes));
                        }
                    }


        mensajes =   JSON.stringify(mensajes);
        reservaciones =   JSON.stringify(reservaciones);
        myTable += "<tr>";
        myTable += "<td>" + name + "</td>";
        myTable += "<td>" + email+ "</td>";
        myTable += "<td>" + password+ "</td>";
        myTable += "<td>" + age + "</td>";
        myTable += "<td>" + mensajes+"</td>";
        myTable += "<td>" + reservaciones+ "</td>";
        myTable += "<td> <button onclick='borrarElementoClient(" + items[i].idClient + ")'> Borrar </button></td>";
        myTable+=  "<td> <button onclick='obtenerItemEspecificoClient("+items[i].idClient+")'>Cargar Información</button></td>";
        myTable+=  "<td> <button onclick='editarInformacionClient("+items[i].idClient+")'>Actualizar Información</button></td>";
        myTable += "</tr>";
    }

    myTable += "</table>";
    $("#resultadoClient").append(myTable);
}

function guardarInformacionClient(){
    let myData={
        name:$("#nameCl").val(),
        email:$("#emailCl").val(),
        password:$("#passwordCl").val(),
        age:$("#ageCl").val(),
    };   
    
    let dataToSend=JSON.stringify(myData);

    $.ajax({
        url:"http://localhost:8080/api/Client/save",
        type:"POST",
        data:dataToSend,
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        success:function(respuesta) {
            $("#resultadoClient").empty();
            $("#nameCl").val("");
            $("#emailCl").val("");
            $("#passwordCl").val("");
            $("#ageCl").val("");
            traerInformacionClient();
            alert("Se ha guardado.")       
        }
    });
}
function editarInformacionClient(idClient){
    let myData={
        idClient:idClient,
        name:$("#nameCl").val(),
        email:$("#emailCl").val(),
        password:$("#passwordCl").val(),
        age:$("#ageCl").val(),
    };   
    console.log("datos "+JSON.stringify(myData));
    $.ajax({
        url:"http://localhost:8080/api/Client/update",
        type:"PUT",
        data:JSON.stringify(myData),
        contentType:"application/JSON",
        dataType:"JSON",
        success:function(respuesta) {
        $("#nameCl").val(""),
        $("#emailCl").val(""),
        $("#passwordCl").val(""),
        $("#ageCl").val(""),
            $("#resultadoClient").empty();
            traerInformacionClient();
            alert("Se ha actualizado con Exito!.")
        }
    });
}

function borrarElementoClient(idElemento){
    let myData={
        idClient:idElemento
    };   
    
    let dataToSend=JSON.stringify(myData);

    $.ajax({
        url:"http://localhost:8080/api/Client/"+idElemento,
        type:"DELETE",
        datatype:"JSON",
        contentType:"application/JSON",
        success:function(respuesta) {
            $("#resultadoClient").empty();
            traerInformacionClient();
            alert("Se ha eliminado con Exito!.")        
        }
    });
}

function obtenerItemEspecificoClient(items) {
  $.ajax({
    dataType: "json",
    url: "http://localhost:8080/api/Client/"+items ,
    type: "GET",
    success: function (response) {
      
      var item = response;
        $("#nameCl").val(item.name);
        $("#emailCl").val(item.email);
        $("#passwordCl").val(item.password);
        $("#ageCl").val(item.age);
    },

    error: function (jqXHR, textStatus, errorThrown) {},
  });
}

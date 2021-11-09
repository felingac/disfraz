function traerInformacionMessage(){
    $.ajax({
        url: "http://localhost:8080/api/Message/all",
        headers: {
            'Access-Control-Allow-Origin': '*'
        },        
        type: "GET",
        datatype: "JSON",
        success: function(respuesta){
            console.log(respuesta);
            $("#resultadoMessage").empty();
            pintarRespuestaMessage(respuesta);
        }
    });
}


function pintarRespuestaMessage(items){

    let myTable = "<table border=1>";
    for(i=0; i<items.length; i++) {
        let idMessage = items[i].idMessage;
        let mensaje = items[i].messageText;
        let client = items[i].client;
        let costume = items[i].costume;

    for (i = 0; i < items.length; i++) {
                    mensaje = items[i]["messageText"];
                    costume = items[i]["costume"];
                    client = items[i]["client"];

                    if (JSON.stringify(costume) != "[]"){
                        delete costume["id"];
                        delete costume["category"]["idcategory"];
                    }else{
                        console.log(JSON.stringify(costume));
                    }
                    if (JSON.stringify(client) != "[]"){
                        //delete client["idClient"];
                        delete client["password"];
                        delete client["age"];
                    }else{
                        console.log(JSON.stringify(client));
                    }


        client =   JSON.stringify(client);
        costume =   JSON.stringify(costume);

        myTable += "<tr>";
        myTable += "<td>" + mensaje + "</td>";
        myTable += "<td>" + client+"</td>";
        myTable += "<td>" + costume+ "</td>";
        myTable += "<td> <button onclick='borrarElementoMessage(" + items[i].idMessage + ")'> Borrar </button></td>";
        myTable+=  "<td> <button onclick='obtenerItemEspecificoMessage("+items[i].idMessage+")'>Cargar Información</button></td>";
        myTable+=  "<td> <button onclick='editarInformacionMessage("+items[i].idMessage+")'>Actualizar Información</button></td>";
        myTable += "</tr>";
    }

    myTable += "</table>";
    $("#resultadoMessage").append(myTable);
}
}

function guardarInformacionMessage(){
    let myData={
        messageText:$("#messagetext").val(),
        client:{"idClient":$("#clientM").val()},
        costume:{"id":$("#costumeM").val()},
    };   
    
    let dataToSend=JSON.stringify(myData);

    $.ajax({
        url:"http://localhost:8080/api/Message/save",
        type:"POST",
        data:dataToSend,
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        success:function(respuesta) {
            $("#resultadoMessage").empty();
        $("#messagetext").val(""),
        $("#clientM").val(""),
        $("#costumeM").val(""),
            traerInformacionMessage();
            alert("Se ha guardado.")       
        }
    });
}function editarInformacionMessage(idMessage){
    let myData={
        idMessage:idMessage,
        messageText:$("#messagetext").val(),
    };   
    console.log("datos "+JSON.stringify(myData));
    $.ajax({
        url:"http://localhost:8080/api/Message/update",
        type:"PUT",
        data:JSON.stringify(myData),
        contentType:"application/JSON",
        dataType:"JSON",
        success:function(respuesta) {
        $("#messagetext").val(""),
        $("#clientM").val(""),
        $("#costumeM").val(""),

            $("#resultadoMessage").empty();
            traerInformacionMessage();
            alert("Se ha actualizado con Exito!.")
        }
    });
}

function borrarElementoMessage(idElemento){
    let myData={
        idMessage:idElemento
    };   
    
   alert(idElemento)

    $.ajax({
        url:"http://localhost:8080/api/Message/"+idElemento,
        type:"DELETE",
        
        datatype:"JSON",
        success:function(respuesta) {
            $("#resultadoMessage").empty();
            traerInformacionMessage();
            alert("Se ha eliminado con Exito!.")        
        }
    });
}

function obtenerItemEspecificoMessage(items) {
  $.ajax({
    dataType: "json",
    url: "http://localhost:8080/api/Message/"+items ,
    type: "GET",
    success: function (response) {
      
      var item = response;     
        $("#messagetext").val(item.messageText); 
        $("#clientM").val(item.client.idClient);
        $("#costumeM").val(item.costume.id);  
    },

    error: function (jqXHR, textStatus, errorThrown) {},
  });
}

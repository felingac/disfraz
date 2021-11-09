function traerInformacionCategory(){
    $.ajax({
        url: "http://132.226.165.231:8080/api/Category/all",
        headers: {
            'Access-Control-Allow-Origin': '*'
        },        
        type: "GET",
        datatype: "JSON",
        success: function(respuesta){
            console.log(respuesta);
            $("#resultadoCategory").empty();
            pintarRespuestaCategory(respuesta);

        }
    });
}


function pintarRespuestaCategory(items){

   let myTable = "<table border='1'><th>Nombre</th><th>Descripcíon</th><th>Disfraz</th><th>Acciones</th>";
    for(i=0; i<items.length; i++) { 
        let id_Category = parseInt(items[i].id);
        let name = items[i]["name"];
        let description = items[i]["description"];
        let costume = items[i]["costumes"];
        for (var j = 0; j<costume.length;  j++){
                        if (JSON.stringify(costume) != "[]"){
                            delete costume[j]["idcostume"];
                           // delete costume[j]["category"]["idCategory"];
                            for (var k = 0; k < costume[j]["reservations"].length;  k++){
                                //delete costume[j]["reservations"][k]["idReservation"]
                                //delete costume[j]["reservations"][k]["client"]["idClient"];
                                delete costume[j]["reservations"][k]["client"]["password"];
                                delete costume[j]["reservations"][k]["client"]["age"];
                            }
                            for (var k = 0; k<costume[j]["messages"].length;  k++){
                                delete costume[j]["messages"][k]["idMessage"];
                            }
                        }
                    }

        costume =   JSON.stringify(costume);  
        myTable += "<tr>";
        myTable += "<td>" + name + "</td>";
        myTable += "<td>" + description + "</td>";
        myTable += "<td>" + costume+ "</td>";
        myTable += "<td> <button onclick='borrarElementoCategory(" + items[i].id + ")'> Borrar </button><button onclick='obtenerItemEspecificoCategory("+items[i].id+")'>Cargar Información</button><button onclick='editarInformacionCategory("+items[i].id+")'>Actualizar Información</button></td>";
        myTable += "</tr>";
    }

    myTable += "</table>";
    $("#resultadoCategory").append(myTable);
}

function guardarInformacionCategory(){
    let myData={
       id:$("#id").val(),
       name:$("#name").val(),
       description:$("#description").val()

    };   
    
    let dataToSend=JSON.stringify(myData);

    $.ajax({
        url:"http://132.226.165.231:8080/api/Category/save",
        type:"POST",
        data:dataToSend,
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        success:function(respuesta) {
            $("#resultadoCategory").empty();
            $("#name").val("");
            $("#description").val("");
            $("#costume").val("");
            traerInformacionCategory();
            alert("Se ha guardado.")        
        }
    });
}
function editarInformacionCategory(id){
    let myData={
        id:id,
       name: $("#name").val(),
       description:$("#description").val()
            
    };   
    
    let dataToSend=JSON.stringify(myData);

    $.ajax({
        url:"http://132.226.165.231:8080/api/Category/update",
        type:"PUT",
        data:JSON.stringify(myData),
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta) {
            $("#name").val("");
            $("#description").val("");
            $("#costume").val("");
            $("#resultadoCategory").empty();
            traerInformacionCategory();
            alert("Se ha actualizado con Exito!.")        
        }
    });
}

function borrarElementoCategory(idElemento){

    $.ajax({
        url:"http://132.226.165.231:8080/api/Category/"+idElemento,
        type:"DELETE",
        datatype:"JSON",
        success:function(respuesta) {
            $("#resultadoCategory").empty();
            traerInformacionCategory();
            alert("Se ha eliminado con Exito!.")        
        }
    });
}

function obtenerItemEspecificoCategory(items) {
  $.ajax({
    dataType: "json",
    url: "http://132.226.165.231:8080/api/Category/"+items,
    type: "GET",
    success: function (response) {
      console.log("---- obtenerItemEspecificoCategory", response);
      var item = response;
        $("#id").val(item.id);
        $("#name").val(item.name);;
        $("#description").val(item.description);
    },

    error: function (jqXHR, textStatus, errorThrown) {},
  });
}  

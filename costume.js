function traerInformacionCostume(){
    $.ajax({
        url: "http://localhost:8080/api/Costume/all",
        headers: {
            'Access-Control-Allow-Origin': '*'
        },        
        type: "GET",
        datatype: "JSON",
        success: function(respuesta){
            console.log(respuesta);
            $("#resultadocostume").empty();
            pintarRespuestaCostume(respuesta);
        }
    });
}

function pintarRespuestaCostume(items){

    let myTable = "<table border=1>";
    for(i=0; i<items.length; i++) {
        let id_Costume = parseInt(items[i].id);
        let name = items[i].name;
        let brand = items[i].brand;
        let year = items[i].year;
        let description = items[i].description;
        let category = items[i].category;
        let mensajes = items[i].messages;
        let reservaciones = items[i].reservations;


        for (var k = 0;  k<reservaciones.length;  k++){
                        if (JSON.stringify(reservaciones) != "[]"){
                            //delete reservaciones[k]["idReservation"];
                            //delete reservaciones[k]["client"]["idClient"];
                            delete reservaciones[k]["client"]["password"];
                            delete reservaciones[k]["client"]["age"];
                        }else{
                            console.log(JSON.stringify(reservaciones));
                        }
                    }
                    for (var j = 0;  j<mensajes.length;  j++){
                        if (JSON.stringify(mensajes) != "[]"){
                            delete mensajes[j]["idMessage"]
                        }else{
                            console.log(JSON.stringify(mensajes));
                        }
                    }
                    if (JSON.stringify(category) != "[]"){
                        delete category["idCategory"]
                    }
        category =   JSON.stringify(category); 
        mensajes =   JSON.stringify(mensajes);
        reservaciones =   JSON.stringify(reservaciones);
        myTable += "<tr>";
        myTable += "<td>" + name + "</td>";
        myTable += "<td>" + brand + "</td>";
        myTable += "<td>" + year + "</td>";
        myTable += "<td>" + description+ "</td>";
        myTable += "<td>" + category+ "</td>";
        myTable += "<td>" + mensajes+"</td>";
        myTable += "<td>" + reservaciones+ "</td>";
        myTable += "<td> <button onclick='borrarElementoCostume(" + items[i].id + ")'>Borrar </button></td>";
        myTable+=  "<td> <button onclick='obtenerItemEspecificoCostume("+items[i].id+")'>Cargar Información</button></td>";
        myTable+=  "<td> <button onclick='editarInformacionCostume("+items[i].id+")'>Actualizar Información</button></td>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultadocostume").append(myTable);
}

function guardarInformacionCostume(){
    let myData={
        name:$("#nameH").val(),
        category:{"id":$("#categoryH").val()},
        brand:$("#brandH").val(),
        year:$("#yearH").val(),
        description:$("#descriptionH").val()
    };   
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Costume/save",
        type:"POST",
        data:dataToSend,
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        success:function(respuesta) {
            $("#resultadoroom").empty();
            $("#nameH").val("");
            $("#yearH").val("");
            $("#categoryH").val("");
            $("#brandH").val("");
            $("#descriptionH").val("");
            traerInformacionCostume();
            alert("Se ha guardado.")       
        }
    });
}
function editarInformacionCostume(idH){
    let myData={
        id:idH,
        name:$("#nameH").val(),
        brand:$("#brandH").val(),
        year:$("#yearH").val(),
        description:$("#descriptionH").val()
    };   
    console.log("datos "+JSON.stringify(myData));
    $.ajax({
        url:"http://localhost:8080/api/Costume/update",
        type:"PUT",
        data:JSON.stringify(myData),
        contentType:"application/JSON",
        dataType:"JSON",
        success:function(respuesta) {
        $("#nameH").val(""),
        $("#brandH").val(""),
        $("#yearH").val(""),
        $("#descriptionH").val("")
        $("#resultadocostume").empty();
            traerInformacionCostume();
            alert("Se ha actualizado con Exito!.")
        }
    });
}

function borrarElementoCostume(idElemento){
    let myData={
        id:idElemento
    };   
    
    let dataToSend=JSON.stringify(myData);

    $.ajax({
        url:"http://localhost:8080/api/Costume/"+idElemento,
        type:"DELETE",
        datatype:"JSON",
        contentType:"application/JSON",
        success:function(respuesta) {
            $("#resultadocostume").empty();
            traerInformacionCostume();
            alert("Se ha eliminado con Exito!.")        
        }
    });
}

function obtenerItemEspecificoCostume(items) {
    console.log("---- obtenerItemEspecificoCostume items:", items);
  $.ajax({
    dataType: "json",
    url: "http://localhost:8080/api/Costume/"+items ,
    type: "GET",
    success: function (response) {
      
      var item = response;
      console.log("---- obtenerItemEspecificoCostume", item);
     
        $("#nameH").val(item.name);
        $("#yearH").val(item.year);
        $("#categoryH").val(item.category.id);
        $("#brandH").val(item.brand);
        $("#descriptionH").val(item.description);  
      
    },

    error: function (jqXHR, textStatus, errorThrown) {},
  });
}

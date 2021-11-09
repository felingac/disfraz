function traerInformacionReservation(){
    $.ajax({
        url: "http://localhost:8080/api/Reservation/all",
        headers: {
            'Access-Control-Allow-Origin': '*'
        },        
        type: "GET",
        datatype: "JSON",
        success: function(respuesta){
            console.log(respuesta);
            $("#resultadoReservation").empty();
            pintarRespuestaReservation(respuesta);

        }
    });
}


function pintarRespuestaReservation(items){

    let myTable = "<table border=1>";
    for(i=0; i<items.length; i++) { 
        let id_Reservation = parseInt(items[i].idReservation);
        let startDate = items[i].startDate;
        let devolutionDate = items[i].devolutionDate;
        let status = items[i].status;
        let client = items[i].client
        let costume = items[i].costume;
        let score = items[i].score ;
        
        if (JSON.stringify(costume) != "[]"){
                        delete costume["idcostume"];
                        delete costume["category"]["idCategory"];
                    }else{
                        console.log(JSON.stringify(costume));
                    }
                    if (JSON.stringify(client) != "[]"){
                        //delete client["idClient"];
                        delete client["password"];
                        delete client["age"];
                    }else{
                        console.log(JSON.stringify(costume));
                    }

                    for (var j = 0; j<costume["messages"].length;  j++){
                        delete costume["messages"][j]["idMessage"];
                    }
        costume =   JSON.stringify(costume); 
        client =   JSON.stringify(client);        

        myTable += "<tr>";
        myTable += "<td>" + startDate + "</td>";
        myTable += "<td>" + devolutionDate + "</td>";
        myTable += "<td>" + status+ "</td>";
        myTable += "<td>" + client+ "</td>";
        myTable += "<td>" + costume+ "</td>";
        myTable += "<td>" + score+ "</td>";
        myTable += "<td> <button onclick='borrarElementoReservation(" + items[i].idReservation + ")'> Borrar </button></td>";
        myTable+=  "<td> <button onclick='editarInformacionReservation("+items[i].idReservation+")'>Actualizar Información</button></td>";
        myTable += "</tr>";
    }

    myTable += "</table>";
    $("#resultadoReservation").append(myTable);
}

function guardarInformacionReservation(){
    let myData={
        "startDate":$("#startDate").val(),
        "devolutionDate":$("#devolutionDate").val(),
        "client":{"idClient":parseInt($("#clientR").val())},//
        "costume":{"id":$("#costumeR").val()}//
    };   
    
    let dataToSend=JSON.stringify(myData);

    $.ajax({
        url:"http://localhost:8080/api/Reservation/save",
        type:"POST",
        data:dataToSend,
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        success:function(respuesta) {
            $("#resultadoReservation").empty();
            $("#clientR").val("");
            $("#startDate").val("");
            $("#devolutionDate").val("");
            $("#costumeR").val("");
            traerInformacionReservation();
            alert("Se ha guardado.")        
        }
    });
}

function editarInformacionReservation(idReservation){
    let myData={
        idReservation:idReservation,
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val()
    };   
    
    let dataToSend=JSON.stringify(myData);

    $.ajax({
        url:"http://localhost:8080/api/Reservation/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta) {
            $("#resultadoReservation").empty();
            $("#clientR").val("");
            $("#startDate").val("");
            $("#devolutionDate").val("");
            $("#costumeR").val("");
            traerInformacionReservation();
            alert("Se ha actualizado.")        
        }
    });
}

function borrarElementoReservation(idElemento){
    let myData={
        idReservation:idElemento
    };   
    
    let dataToSend=JSON.stringify(myData);

    $.ajax({
        url:"http://localhost:8080/api/Reservation/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta) {
            $("#resultadoReservation").empty();
            traerInformacionReservation();
            alert("Se ha eliminado.")        
        }
    });
}



function init(){
	document.getElementById("btquit").addEventListener("click",cerrar_pantalla_principal,false);
	document.getElementById("btguardar").addEventListener("click",guardar,false);
	document.getElementById("btnueva").addEventListener("click",clear_view,false);
	document.getElementById("btdelete").addEventListener("click",borrar,false);
	//document.getElementById("btccateno").addEventListener("click",getmenulist,false);
	// configurando las variables de estado.
	gckeyid   = "capano";
	gckeydesc = "cfullname";
	gcbtkeyid = "btcapano";
	// ------------------------------------------------------------------------
	// CODIGO PARA LOS MENUS INTERACTIVOS.
	// CADA MENU
	document.getElementById("capano").addEventListener("change",valid_ckeyid,false);
	document.getElementById("btcapano").addEventListener("click",function(){
        get_menu_list("arapam","showmenulist","capano","valid_ckeyid");
    },false);
    // id del articulo a adicionar en la lista.
	document.getElementById("cservno1").addEventListener("change",add_row_item,false);
	document.getElementById("btcservno1").addEventListener("click",function(){
        get_menu_list("arserm","showmenulist","cservno1","add_row_item");
    },false);
    // listado de vendedores.
    document.getElementById("btcrespno").addEventListener("click",function(){
        get_menu_list("arresp","showmenulist","crespno","valid_ckeyid");
    },false);
	document.getElementById("namount").addEventListener("change",add_row_pay,false);
}
function clear_view(){
	get_clear_view();
	document.getElementById("table_detalle_pagos").innerHTML="";
	document.getElementById("detalle_item").innerHTML="";
}

function set_view(e){
	oAccionName = e.target.id;

	lcvalue = document.getElementById(oAccionName).value;
	if (lcvalue == "C"){
		document.getElementById("arapam_c").style.display="none";
		document.getElementById(oAccionName).value = "M";
		document.getElementById("arapam").style.display="inline-block";
	}else{
		document.getElementById("arapam_c").style.display="inline-block";
		document.getElementById("arapam").style.display="none";
		document.getElementById(oAccionName).value = "C";
	}
}

function deleteRow(row){
	var d = row.parentNode.parentNode.rowIndex;
	document.getElementById('detalle_item').deleteRow(d);
	cksum();
}

function deleteRowpay(row){
	var d = row.parentNode.parentNode.rowIndex;
	document.getElementById('detaslle_pagos').deleteRow(d);
	cksum();
}
// adiciona una linea en el detalle de articulos
function add_row_item(){
	// validaciones standar previas.
	if (document.getElementById("cservno1").value ==""){
		return ;
	}
	// ---------------------------------------------------------------------------------------------------------
	// a)- Verificando que el articulo exista.
	// ---------------------------------------------------------------------------------------------------------
	// haciendo request que devuelva el contenido de la fila en formato JSON.
	var oRequest = new XMLHttpRequest();
	// Creando objeto para empaquetado de datos.
	var oDatos   = new FormData();
	// adicionando datos en formato CLAVE/VALOR en el objeto datos para enviar como parametro a la consulta AJAX
	oDatos.append("accion","JSON");
	oDatos.append("cservno",document.getElementById("cservno1").value);
	// enviando el request.
	oRequest.open("POST","../modelo/crud_arserm.php",false); 
	oRequest.send(oDatos);
	// recibiendo el json.
	var odata = JSON.parse(oRequest.response); 
	// mostrando pantalla de edicion de archivo
	if (odata == null){
		getmsgalert("Codigo de Articulo No registrado");
		return;
	}	
	
	// ---------------------------------------------------------------------------------------------------------
	// b)- insertando el articulo en el detalle de la tabla 
	// ---------------------------------------------------------------------------------------------------------
	var otabla = document.getElementById("detalle_item");
	
	// oninput='valid_ndesc('"+ odata.cservno + "')'
	var oRow = "";
	oRow  = "<tr class='grid_detail'>";
	oRow += 	"<td style='width:70px' name='cservno' >" + odata.cservno       + "</td>";
	oRow += 	"<td style='width:150px'name='cdescservno'>" + odata.cdesc.trim(); + "</td>";
	oRow += 	"<td><input type='number' style='width:60px' name='nprice' id='nprice' value="+ odata.nprice +"></td>";
	oRow += 	"<td><input type='number' style='width:60px' name='nqty'   id='nqty'   value=1></td>";
	oRow += 	"<td><img src='../photos/escoba.ico' id='btquitar' class='botones_row'  onclick='deleteRow(this)' title='Eliminar Registro'/></td>";
	oRow += "</tr>";
 	otabla.insertRow(-1).innerHTML = oRow;
	cservno1.value = "";

	// ---------------------------------------------------------------------------------------------------------
	// c)- configurando detalle para que responda a eventos.
	// ---------------------------------------------------------------------------------------------------------
	set_validation_table();
	cksum();
}

function add_row_pay(){
	var otabla = document.getElementById("table_detalle_pagos");
	var lnamount = document.getElementById("namount").value;
	if (lnamount == ""){
		return ;
	}
	let date = new Date();
	let odate = date.toISOString().split('T')[0];
	var oRow = "";
	oRow  = "<tr class='grid_detail'>";
	oRow += 	"<td style='width:70px' name='dpay'>" +   odate    + "</td>";
	oRow += 	"<td style='width:85px' name='npayamt'>" +parseFloat(lnamount).toFixed(2) + "</td>";
	oRow += 	"<td><img src='../photos/escoba.ico' id='btquitar' class='botones_row'  onclick='deleteRowpay(this)' title='Eliminar Registro'/></td>";
	oRow += "</tr>";
 	otabla.insertRow(-1).innerHTML = oRow;
	document.getElementById("namount").value = "";

	// ---------------------------------------------------------------------------------------------------------
	// c)- configurando detalle para que responda a eventos.
	// ---------------------------------------------------------------------------------------------------------
	cksum();
}

function cksum(){
	var otabla     = document.getElementById("table_detalles");
	var otabla_pay = document.getElementById("table_detalle_pagos");
	var lnsalesamt = 0, lnpayamt = 0;

	var lnveces = otabla.rows.length ;
	
	for (var i = 0; i < lnveces; ++i){
		lnsalesamt += parseFloat(otabla.rows[i].cells[3].children["nqty"].value) * parseFloat(otabla.rows[i].cells[2].children["nprice"].value);
	}

	var lnveces = otabla_pay.rows.length ;

	for (var i = 0; i < lnveces; ++i){
		lnpayamt += parseFloat(otabla_pay.rows[0].cells[1].innerHTML);
	}
	// cargando los valores del total.
	document.getElementById("npayamt").value  = parseFloat(lnpayamt).toFixed(2);
	document.getElementById("nsalesamt").value  = parseFloat(lnsalesamt).toFixed(2);
	document.getElementById("nbalance").value  = parseFloat(lnsalesamt - lnpayamt).toFixed(2);
}

function set_validation_table(){
	var oinput1 = document.querySelectorAll("#nqty");
	var oinput2 = document.querySelectorAll("#nprice");
	for (var i=0; i<oinput1.length; i++){
		// poniendo a la escucha del evento ONCHANGE cada objeto
		oinput1[i].onchange = cksum;
		oinput2[i].onchange = cksum;
	}
}
// cerrar pantalla principal
function cerrar_pantalla_principal(){
	document.getElementById("arapam").style.display="none";
}
// guardar registro principal
function guardar(){
	// validaciones de campos obligatorios.
	if(document.getElementById("capano").value ==""){
		getmsgalert("Falta Id del apartado");
		return ;
	}
	if(document.getElementById("cfullname").value ==""){
		getmsgalert("Falta Nombre del Cliente");
		return ;
	}
	if(document.getElementById("ctel").value ==""){
		getmsgalert("Falta Numero de telefono");
		return ;
	}
	if(document.getElementById("dstar").value == "" ||
	   document.getElementById("dend").value == ""){
		getmsgalert("Debe indicar 2 fechas, inicio y final del apartado");
		return;
	}

	// verificando si hay detalle de articulos y pagos.
	var otablaitem   = document.getElementById("table_detalles");
	var lnrows_items = otablaitem.rows.length ;

	var otablapay  = document.getElementById("table_detalle_pagos");
	var lnrows_pay = otablapay.rows.length ;
	let odata = "";
	var lnveces = 1;

	// enviando encabezado

	odata += '{"capano":"'   + document.getElementById("capano").value  	+ '",';
	odata += '"cfullname":"' + document.getElementById("cfullname").value  	+ '",';
	odata += ' "ctel":"'      + document.getElementById("ctel").value   	+ '",';
	odata += ' "dstar":"'     + document.getElementById("dstar").value  + '",';
	odata += ' "dend":"'      + document.getElementById("dend").value   + '",';
	odata += ' "cstatus":"'   + document.getElementById("cstatus").value   	+ '",';
	odata += ' "crespno":"'   + document.getElementById("crespno").value   	+ '",';
//	odata += ' "mnotas":"'    + document.getElementById("mnotas").value   	+ '",';
	odata += ' "articulos":[' ;
	// recorriendo la tablas en busca de articulos y abono.
	for (var i = 0; i<lnrows_items; ++i){
		// obteniendo valor de celdas en cada fila
		lcservno = otablaitem.rows[i].cells[0].innerHTML; // otabla.rows[i].cells[0].innerText;
		lcdesc   = otablaitem.rows[i].cells[1].innerHTML; // otabla.rows[i].cells[0].innerText;
		lnprice  = parseFloat(otablaitem.rows[i].cells[2].children["nprice"].value);
		lnqty    = parseFloat(otablaitem.rows[i].cells[3].children["nqty"].value);
		// si es la primera vez
		if (lnveces == 1){
			odata += '{"cservno":"' + lcservno + '","cdesc":"' + lcdesc + '","nprice":' + lnprice + ',"nqty":' + lnqty +  '}' ;
			lnveces = 2;
		}else{
			odata += ',{"cservno":"' + lcservno + '","cdesc":"' + lcdesc + '","nprice":' + lnprice + ',"nqty":' + lnqty +  '}' ;
		} // if (lnveces == 1){
	} // for (var i = 1; i<lnrows; ++i){
	odata += '],' ;
	odata += ' "pagos":[' ;
	lnveces = 1;
	// recorriendo la tablas en busca de articulos y abono.
	for (var i = 0; i<lnrows_pay; ++i){
		// obteniendo valor de celdas en cada fila
		ldtrndate = otablapay.rows[i].cells[0].innerHTML; // otabla.rows[i].cells[0].innerText;
		lnpayamt  = otablapay.rows[i].cells[1].innerHTML; // otabla.rows[i].cells[0].innerText;
		// si es la primera vez
		if (lnveces == 1){
			odata += '{"dtrndate":"' + ldtrndate + '","npayamt":' + lnpayamt + '}' ;
			lnveces = 2;
		}else{
			odata += ',{"dtrndate":"' + ldtrndate + '","npayamt":' + lnpayamt + '}' ;
		} // if (lnveces == 1){
	} 
	// ultima linea del json.
	odata += ']}' ;
		
	// codigo request para enviar al crud de php
	var oRequest = new XMLHttpRequest();
	// Creando objeto para empaquetado de datos.
	var oDatos   = new FormData();
	// adicionando datos en formato CLAVE/VALOR en el objeto datos para enviar como parametro a la consulta AJAX
	oDatos.append("mnotas",document.getElementById("mnotas").value);
	oDatos.append("json",odata);
	oDatos.append("accion","NEW");
	oRequest.open("POST","../modelo/crud_arapam.php",false); 
	oRequest.send(oDatos);

	clear_view();

}
// borrando registro principal
function borrar(){
	var xkeyid = document.getElementById("capano").value;
	if(xkeyid != ""){
		if (!confirm("Esta seguro de borrar este registro")){
			return ;
		}
		var oRequest = new XMLHttpRequest();
		// Creando objeto para empaquetado de datos.
		var oDatos   = new FormData();
		// adicionando datos en formato CLAVE/VALOR en el objeto datos para enviar como parametro a la consulta AJAX
		oDatos.append("capano",xkeyid);
		oDatos.append("accion","DELETE");
		// obteniendo el menu
		oRequest.open("POST","../modelo/crud_arapam.php",false); 
		oRequest.send(oDatos);
		clear_view();
	}else{
		getmsgalert("No ha indicado un codigo para borrar");
	}
}
function valid_ckeyid(){
	var lcxkeyvalue = document.getElementById("capano").value;
	if(lcxkeyvalue != ""){
		update_window(lcxkeyvalue,"btcapano");
	}
}
function update_window(pckeyid){
	// --------------------------------------------------------------------------------------
	// Con esta funcion se hace una peticion al servidor para obtener un JSON, con los 
	// datos de la persona un solo objeto json que sera el cliente.
	// --------------------------------------------------------------------------------------
	var oRequest = new XMLHttpRequest();
	// Creando objeto para empaquetado de datos.
	var oDatos   = new FormData();
	// adicionando datos en formato CLAVE/VALOR en el objeto datos para enviar como parametro a la consulta AJAX
	oDatos.append("capano",pckeyid);
	oDatos.append("accion","JSON");
	// obteniendo el menu
	oRequest.open("POST","../modelo/crud_arapam.php",false); 
	oRequest.send(oDatos);
	// desplegando pantalla de menu con su informacion.
	var odata = JSON.parse(oRequest.response);
	//cargando los valores de la pantalla.
	if (odata != null){
		document.getElementById("capano").value    = odata.capano;
		document.getElementById("cfullname").value = odata.cfullname;
		document.getElementById("cstatus").value   = odata.cstatus;
		document.getElementById("dstar").value     = odata.dstar;
		document.getElementById("dend").value      = odata.dend;
		document.getElementById("ctel").value      = odata.ctel;
		document.getElementById("mnotas").value    = odata.mnotas;
		document.getElementById("crespno").value   = odata.crespno;
		// ACTUALIZANDO DETALLE DE ARTICULOS
		var lnqtyitem = odata.articulos.length;
		var lnqtypay   = odata.pagos.length;
		var oRow     = "";
		var otabla_items = document.getElementById("detalle_item");
		var otabla_pagos = document.getElementById("table_detalle_pagos");
		// procesando los articulos.
		for(y=1; y <= lnqtyitem; y++ ){
			i = y-1;
			// oninput='valid_ndesc('"+ odata.cservno + "')'
			oRow  = "<tr class='grid_detail'>";
			oRow += 	"<td style='width:70px' name='cservno' >" + odata.articulos[i].cservno  + "</td>";
			oRow += 	"<td style='width:150px'name='cdescservno'>" + odata.articulos[i].cdesc + "</td>";
			oRow += 	"<td><input type='number' style='width:60px' name='nprice' id='nprice' value=" + odata.articulos[i].nprice + "></td>";
			oRow += 	"<td><input type='number' style='width:60px' name='nqty'   id='nqty'   value=" + odata.articulos[i].nqty   + "></td>";
			//oRow += 	"<td><img src='../photos/escoba.ico' id='btquitar' class='botones_row'  onclick='deleteRow(this)' title='Eliminar Registro'/></td>";
			oRow += "</tr>";
			otabla_items.insertRow(-1).innerHTML = oRow;
		}
		// ACTUALIZANDO DETALLE DE PAGOS.
		for(y=1; y <= lnqtypay; y++ ){
			i= y-1;
			oRow  = "<tr class='grid_detail'>";
			oRow += 	"<td style='width:70px' name='dpay'>"    + odata.pagos[i].dtrndate + "</td>";
			oRow += 	"<td style='width:85px' name='npayamt'>" + odata.pagos[i].npayamt  + "</td>";
			//oRow += 	"<td><img src='../photos/escoba.ico' id='btquitar' class='botones_row'  onclick='deleteRowpay(this)' title='Eliminar Registro'/></td>";
			oRow += "</tr>";
			otabla_pagos.insertRow(-1).innerHTML = oRow;
		}
		cksum();
		estado_key("I");
	}else{
		ck_new_key();
	}
}
window.onload=init;
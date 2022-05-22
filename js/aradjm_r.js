var xMenuId = "";
function init(){
	document.getElementById("btquit").addEventListener("click",cerrar_pantalla,false);
	document.getElementById("btprint").addEventListener("click",print,false);
	document.getElementById("btnueva").addEventListener("click",nueva,false);
	// ------------------------------------------------------------------------
	// CODIGO PARA LOS MENUS INTERACTIVOS.
	// CADA MENU
	// clientes
	
	document.getElementById("btcadjno").addEventListener("click",function(){
        get_menu_list("ARADJM","showmenulist","cadjno");
    },false);
}
function nueva(){
	var objects = document.querySelectorAll("input");
	var olista = document.querySelectorAll("select");
	for (var i=0; i<objects.length; i++){
		objects[i].value = "";
	}
	
	// setiando los selects
	for (var i= 0; i<olista.length; i++){
		olista[i].value = "''";
	}
	
	
}
function cerrar_pantalla(){
	document.getElementById("aradjm_r").style.display="none";
}
function print(){
 document.getElementById("aradjm_r").submit();
}
// ----------------------------------------------------------------------

window.onload=init;
<html>
	<head>
		<title>Formato de Requisa</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" href="../css/vc_estilos.css"> 
		<link rel="stylesheet" href="../css/aradjm_r.css"> 
 		<script src="../js/vc_funciones.js"></script> 
 		<script src="../js/aradjm_r.js"></script> 
	</head>
	<body>
		<form target="_blank" method="POST" action="../reports/rpt_aradjm.php" id="aradjm_r" name="aradjm_r" class= "form2">
			<script> get_barraprint("Reimpresion de Requisas","Ayuda Formulario de Requisa.");</script>
    		<br>
			<fieldset id="area_filtros" class="fieldset">
					<label class = "labelfiltro">Requisa No</label>
					<input type="text" id="cadjno" name="cadjno" class="ckey">
					<script>get_btmenu("btcadjno","Lista de requisas"); </script>				
			</fieldset>
		</form>
		<div id="showmenulist"></div>			
		<script>get_msg();</script>
	</body>
</html>
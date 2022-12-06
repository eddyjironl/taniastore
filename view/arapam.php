<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="../css/vc_estilos.css?v1">
		<script src="../js/arapam.js?v1"></script>
		<script src="../js/vc_funciones.js?v1"></script>
    <title>Apartados</title>
  <body>
    <script>get_msg();</script>
		<div id="showmenulist"></div>

      <form name="arapam" id="arapam" class="form2" action="../modelo/crud_arapam.php?accion=NEW" method="post">
        <SCRIPT>get_barraprinc_x("Modulo de Apartados","Ayuda Modulo de Apartados",900);</SCRIPT> 
        <!-- Detalle General de los articulos -->
        <div class="contenedor_objetos" style="float:left;">
          <label class="labelnormal" >Apartado Id</label>
					<input type="text" class="textkey" id="capano" name="capano"  autocomplete="off" autofocus>
					<script>get_btmenu("btcapano","Listado de Apartados");</script>
          <br>
          <label class="labelnormal" >Nombre </label>
					<input type="text" id="cfullname" name="cfullname" class="textcdesc">
					<br>
					<label class="labelnormal" >Telefono </label>
					<input type="text" id="ctel" name="ctel" class="textkey">
					<br>
					<label class="labelnormal" >Inicio Apartado</label>
					<input type="date" id="dstar" name="dstar" class="textdate">
					<br>
					<label class="labelnormal" >Fin Apartado</label>
					<input type="date" id="dend" name="dend" class="textdate">
          <br>
          <label class="labelnormal" >Estado</label>
          <select class="listas" id="cstatus" name="cstatus">
              <option value="OP">Activa</option>
              <option value="CL">Entregada</option>
          </select>
					<br>
          <label class="labelnormal" >Vendedor</label>
					<input type="text" id="crespno" name="crespno" class="textkey">
          <script>get_btmenu("btcrespno","Listado de Proveedores");</script>
          <br>
          <label class="labelsencilla">Comentarios Generales</label><br>
					<textarea id="mnotas" name="mnotas" class="mnotas" rows=4 cols=50> </textarea>

        </div>   

        <div class="contenedor_objetos" style="float:left;">
            <label class="labelnormal"> Monto del Apartado </label>  
            <input type="number" id="nsalesamt" class="saykey">
            <br>
            <label class="labelnormal"> Monto Pagado </label>  
            <input type="number" id="npayamt" class="saykey">
            <br>
            <label class="labelnormal"> Saldo Actual </label>  
            <input type="number" id="nbalance" class="saykey">
        </div>
        <br>

        <div class="contenedor_objetos" style="float:left;">

            <label class="labelsencilla">Detalle de Articulos </label>
            <br>
            <label class="labelnormal">Articulo Id </label>
            <input type="text" class="textkey" id="cservno1" >
            <script>get_btmenu("btcservno1","Listado de Articulos");</script>
         
            <div class="contenedor_obj">
              <table> 
                <thead>
                  <tr class="grid_header">
                    <th style='width:70px;' >Codigo</th>
                    <th style='width:150px;'>Descripcion</th>
                    <th style='width:70px;' >Precio</th>
                    <th style='width:70px;' >Cantidad</th>
                    <th'></th>
                  </tr>
                </thead>
              </table>
            </div>  

            <div class="grid_area_detalles" style="height: 100px;">
                <table id="table_detalles">
                  <tbody id="detalle_item"></tbody>
                </table>
            </div>
        </div>

        <div class="contenedor_objetos" style="float:left;">
          <label class="labelsencilla">Detalle de Pagos </label>
          <br>
          <label class="labelnormal">Abono Recibido </label>
          <input type="number" class="textqty" id="namount">
          <br>
   
          <div class="contenedor_obj">
            <table>
              <thead>
                <tr class="grid_header">
                    <td width="70px">Fecha</td>
                    <td width="85px">Monto Pagado</td>
                </tr>
              </thead>
            </table>
          </div>
   
          <div class="grid_area_detalles" style="height: 100px;">
            <table id="table_detalle_pagos" >
              <tbody id="detaslle_pagos"></tbody>
            </table>
          </div>
        </div>

      </form>
    </body>
</html>
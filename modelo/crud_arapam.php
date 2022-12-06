<?php
// ------------------------------------------------------------------------------------------------
// Descripcion.
// 	Definiendo funciones que se realizaran .
//	$lcaccion = isset($_POST["accion"])? $_POST["accion"],$_GET["accion"];
// ------------------------------------------------------------------------------------------------
include("../modelo/armodule.php");
include("../modelo/vc_funciones.php");
$oConn = vc_funciones::get_coneccion("CIA");


if(isset($_POST["accion"])){
	$lcaccion = $_POST["accion"]; 	
}else{
	$lcaccion = $_GET["accion"]; 	
}
// codigo del apartado
if (isset($_POST["capano"])){
	$lcapano = mysqli_real_escape_string($oConn,$_POST["capano"]);
}

// ------------------------------------------------------------------------------------------------
// BORRAR DATOS.
// ------------------------------------------------------------------------------------------------
if($lcaccion=="DELETE"){
	$lcsqlcmd = "delete from arapam where capano ='$lcapano';
	            delete from arapad where capano ='$lcapano';
				delete from arapap where capano ='$lcapano'";
				
	mysqli_multi_query($oConn,$lcsqlcmd);
}
// ------------------------------------------------------------------------------------------------
// INSERT / UPDATE, guardando datos existentes o nuevos.
// -----------------------------------------------------------------------------------------------
if($lcaccion == "NEW"){
	// recibiendo el JSON
	$json = $_POST["json"];
	$oAjt = json_decode($json,true);
	$lcapano    = mysqli_real_escape_string($oConn,$oAjt["capano"]);
	$lcfullname = mysqli_real_escape_string($oConn,$oAjt["cfullname"]);
	$lctel      = mysqli_real_escape_string($oConn,$oAjt["ctel"]);
	$ldstar     = (empty($oAjt["dstar"]))?"0000-00-00":$oAjt["dstar"];
	$ldend      = (empty($oAjt["dend"])) ?"0000-00-00":$oAjt["dend"];
	$lcstatus   = mysqli_real_escape_string($oConn,$oAjt["cstatus"]);
	$lcrespno   = mysqli_real_escape_string($oConn,$oAjt["crespno"]);
	$lmnotas    = mysqli_real_escape_string($oConn,$_POST["mnotas"]);

	$ldtrndate  = date("Y-m-d");
	// configuracion de los saldos de factura.
	// -------------------------------------------------------------------------------------------------------
	// A)- Cargando el detalle de factura.
	// -------------------------------------------------------------------------------------------------------
	// verificando el si existe el codigo
	$lcsqlvery = " select capano from arapam where capano ='". $lcapano ."'";
	$lcresult  = mysqli_query($oConn,$lcsqlvery);
	$lnCount   = mysqli_num_rows($lcresult);
	if ($lnCount == 0 ){
		$lcsql_h = " insert into arapam(capano, cfullname,ctel,dstar,dend,cstatus,crespno, mnotas,usuario,fecha)
					values('$lcapano','$lcfullname','$lctel','$ldstar', '$ldend','$lcstatus','$lcrespno','$lmnotas','" .$_SESSION["cuserid"]."','".$ldtrndate."')";
		$lnveces = 1;
		$lcsql_d  = "";
		$lcsql_p  = "";
		foreach ($oAjt as $a=>$b) {
			if($a == "articulos"){
					$longitud = count($b);
					for($i=0; $i<$longitud; $i++) {
						$lcservno  = mysqli_real_escape_string($oConn,$b[$i]["cservno"]);
						//$lnpayamt = $b[$i]["ncost"];
						$lcsql_ser = "select cdesc from arserm where cservno = '". $lcservno ."'";
						$lcresult  = mysqli_query($oConn,$lcsql_ser);
						$ldata     = mysqli_fetch_assoc($lcresult);
						if ($lnveces == 1){
							$lcsql_d = " insert into arapad(capano,cservno,cdesc,nprice,nqty ,usuario,fecha)
												values('$lcapano','".$b[$i]["cservno"]."','".$ldata["cdesc"]."'," .$b[$i]["nprice"]. ",". $b[$i]['nqty']. ",'" .$_SESSION["cuserid"]."','".$ldtrndate."')";
						  	$lnveces = 2;
						}else{
							$lcsql_d = $lcsql_d . ",('$lcapano','".$b[$i]["cservno"]."','".$ldata["cdesc"]."'," .$b[$i]["nprice"]. ",". $b[$i]['nqty']. ",'" .$_SESSION["cuserid"]."','".$ldtrndate."')";
						}  
							}	
			}	// if($a == "articulos"){
						
			if($a == "pagos"){
				$lnveces = 1;
				$longitud = count($b);
				for($i=0; $i<$longitud; $i++) {
					if ($lnveces == 1){
						$lcsql_p = " insert into arapap(capano,npayamt,dtrndate,usuario,fecha)
										values('$lcapano',".$b[$i]["npayamt"].",'".$b[$i]["dtrndate"]."','" .$_SESSION["cuserid"]."','".$ldtrndate."')";
						$lnveces = 2;
					}else{
						$lcsql_p = $lcsql_p . ",('$lcapano',".$b[$i]["npayamt"].",'".$b[$i]["dtrndate"]."','" .$_SESSION["cuserid"]."','".$ldtrndate."')";
					}  
				
				}
			}  // if($a == "pagos"){
		}  
		mysqli_query($oConn,$lcsql_h);
		mysqli_query($oConn,$lcsql_d);
		mysqli_query($oConn,$lcsql_p);

	}else{
		$lcsql_h = " update arapam set cfullname = '$lcfullname' ,
					ctel = '$lctel',dstar ='$ldstar',dend='$ldend',cstatus='$lcstatus',
		 			crespno='$lcrespno', mnotas='$lmnotas'	where capano = '$lcapano' ";
		mysqli_query($oConn,$lcsql_h);
	}
}
// ------------------------------------------------------------------------------------------------
// LISTAR
// -----------------------------------------------------------------------------------------------
if($lcaccion == "JSON"){
	$lcapano  = $_POST["capano"];
	// ----------------------------------------------------------------------------------------------------------
	// exportando Emcabezado de los datos
	// ----------------------------------------------------------------------------------------------------------
	$lcsqlcmd = "select * from arapam where capano = '$lcapano'";
	$lcResult = mysqli_query($oConn,$lcsqlcmd);
	// convirtiendo estos datos en un array asociativo
	$ldata = mysqli_fetch_assoc($lcResult);

	// ----------------------------------------------------------------------------------------------------------
	// exportando los articulos	
	// ----------------------------------------------------------------------------------------------------------
	$lcsql = " select arapad.cuid, 
                        arapad.cservno,
                        arserm.cdesc,
                        arapad.nqty,
                        arapad.nprice
 				from arapad
				left outer join arserm on arapad.cservno = arserm.cservno
				where arapad.capano = '$lcapano' ";
                
	$lcresult  = mysqli_query($oConn,$lcsql);
	while($row = mysqli_fetch_assoc($lcresult)){
		$ldata["articulos"][] = array("cuid"=>$row["cuid"],
											"capano" => $lcapano,
											"cservno"=> $row["cservno"],
											"cdesc"  => $row["cdesc"],
											"nqty"   => $row["nqty"],
											"nprice" => $row["nprice"]);
	}
	// ----------------------------------------------------------------------------------------------------------
	// exportando pagos
	// ----------------------------------------------------------------------------------------------------------
	$lcsql = " select arapap.cuid, 
                        arapap.npayamt,
                        arapap.dtrndate
 				from arapap
				where arapap.capano = '$lcapano' ";
    $lcresult  = mysqli_query($oConn,$lcsql);
	while($row = mysqli_fetch_assoc($lcresult)){
		$ldata["pagos"][] = array("cuid"     => $row["cuid"],
								  "npayamt"  => $row["npayamt"],
								  "dtrndate" => $row["dtrndate"]);
	}
	// convirtiendo este array en archivo jason.
	$jsondata = json_encode($ldata,true);
	// retornando objeto json
	echo $jsondata;
}
    //Cerrando la coneccion.
mysqli_close($oConn);
?>

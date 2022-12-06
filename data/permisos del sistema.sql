/* Listado de permisos del sistema. */
delete from symodu;
delete from symenh;
delete from symenu ;
delete from sysuser;
delete from syscomp;
delete from sygrup;
delete from ksschgrd;
delete from syperm;

/* modulo de administracion-*/
 SET @lcSelect = " select ccompid,compdesc from syscomp  ";
  INSERT INTO ksschgrd(calias,corder,cheader,mcolvalue,ncolwidth,cmodule)
    VALUES("SYSCOMP","00","Listado de Empresas",@lcSelect,0,"SY"),
    ("SYSCOMP","01","Compania Id","ccompid",100,"SY"),
    ("SYSCOMP","02","Descripcion ","compdesc",200,"SY");

 SET @lcSelect = " select cgrpid, cdesc from sygrup  ";
  INSERT INTO ksschgrd(calias,corder,cheader,mcolvalue,ncolwidth,cmodule)
    VALUES("SYGRUP","00","Listado de Grupos administrativos",@lcSelect,0,"SY"),
    ("SYGRUP","01","Grupo Id","cgrpid",100,"SY"),
    ("SYGRUP","02","Descripcion ","cdesc",200,"SY");

/*listas del modulo cuentas por cobrar*/

  SET @lcSelect = " select ccateno, cdesc  from arcate  ";
  INSERT INTO ksschgrd(calias,corder,cheader,mcolvalue,ncolwidth,cmodule)
      VALUES("ARCATEG","00","Listados General de Categorias",@lcSelect,0,"AR"),
      ("ARCATEG","01","Categoria Id","ccateno",100,"AR"),
      ("ARCATEG","02","Descripcion","cdesc",200,"AR");

  SET @lcSelect = " select ccateno, cdesc  from arcate where ctypecate = 'A'  ";
  INSERT INTO ksschgrd(calias,corder,cheader,mcolvalue,ncolwidth,cmodule)
      VALUES("ARCATEA","00","Ajustes de Inventario",@lcSelect,0,"AR"),
      ("ARCATEA","01","Ajuste Id","ccateno",100,"AR"),
      ("ARCATEA","02","Descripcion","cdesc",200,"AR");

  SET @lcSelect = " select ccateno, cdesc  from arcate where ctypecate = 'P'  ";
  INSERT INTO ksschgrd(calias,corder,cheader,mcolvalue,ncolwidth,cmodule)
      VALUES("ARCATEP","00","Categoria de Proveedores / Responsables ",@lcSelect,0,"AR"),
      ("ARCATEP","01","Categoria Id","ccateno",100,"AR"),
      ("ARCATEP","02","Descripcion","cdesc",200,"AR");

  SET @lcSelect = " select ccateno, cdesc  from arcate where ctypecate = 'C'  ";
  INSERT INTO ksschgrd(calias,corder,cheader,mcolvalue,ncolwidth,cmodule)
      VALUES("ARCATEC","00","Categoria de Clientes ",@lcSelect,0,"AR"),
      ("ARCATEC","01","Categoria Id","ccateno",100,"AR"),
      ("ARCATEC","02","Descripcion","cdesc",200,"AR");


  SET @lcSelect = " select crespno, cfullname from arresp  ";
  INSERT INTO ksschgrd(calias,corder,cheader,mcolvalue,ncolwidth,cmodule)
      VALUES("ARRESP","00","Listado de Proveedores / Vendedores",@lcSelect,0,"AR"),
      ("ARRESP","01","Responsable Id","crespno",100,"AR"),
      ("ARRESP","02","Nombre","cfullname",200,"AR");

  SET @lcSelect = " select cwhseno, cdesc from arwhse  ";
  INSERT INTO ksschgrd(calias,corder,cheader,mcolvalue,ncolwidth,cmodule)
      VALUES("ARWHSE","00","Listado de Bodegas",@lcSelect,0,"AR"),
      ("ARWHSE","01","Bodega Id","cwhseno",100,"AR"),
      ("ARWHSE","02","Descripcion","cdesc",200,"AR");

  SET @lcSelect = " select ctserno, cdesc from artser  ";
  INSERT INTO ksschgrd(calias,corder,cheader,mcolvalue,ncolwidth,cmodule)
    VALUES("ARTSER","00","Tipos de Articulos",@lcSelect,0,"AR"),
    ("ARTSER","01","Tipo Id","ctserno",100,"AR"),
    ("ARTSER","02","Descripcion","cdesc",200,"AR");

  SET @lcSelect = " select ccustno, cname from arcust  ";
  INSERT INTO ksschgrd(calias,corder,cheader,mcolvalue,ncolwidth,cmodule)
    VALUES("ARCUST","00","Listado de Clientes",@lcSelect,0,"AR"),
    ("ARCUST","01","Cliente Id","ccustno",100,"AR"),
    ("ARCUST","02","Nombre Completo","cname",200,"AR");

  SET @lcSelect = " select cpaycode, cdesc from artcas  ";
  INSERT INTO ksschgrd(calias,corder,cheader,mcolvalue,ncolwidth,cmodule)
    VALUES("ARTCAS","00","Condiciones de Pago",@lcSelect,0,"AR"),
    ("ARTCAS","01","Condicion Id","cpaycode",100,"AR"),
    ("ARTCAS","02","Descripcion","cdesc",200,"AR");

  SET @lcSelect = " select cservno, cdesc, nprice , ndesc, ntax from arserm  ";
  INSERT INTO ksschgrd(calias,corder,cheader,mcolvalue,ncolwidth,cmodule)
    VALUES("ARSERM","00","Listado de Articulos",@lcSelect,0,"AR"),
    ("ARSERM","01","Articulo Id","cservno",100,"AR"),
    ("ARSERM","02","Descripcion","cdesc",200,"AR"),
    ("ARSERM","03","Precio","nprice",100,"AR"),
    ("ARSERM","04","Desc Maximo","ndesc",100,"AR"),
    ("ARSERM","05","Impuesto","ntax",100,"AR");

  SET @lcSelect = " select aradjm.cadjno, 
                           aradjm.crefno, 
                           if(aradjm.cstatus='OP','Activa','Anulada') as cstatus ,
		                       arcate.cdesc,
                           aradjm.dtrndate,
                           arwhse.cdesc as cdescwh,
                           aradjm.usuario
                    from aradjm
                    left outer join arcate on arcate.ccateno = aradjm.ccateno
                    left outer join arwhse on arwhse.cwhseno = aradjm.cwhseno ";

  INSERT INTO ksschgrd(calias,corder,cheader,mcolvalue,ncolwidth,cmodule)
    VALUES("ARADJM","00","Listado de Requisas",@lcSelect,0,"AR"),
    ("ARADJM","01","Requisa No","cadjno",60,"AR"),
    ("ARADJM","02","Referencia","crefno",150,"AR"),
    ("ARADJM","03","Estado","cstatus",60,"AR"),
    ("ARADJM","04","Tipo Requisa","cdesc",150,"AR"),
    ("ARADJM","05","Fecha","dtrndate",60,"AR"),
    ("ARADJM","06","Bodega","cdescwh",100,"AR"),
    ("ARADJM","07","Usuario","usuario",100,"AR");
  
  /* Listado de Apartados */
  SET @lcSelect = ' select capano,cfullname, ctel, if(cstatus="OP","activa","entregado") as cstatus, dstar, dend from arapam  ';
INSERT INTO ksschgrd(calias,corder,cheader,mcolvalue,ncolwidth,cmodule)
    VALUES("ARAPAM","00","Listado de Apartado de Articulos",@lcSelect,0,"AR"),
    ("ARAPAM","01","Apartado No","capano",70,"AR"),
    ("ARAPAM","02","Estado","cstatus",60,"AR"),
    ("ARAPAM","02","Nombre de Cliente","cfullname",170,"AR"),
    ("ARAPAM","03","Telefono","ctel",60,"AR"),
    ("ARAPAM","04","Inicio","dstar",75,"AR"),
    ("ARAPAM","05","Final","dend",75,"AR")

/*  Configuracion del menu del sistema */

insert into symodu(cmodule, cdesc,cstatus)
values("SY","Administracion del Sistema","OP"),
      ("AR","Facturacion y Cuentas por Cobrar","OP"),
      ("IN","Control de Inventarios","OP");

insert into symenh(cmenhid,cdesc, cmodule,cstatus,ctype)
      /*FACTURACION Y CUENTAS POR COBRAR*/
values("AR01","Transacciones","AR","OP","TRN"),
      ("AR02","Reportes     ","AR","OP","RPT"),
      ("AR03","Catalogos    ","AR","OP","CAT"),
      ("AR04","Herramientas ","AR","OP","MOD"),
      /* INVENTARIOS */
      ("IN01","Transacciones","IN","OP","TRN"),
      ("IN02","Reportes     ","IN","OP","RPT"),
      ("IN03","Catalogos    ","IN","OP","CAT"),
      ("IN04","Herramientas ","IN","OP","MOD"),
      /* CONTABILIDAD */
      ("CG01","Transacciones","CG","OP","TRN"),
      ("CG02","Reportes     ","CG","OP","RPT"),
      ("CG03","Catalogos    ","CG","OP","CAT"),
      ("CG04","Herramientas ","CG","OP","MOD"),
      /* PLANILLAS */
      ("PL01","Transacciones","PL","OP","TRN"),
      ("PL02","Reportes     ","PL","OP","RPT"),
      ("PL03","Catalogos    ","PL","OP","CAT"),
      ("PL04","Herramientas ","PL","OP","MOD"),
      /* ADMINISTRACION */
      ("SY01","Transacciones","SY","OP","TRN");


insert into symenu(cmenuid,cdesc,cmodule,cgppmod,cmenhid,cstatus,cview)
    values("sy001","configuracion de la compañia","SYS","TRN","SY01","OP","../view/sycomp.php"),
    ("sy002","Grupos de Trabajo","SYS","TRN","SY01","OP","../view/sygrup.php"),
    /* TRANSACCIONES*/
    ("tr001","Facturacion y Notas de Debito","AR","TRN","AR01","OP","../view/arinvc.php"),
    ("tr002","Recibos de Dinero","AR","TRN","AR01","OP","../view/arcash.php"),
    ("tr003","Cotizaciones","AR","TRN","AR01","OP","../view/arcotm.php"),
    ("tr004","Entradas y Salidas de Inventario","AR","TRN","IN01","OP","../view/aradjm.php"),
    ("tr007","Preventa de Clientes","AR","TRN","AR01","OP","../view/arpodvm.php"),
    ("tr008","Anulacion de Facturas","AR","TRN","AR01","OP","../view/arvinv.php"),
    ("tr009","Anulacion de Recibos","AR","TRN","AR01","OP","../view/arvcas.php"),
    ("tr010","Anulacion Requisas","AR","TRN","IN01","OP","../view/arvadj.php"),
    ("tr011","Apartados","AR","TRN","AR01","OP","../view/arapam.php"),
    /* REPORTES*/
    ("rp001","Resumen de Ventas (Moneda)    ","AR","RPT","AR02","OP","../view/arinvt_r.php"),
    ("rp013","Resumen de Ventas (Articulos) ","AR","RPT","AR02","OP","../view/arinvt2_r.php"),
    ("rp002","Cuentas por Cobrar","AR","RPT ","AR02","OP","../view/arcash1_r.php"),
    ("rp009","Vencimiento de Cartera        ","AR","RPT","AR02","OP","../view/arcash2_r.php"),
    ("rp003","Estado de Cuentas             ","AR","RPT","AR02","OP","../view/arcustb_r.php"),
    ("rp004","Resumen de Cobros             ","AR","RPT","AR02","OP","../view/arcash_r.php"),
    ("rp005","Lista de Precios              ","IN","RPT","IN02","OP","../view/arserm_r.php"),
    ("rp006","Resumen de Uilidades y Costos ","AR","RPT","AR02","OP","../view/arinvt1_r.php"),
    ("rp007","Formato de Requisas           ","IN","RPT","IN02","OP","../view/aradjm_r.php"),
    ("rp008","Reporte de Movimiento de Inventario (Entradas y Salidas)","IN","RPT","IN02","OP","../view/aradjt_r.php"),
    ("rp010","Movimientos de Inventario Valorisados AD                ","IN","RPT","IN02","OP","../view/arserm1_r.php"),
    ("rp011","Maximos y Minimos             ","IN","RPT","IN02","OP","../view/arserm2_r.php"),
    ("rp012","Reimpresion Formato Factura   ","AR","RPT","AR02","OP","../view/arinvc_r.php"),
    ("rp014","Analisis de Kardex","IN","RPT ","IN02","OP","../view/arcdex_r.php"),
    /* CATALOGOS*/
    ("ca001","Catalogo de Clientes                   ","AR","CAT","AR03","OP","../view/arcust.php"),
    ("ca002","Condiciones de Pago                    ","AR","CAT","AR03","OP","../view/artcas.php"),
    ("ca003","Maestro de Inventarios                 ","AR","CAT","AR03","OP","../view/arserm.php"),
    ("ca004","Tipos de Inventarios                   ","AR","CAT","AR03","OP","../view/artser.php"),
    ("ca005","Proveedores                            ","AR","CAT","AR03","OP","../view/arresp.php"),
    ("ca006","Tipos de Requisas / Entradas y Salidas ","AR","CAT","IN03","OP","../view/arcate.php"),
    ("ca007","Bodegas                                ","AR","CAT","AR03","OP","../view/arwhse.php"),
    ("ca008","Tipos de Cambio                        ","AR","CAT","AR03","OP","../view/armone.php"),
    
    /* HERRAMIENTAS*/
    ("mod001","Configuracion VC-2020","AR","MOD","AR04","OP","../view/arsetup.php"),
    ("mod002","Importacion de datos","AR","MOD","AR04","OP","../view/import_data.php"),
    ("mod003","Ajuste de Cartera","AR","MOD","AR04","OP","../view/arclear.php");
    


/* B)- Usuario estandar del sistema.. */
insert into sysuser(cgrpid,cfullname,cuserid,cstatus,cpasword) 
values("00","Supervisor General","SUPERVISOR","OP","2505");

INSERT INTO sygrup(cgrpid,cdesc,cstatus) values("00","Grupo Sistemas","OP");

insert into syscomp(ccompid, compdesc,cstatus,dbname,chost,cuser)
value("00","Compañia de Pruebas","OP","ksisdbc","localhost","root");

insert into syperm(cgrpid,cmenuid,cdesc,allow,ccompid)
values("00","sy001","configuracion de la compañia",1,"00"),
      ("00","sy002","Grupos de Trabajo",1,"00")
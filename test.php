<?php


$tabla = array("capano"=>"0001",
                "cfullname"=>"eddy Jiron guillen",
            "ctel"=>"98612627",
            "npayamt"=>55);

echo var_dump($tabla);
echo "<br><br>";

$tabla +=array("productos"=>array("platano","naranja","limones"));
echo var_dump($tabla);

//json_encode($tabla,true);
echo "<br><br>";
echo 
json_encode($tabla,true);



?>


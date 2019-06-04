<?php
    include("public.php");

    $id=$_GET["id"];
    
    $sql="select * from goods1 where id = '$id'";
    $res = mysqli_query($con,$sql);
    $data=array();
    while($arr = mysqli_fetch_assoc($res)){
        array_push($data,$arr);
    }
    echo json_encode($data);
?>
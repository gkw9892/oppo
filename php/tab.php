<?php
    include("public.php");

    $ser=$_GET["series"];
    $sql = "select * from tab where series = '$ser'";
    $res = mysqli_query($con,$sql);
    $data=array();
    while($arr = mysqli_fetch_assoc($res)){
        array_push($data,$arr);
    }
    echo json_encode($data);
?>
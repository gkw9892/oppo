<?php
    include("public.php");

    $sql="select group_concat(color) as color,series from goods1 group by series order by id";
    $res=mysqli_query($con,$sql);
    $data=array();
    while($arr = mysqli_fetch_assoc($res)){
        array_push($data,$arr);
    }
    echo json_encode($data);


?>
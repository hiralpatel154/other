<?php
include('../conn.php');
if(isset($_POST['id'])){
    $id=$_POST['id'];
    $country_query = "SELECT * from states where country_id='".$id."'";
    $country_result = mysqli_query($conn, $country_query);
    $data= array();
    while($row=mysqli_fetch_array($country_result)){
        $id = $row['id'];
        $state=$row['state_name'];
        $data[$id] = $state;
    }
    echo json_encode($data);exit;
}


if(isset($_POST['stateId'])){
    $id=$_POST['stateId'];
    $country_query = "SELECT * from city where state_id='".$id."'";
    $country_result = mysqli_query($conn, $country_query);
    $data= array();
    while($row=mysqli_fetch_array($country_result)){
        $id = $row['id'];
        $city_name=$row['city_name'];
        $data[$id] = $city_name;
    }
    echo json_encode($data);exit;
}
?>
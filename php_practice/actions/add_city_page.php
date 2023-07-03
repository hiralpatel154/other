<?php
if(isset($_POST['submit'])){
    $get_country = $_POST['country'];
    $get_state = $_POST['state'];
    $city_name =$_POST['city_name'];

    $select = "SELECT * FROM city WHERE city_name = '" . $city_name . "'";
    $select_res = mysqli_query($conn, $select);
    $count = mysqli_num_rows($select_res);

    if ($count > 0) {
           
            $_SESSION["err"] = "City Already Exists";
            header('Location: ./index.php?view=read_city');
            die();
        }
        else{
            
            $_SESSION["msg"] = "Added City Suceesfully";
            $sql = "INSERT into city(city_name, state_id, con_id ) values ('".$city_name."','".$get_state."','".$get_country."')" ;
            $result = mysqli_query($conn, $sql);
            if($result == TRUE){
                header("Location:./index.php?view=read_city");
            }
        }

    
}
if(isset($_POST['submit_state'])){
    $get_country = $_POST['country'];
    $state_name =$_POST['state_name'];

   
    $select = "SELECT * FROM states WHERE state_name = '" . $state_name . "'";
    $select_res = mysqli_query($conn, $select);
    $count = mysqli_num_rows($select_res);

    if ($count > 0) {
            $_SESSION["err"] = "State Already Exists";
            header('Location: index.php?view=read_state');
            die();
        }
        else{
            $_SESSION["msg"] = "Added State Suceesfully";
            $sql = "INSERT into states(state_name, country_id) values ('".$state_name."','".$get_country."')" ;
            $result = mysqli_query($conn, $sql);
            if($result == TRUE){
                header("Location:./index.php?view=add_city");
            }
        }

    
}


?>
<?php
############ Configuration ##############
$config["generate_image_file"]			= true;
$config["generate_thumbnails"]			= true;
$config["image_max_size"] 			= 500; //Maximum image size (height and width)
$config["thumbnail_size"]  			= 200; //Thumbnails will be cropped to 200x200 pixels
$config["thumbnail_prefix"]			= "thumb_"; //Normal thumb Prefix
$config["destination_folder"]			= 'images/'; //upload directory ends with / (slash)
$config["thumbnail_destination_folder"]		= 'images/'; //upload directory ends with / (slash)
$config["upload_url"] 				= $_SERVER['DOCUMENT_ROOT']."/ADMIN/"; 
$config["quality"] 				= 90; //jpeg quality
$config["random_file_name"]			= true; //randomize each file name

// можно получить адрес до текущей папки и обрезать 'dist/php' 8 символов
// echo substr(__DIR__, 0, -8);
// return false;

if(!isset($_SERVER['HTTP_X_REQUESTED_WITH'])) {
	exit;  //try detect AJAX request, simply exist if no Ajax
}

//specify uploaded file variable
$config["file_data"] = $_FILES["fileinp"]; 


//include sanwebe impage resize class
include("resize.class.php"); 


//create class instance 
$im = new ImageResize($config); 


try{
	$responses = $im->resize(); //initiate image resize

	//output thumbnails
	// foreach($responses["thumbs"] as $response){
	// 	echo '<img src="'.$config["upload_url"].$config["destination_folder"].$response.'" class="thumbnails" title="'.$response.'" />';
	// }

	//output images
	// foreach($responses["images"] as $response){
	// 	echo '<img src="'.$config["upload_url"].$config["destination_folder"].$response.'" class="images" title="'.$response.'" />';
	// }

    // если грузим только одну картинку и получаем одно изображение и миниатюру
    $result = [];
    foreach($responses["thumbs"] as $response){
        $result['thumb'] = $response;
    }
    foreach($responses["images"] as $response){
        $result['image'] = $response;
    }
    
    echo json_encode($result);

	
}catch(Exception $e){
	echo $e->getMessage();
}

		
?>

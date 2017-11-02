<?php header('Content-Type:Application/Javascript');
if(!isset($_GET['js'])) {
	die("Error access");
}
switch ($_GET['js']) {
	case 'assistant':
		echo file_get_contents("assets/js/assistant.min.js");
		break;
	case 'typed':
		echo file_get_contents("assets/js/typed.js");
		break;
	default:
		die("Error access");
		break;
}

?>
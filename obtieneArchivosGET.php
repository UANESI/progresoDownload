<?
/*require_once("clase/zip.lib.php");
$archivos = explode("|",$_POST["archivos"]);
$ziper = new zipfile();
for($n=0;$n<count($archivos);$n++){
	ob_start();
	$dataArchivo = pathinfo("./".$archivos[$n]);
	readfile("./".$archivos[$n]);
	$nombreArchivo = $dataArchivo["basename"];
	$contenido = ob_get_contents();
	ob_clean();
	$ziper->addFile($contenido,$nombreArchivo);
}
$contenido = $ziper->base64("data.zip");
$ctype="text";
header("Pragma: public"); // required
header("Expires: 0");
header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
header("Cache-Control: private",false); // required for certain browser
header("Content-Type: $ctype");
header("Content-Length: ".strlen($contenido));
echo base64_encode($contenido);
*/

require_once("clase/zip.lib.php");
$archivos = explode("|",$_GET["archivos"]);
$ziper = new zipfile();
for($n=0;$n<count($archivos);$n++){
	ob_start();
	$dataArchivo = pathinfo("./".$archivos[$n]);
	readfile("./".$archivos[$n]);
	$nombreArchivo = $dataArchivo["basename"];
	$contenido = ob_get_contents();
	ob_clean();
	$ziper->addFile($contenido,$nombreArchivo);
}
$ziper->archivo_virtual("data.zip");
?>
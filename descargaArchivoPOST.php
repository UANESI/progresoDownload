<?
ob_start();
readfile("./".$_POST["archivo"]);
$contenido = ob_get_contents();
ob_clean();
$ctype="application/pdf";
header("Pragma: public"); // required
header("Expires: 0");
header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
header("Cache-Control: private",false); // required for certain browsers 
header("Content-Type: $ctype");
// change, added quotes to allow spaces in filenames, by Rajkumar Singh
header("Content-Disposition: filename=\"archivo.pdf\";" );
header("Content-Transfer-Encoding: binary");
header("Content-Length: ".filesize("./".$_POST["archivo"]));
echo $contenido;
?>
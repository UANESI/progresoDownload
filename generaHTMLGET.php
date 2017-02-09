<? 
ob_start();
echo $_GET["texto"];
$contenido = ob_get_contents();
ob_clean();
$ctype="text";
header("Pragma: public"); // required
header("Expires: 0");
header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
header("Cache-Control: private",false); // required for certain browsers 
header("Content-Type: $ctype");
// change, added quotes to allow spaces in filenames, by Rajkumar Singh
header("Content-Disposition: filename=\"archivo.txt\";" );
header("Content-Transfer-Encoding: binary");
header("Content-Length: ".strlen($contenido));
echo $contenido;
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Untitled Document</title>
<!--<link href="libs/css8/blitzer/jquery-ui-1.10.4.custom.min.css" rel="stylesheet">
<link href="libs/css8/min.metroBeta.css" rel="stylesheet">
<link href="libs/css8/metro-colors.min.css" rel="stylesheet">
<link href="libs/css8/metro-icons.min.css" rel="stylesheet">
<link href="libs/css8/autoComplete.css" rel="stylesheet">
<link href="libs/css8/cleditor/jquery.cleditor.css" rel="stylesheet" type="text/css"/>
<link href="libs/css8/datetimepicker/jquery.datetimepicker.css" rel="stylesheet">-->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script> window.jQuery || document.write('<script src="libs/js8/jquery-1.9.1.min.js"><\/script>') </script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js"></script>
<script> window.jQuery.ui || document.write('<script src="libs/js8/jquery-ui-1.10.4.custom.min.js"><\/script>') </script>
<script src="libs/js8/ajaxSetup.js" type="text/javascript"></script>
<!--<script src="libs/js8/select2/js/select2.min.js" type="text/javascript"></script>
<script src="libs/js8/min.metroBeta2.js"></script>
<script src="libs/js8/paramBas.js"></script>
<script src="libs/js8/include.js" language="javascript"></script>
<script src="libs/js8/moment.min.js" type="text/javascript"></script>
<script src="libs/js8/paramAjax.js" type="text/javascript"></script>
<script src="libs/js8/cleditor/jquery.cleditor.min.js" type="text/javascript"></script>
<script src="libs/js8/datetimepicker/jquery.datetimepicker.js" type="text/javascript"></script>-->
<script type="text/javascript">
var pruebaDescarga 
var pruebaDesc1;
	$(document).ready(function(){
		pruebaDescarga = downQuery;
		var opciones = new Object();
		opciones.onCompletado = solicitudCompletada2;
		opciones.onSend = antesEnvioSolicitud2;
		opciones.onExito = exitoSolicitud2;
		opciones.onProgreso = muestraProgreso2;
		opciones.id="1";
		opciones.tipoResultado="binary";
		pruebaDescarga.dArchivo("http://pruebas.uanesi.net/descargaArchivo.php?archivo=APA.pdf",opciones);
		
		var opciones = new Object();
		opciones.onCompletado = solicitudCompletada2;
		opciones.onSend = antesEnvioSolicitud2;
		opciones.onExito = exitoSolicitud2;
		opciones.onProgreso = muestraProgreso2;
		opciones.tipoResultado="binary";
		opciones.id="2";
		pruebaDesc1 = pruebaDescarga.dArchivo("http://pruebas.uanesi.net/pdf1115099130576dfc45a7f4a-1.jpg",opciones);
	})
	function muestraProgreso2(evt,xhr){
			$("#progresoTXT"+xhr.opciones.id).html(xhr.opciones.url);
			$("#progresoTXT"+xhr.opciones.id+"A").html(evt.lengthComputable+"<br>");
			if (evt.lengthComputable) {
				var percentComplete = evt.loaded / evt.total;
				$("#progresoTXT"+xhr.opciones.id).html(percentComplete+"<br>");
			}else{
				$("#progresoTXT"+xhr.opciones.id+"A").html("Progreso solo<br>");
			}
		}
		function errorSolicitud2(xhr, ajaxOptions, errorArrojado) {
			$("#progresoTXT"+xhr.opciones.id).append("Error al generar la vista previa 2");
			$("#progresoTXT"+xhr.opciones.id).append("<br>");
			$("#progresoTXT"+xhr.opciones.id).append(xhr.responseText);
			$("#progresoTXT"+xhr.opciones.id).append("<br>");
			$("#progresoTXT"+xhr.opciones.id).append(errorArrojado);
			$("#progresoTXT"+xhr.opciones.id).append("<br>");
			
		}
		function antesEnvioSolicitud2(evt,opciones) {
			console.log("antesEnvioSolicitud")
			console.log(opciones.id);
			$("#progresoTXTTest").html("antesEnvioSolicitud")
		}
		function solicitudCompletada2(evt,state) {
			console.log("solicitudCompletada");
			console.log(evt.opciones.id)
			$("#progresoTXTTest").html("solicitudCompletada");
		}
		function exitoSolicitud2(data, status, xhr) { 
			if(data){
				$("#progresoTXT"+xhr.opciones.id+"B").append("Objetivo: " + xhr.opciones.url + "<br>");
				var nombreArchivo = pruebaDescarga.obtieneNombre(xhr);
				$("#progresoTXT"+xhr.opciones.id+"B").append("Archivo: " + nombreArchivo + "<br>");
				var downloadUrl = URL.createObjectURL(data);
				if(xhr.opciones.id=="1"){
					var a = document.createElement("a");
					a.href = downloadUrl;
					a.download = nombreArchivo;
					document.body.appendChild(a);
					a.click();
				}else{
					var a = document.createElement("img");
					a.src = downloadUrl;
					document.body.appendChild(a);
				}
			}
			$("#progresoTXT"+xhr.opciones.id+"B").append("exitoSolicitud 2<br>");
		}
</script>
</head>

<body>
<div id="progresoTXTTest" style="border:#000000 1px solid"></div>
<div id="progresoTXT1" style="border:#000000 1px solid"></div>
<div id="progresoTXT1A"></div>
<div id="progresoTXT1B"></div>
<div id="progresoTXT2" style="border:#000000 1px solid"></div>
<div id="progresoTXT2A"></div>
<div id="progresoTXT2B"></div>

</body>
</html>
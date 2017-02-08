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
	$(document).ready(function(){
		var pruebaDescarga = downQuery;
		var opciones = new Object();
		opciones.onCompletado = solicitudCompletada2;
		opciones.onSend = antesEnvioSolicitud2;
		opciones.onExito = exitoSolicitud2;
		opciones.onProgreso = muestraProgreso2;
		pruebaDescarga.dArchivo("31122010.pdf",opciones);
	})
	function muestraProgreso2(evt){
			if (evt.lengthComputable) {
				var percentComplete = evt.loaded / evt.total;
				$("#progresoTXT").append(percentComplete+"<br>");
				/*if(muestraBarra){
					$("#"+barraProgreso).css("display","block");
					$("#"+barraProgreso).data('progress').set(Math.round(percentComplete * 100));
				}
				if($("#"+dialogoProgresoTXT)){
					$("#"+dialogoProgresoTXT).html('<hs>'+Math.round(percentComplete * 100) + "%"+' Cargado<br>'+formatSize (evt.loaded) +' de '+ formatSize (evt.total)+'</hs>');
				}*/
				//alert(Math.round(percentComplete * 100) + "%");
			}else{
				$("#progresoTXT").append("Progreso solo<br>");
				/*if(muestraBarra){
					$("#"+barraProgreso).css("display","none");
				}
				if($("#"+dialogoProgresoTXT)){
					$("#"+dialogoProgresoTXT).html('<h2>Descargando</h2>');
				}*/
			}
		}
		function errorSolicitud2(xhr, ajaxOptions, thrownError) {
			/*alert("Error al generar la vista previa");
			alert(xhr.responseText);
			alert(thrownError);
			var dialogAlerta = $("#"+dialogoProgreso).data('dialog');
			$("#"+dialogoProgresoTXT).html('<h4 class="fg-white">&nbsp;SE PRESENTÓ UN ERROR A GENERAR LA SOLICITUD&nbsp;</h4><br>Error presentado: '+thrownError);
			dialogAlerta.open();*/
			$("#progresoTXT").append("Error al generar la vista previa 2");
			$("#progresoTXT").append("<br>");
			$("#progresoTXT").append(xhr.responseText);
			$("#progresoTXT").append("<br>");
			$("#progresoTXT").append(thrownError);
			$("#progresoTXT").append("<br>");
			
		}
		function antesEnvioSolicitud2() {
			//$("#"+barraProgreso).css("display","none");
			//$("#"+dialogoProgresoTXT).html('<h2>Descargando</h2>');
			$("#progresoTXT").append("antesEnvioSolicitud 2<br>");
		}
		function solicitudCompletada2() {
			//$("#"+dialogoProgresoTXT).html('<h2>Descarga completada</h2>');
			//dialog.close();
			$("#progresoTXT").append("solicitudCompletada 2<br>");
		}
		function exitoSolicitud2(data, status, xhr) { 
			/*$("#"+dialogoProgresoTXT).html('<h2>Procesando descarga</h2>');
			if(data){
				var nombreArchivo = obtieneNombre(xhr);
				var downloadUrl = URL.createObjectURL(data);
				var a = document.createElement("a");
				a.href = downloadUrl;
				a.download = nombreArchivo;
				document.body.appendChild(a);
				a.click();
			}*/
			$("#progresoTXT").append("exitoSolicitud 2<br>");
		}
</script>
</head>

<body>
<div id="progresoTXT"></div>
</body>
</html>
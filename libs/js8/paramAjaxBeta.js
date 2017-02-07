var divAlerta;
var dialogoProgreso = "dialogAlerta";
var barraProgreso = "barraProgresoTotal";
var dialogoProgresoTXT = "dialogInterno3";
var iconoInterno = "iconoInterno3";
var muestraBarra = true;
$(document).ready(function(){
	$.ajaxTransport("+binary", function(options, originalOptions, jqXHR){
		// check for conditions and support for blob / arraybuffer response type
		if (window.FormData && ((options.dataType && (options.dataType == 'binary')) || (options.data && ((window.ArrayBuffer && options.data instanceof ArrayBuffer) || (window.Blob && options.data instanceof Blob)))))
		{
			return {
				// create new XMLHttpRequest
				send: function(headers, callback){
					// setup all variables
					var xhr = new XMLHttpRequest(),
					onFinal = options.funcionFinal	,
					url = options.url,
					type = options.type,
					async = options.async || true,
					// blob or arraybuffer. Default is blob
					dataType = options.responseType || "blob",
					data = options.data || null,
					username = options.username || null,
					password = options.password || null;
					//console.log(originalOptions.onProgreso);
					if(originalOptions.onProgreso){
						xhr.addEventListener("progress", originalOptions.onProgreso,false);
					}else{
						xhr.addEventListener("progress", function (evt) {
							//alert(evt.lengthComputable);
							if (evt.lengthComputable) {
								var percentComplete = evt.loaded / evt.total;
								if(muestraBarra){
									$("#"+barraProgreso).css("display","block");
									$("#"+barraProgreso).data('progress').set(Math.round(percentComplete * 100));
								}
								if($("#"+dialogoProgresoTXT)){
									$("#"+dialogoProgresoTXT).html('<hs>'+Math.round(percentComplete * 100) + "%"+' Cargado<br>'+formatSize (evt.loaded) +' de '+ formatSize (evt.total)+'</hs>');
								}//alert(Math.round(percentComplete * 100) + "%");
							}else{
								if(muestraBarra){
									$("#"+barraProgreso).css("display","none");
								}
								if($("#"+dialogoProgresoTXT)){
									$("#"+dialogoProgresoTXT).html('<h2>Descargando</h2>');
								}
							}
						}, false);
					}
					xhr.addEventListener('error', function(jqXHR, textStatus, errorThrown){
						console.log("Se presento un error");
						console.log(jqXHR);
					});
					xhr.addEventListener('load', function(){
						var data = {};
						data[options.dataType] = xhr.response;
						// make callback and send data
						callback(xhr.status, xhr.statusText, data, xhr.getAllResponseHeaders());
					});
					xhr.open(type, url, async, username, password);
					// setup custom headers
					for (var i in headers ) {
						xhr.setRequestHeader(i, headers[i] );
					}
					if(data){
						if($.isArray(data)){
							var datosNuevos = new Array();
							for (var i in data) {
								if(typeof data[i] == "string"){
									 datosNuevos.push(i + '=' + encodeURI(data[i]) );
								}
							}
							data = datosNuevos.join("&");
						}else if(typeof data == "object"){
							var datosNuevos = new Array();
							$.each( data, function( key, value ) {
							  datosNuevos.push(key + "=" + encodeURI(value));
							});
							data = datosNuevos.join("&");
						}
					}
					xhr.responseType = dataType;
					xhr.send(data);
				},
				abort: function(){
					jqXHR.abort();
					//this.abort();
					console.log("Debe Abortar");
					return true;
				}
			};
		}
	});
});
function formatSize (size) {
	if (!size) {
		return 'N/A';
	}
	function round(num, precision) {
		return Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision);
	}
	var boundary = Math.pow(1024, 4);
	if (size > boundary) {
		return round(size / boundary, 2) + " " + 'TB';
	}
	if (size > (boundary/=1024)) {
		return round(size / boundary, 2) + " " + 'GB';
	}
	if (size > (boundary/=1024)) {
		return round(size / boundary, 2) + " " + 'MB';
	}
	if (size > 1024) {
		return Math.round(size / 1024) + " " + 'KB';
	}
	return size + " " + 'b';
}
function obtieneNombre(xhr){
	//alert(xhr.getAllResponseHeaders())
	//var encabezados = xhr.getAllResponseHeaders();
	if(xhr.getResponseHeader("Content-Disposition")){
		var nombreArchivo = xhr.getResponseHeader("Content-Disposition").replace('attachment','');
		var nombreArchivo = nombreArchivo.replace("Content-Disposition").replace('filename','');
		nombreArchivo = nombreArchivo.replace('-','');
		nombreArchivo = nombreArchivo.replace(';','');
		nombreArchivo = nombreArchivo.replace(';','');
		nombreArchivo = nombreArchivo.replace('=','');
		nombreArchivo = nombreArchivo.replace('"','');
		nombreArchivo = nombreArchivo.replace('"','');
	}else{
		var nombreArchivo = "archivo";
	}
	return 	nombreArchivo;
}
function dArchivo(objetivo,opciones){
	if(!opciones){
		opciones = new Object();
	}
	if(!opciones.metodo){
		opciones.metodo = "GET";	
	}
	if(!opciones.contenidos){
		opciones.contenidos=null;	
	}
	if(!opciones.tipoResultado){
		opciones.tipoResultado="binary";	
	}
	if(!opciones.onError){
		opciones.onError = errorSolicitud;
	}
	if(!opciones.onSend){
		opciones.onSend  = antesEnvioSolicitud;
	}
	if(!opciones.onCompletado){
		opciones.onCompletado = solicitudCompletada;
	}
	if(!opciones.onExito){
		opciones.onExito = exitoSolicitud;
	}
	if(!opciones.crossD){
		opciones.crossD = false;
	}
	if(!opciones.onProgreso){
		opciones.onProgreso = muestraProgreso;
	}
	if($("#"+dialogoProgreso)){
		dialog = $("#"+dialogoProgreso).data('dialog');
	}
	/*if($("#"+barraProgreso).data('progress')){
		//$("#"+barraProgreso).data('progress').set(0);
	}*/
	if($("#"+dialogoProgresoTXT)){
		/*$("#"+dialogoProgresoTXT).html('<h1>Generando datos</h1>');
		if($("#"+iconoInterno)){
			$("#"+iconoInterno).html('<h2><span class="mif-spinner4 mif-3x mif-ani-spin"></span></h2>');
		}*/
	}
	if(dialog){
		dialog.open();
	}
	var cargadorPagina = $.ajax({
		data: opciones.contenidos,
		type: opciones.metodo,
		dataType: opciones.tipoResultado,
  		processData: false,
		url: objetivo,
		cache: false,
		error: opciones.onError,
		beforeSend: opciones.onSend,
		complete: opciones.onCompletado,
		success: opciones.onExito,
		crossDomain: opciones.crossD,
		onProgreso:opciones.onProgreso
	})
	return cargadorPagina;
}
function muestraProgreso(evt){
	if (evt.lengthComputable) {
		var percentComplete = evt.loaded / evt.total;
		if(muestraBarra){
			$("#"+barraProgreso).css("display","block");
			$("#"+barraProgreso).data('progress').set(Math.round(percentComplete * 100));
		}
		if($("#"+dialogoProgresoTXT)){
			$("#"+dialogoProgresoTXT).html('<hs>'+Math.round(percentComplete * 100) + "%"+' Cargado<br>'+formatSize (evt.loaded) +' de '+ formatSize (evt.total)+'</hs>');
		}//alert(Math.round(percentComplete * 100) + "%");
	}else{
		if(muestraBarra){
			$("#"+barraProgreso).css("display","none");
		}
		if($("#"+dialogoProgresoTXT)){
			$("#"+dialogoProgresoTXT).html('<h2>Descargando</h2>');
		}
	}
}
function errorSolicitud(xhr, ajaxOptions, thrownError) {
	/*alert("Error al generar la vista previa");
	alert(xhr.responseText);
	alert(thrownError);*/
	var dialogAlerta = $("#"+dialogoProgreso).data('dialog');
	$("#"+dialogoProgresoTXT).html('<h4 class="fg-white">&nbsp;SE PRESENTÓ UN ERROR A GENERAR LA SOLICITUD&nbsp;</h4><br>Error presentado: '+thrownError);
	dialogAlerta.open();
}
function antesEnvioSolicitud() {
	//$("#"+barraProgreso).css("display","none");
	$("#"+dialogoProgresoTXT).html('<h2>Descargando</h2>');
}
function solicitudCompletada() {
	$("#"+dialogoProgresoTXT).html('<h2>Descarga completada</h2>');
	dialog.close();
}
function exitoSolicitud(data, status, xhr) { 
	$("#"+dialogoProgresoTXT).html('<h2>Procesando descarga</h2>');
	if(data){
		var nombreArchivo = obtieneNombre(xhr);
		var downloadUrl = URL.createObjectURL(data);
		var a = document.createElement("a");
		a.href = downloadUrl;
		a.download = nombreArchivo;
		document.body.appendChild(a);
		a.click();
	}
}
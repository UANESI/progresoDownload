var divAlerta;

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
					url = options.url,
					type = options.type,
					async = options.async || true,
					// blob or arraybuffer. Default is blob
					dataType = options.responseType || "blob",
					data = options.data || null,
					username = options.username || null,
					password = options.password || null;
					xhr.addEventListener("progress", function (evt) {
						//alert(evt.lengthComputable);
						if (evt.lengthComputable) {
							var percentComplete = evt.loaded / evt.total;
							if($("#barraProgresoTotal")){
								$("#barraProgresoTotal").css("display","block");
								$("#barraProgresoTotal").data('progress').set(Math.round(percentComplete * 100));
							}
							if($("#dialogInterno3")){
								$("#dialogInterno3").html('<hs>'+Math.round(percentComplete * 100) + "%"+' Cargado<br>'+formatSize (evt.loaded) +' de '+ formatSize (evt.total)+'</hs>');
							}//alert(Math.round(percentComplete * 100) + "%");
						}else{
							if($("#barraProgresoTotal")){
								$("#barraProgresoTotal").css("display","none");
							}
							if($("#dialogInterno3")){
								$("#dialogInterno3").html('<h2>Descargando</h2>');
							}
						}
					}, false);
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
	//var encabezados = xhr.getAllResponseHeaders();
	if(xhr.getResponseHeader("Content-Disposition")){
		var nombreArchivo = xhr.getResponseHeader("Content-Disposition").replace('attachment','');
		var nombreArchivo = nombreArchivo.replace("Content-Disposition").replace('filename','');
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
function dArchivo(objetivo,metodo,contenidos,tipoResultado){
	if(!metodo){
		metodo = "GET";	
	}
	if(!contenidos){
		contenidos=null;	
	}
	if(!tipoResultado){
		tipoResultado="binary";	
	}
	dialog = $("#dialog3").data('dialog');
	$("#barraProgresoTotal").data('progress').set(0);
    $("#dialogInterno3").html('<h1>Generando datos</h1>');
	$("#iconoInterno3").html('<h2><span class="mif-spinner4 mif-3x mif-ani-spin"></span></h2>');
	dialog.open();
	
	$.ajax({
		data:contenidos,
		type: metodo,
		dataType: tipoResultado,
  		processData: false,
		url: objetivo,
		cache: false,
		error: function (xhr, ajaxOptions, thrownError) {
			alert("Error al generar la vista previa");
			alert(xhr.responseText);
			alert(thrownError);
			var dialogAlerta = $("#dialogAlerta").data('dialog');
			$("#dialogInternoAlerta").html('<h4 class="fg-white">&nbsp;SE PRESENTÓ UN ERROR A GENERAR LA SOLICITUD&nbsp;</h4><br>Error presentado: '+thrownError);
			dialogAlerta.open();
			/**/
		},
		beforeSend: function () {
			$("#barraProgresoTotal").css("display","none");
			$("#dialogInterno3").html('<h2>Descargando</h2>');
		},
		complete: function () {
			$("#dialogInterno3").html('<h2>Descarga completada</h2>');
			dialog.close();
		},
		success: function (data, status, xhr) { 
			$("#dialogInterno3").html('<h2>Procesando descarga</h2>');
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
	});
	return false;
}
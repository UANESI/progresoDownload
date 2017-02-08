/*!
 Downloader Jquery Progress v1.0
 http://uanesi.net/Downloader
 requires jQuery v1.9.1 or later

 Copyright 2017, Tahel Romero, UANESI, CA
*/

(function ($) {
		$.ajaxTransport("+binary", function(options, originalOptions, jqXHR){
			if (window.FormData && ((options.dataType && (options.dataType == 'binary')) || (options.data && ((window.ArrayBuffer && options.data instanceof ArrayBuffer) || (window.Blob && options.data instanceof Blob)))))
			{
				return {
					send: function(headers, callback){
						// setup all variables
						var xhr = new XMLHttpRequest(),
						onFinal = options.funcionFinal,
						url = options.url,
						type = options.type,
						async = options.async || true,
						dataType = options.responseType || "blob",
						data = options.data || null,
						username = options.username || null,
						password = options.password || null;
						jqXHR.opciones = options;
						
						xhr.addEventListener("progress", function (evt) {
							if(jqXHR.opciones.onProgreso){
								jqXHR.opciones.onProgreso(evt,jqXHR);
							}
						}, false);
						xhr.addEventListener('error', function(jqXHR, textStatus, errorThrown){
							if(jqXHR.opciones.onError){
								jqXHR.opciones.onError(jqXHR, textStatus, errorThrown);
							}
						});
						xhr.addEventListener('load', function(){
							var data = {};
							
							
							data[options.dataType] = xhr.response;
							callback(xhr.status, xhr.statusText, data, xhr.getAllResponseHeaders());
						});
						xhr.open(type, url, async, username, password);
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
						alert("Debe Abortar");
						return true;
					}
				};
			}
		}); 
   downQuery =  {
	   defaultOptions:{

	   },
	   formatSize:function(size) {
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
		},
		obtieneNombre:function(xhr){
			$("#progresoTXT3").html(xhr.getAllResponseHeaders())
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
			}
			if(!nombreArchivo){
				//var nombreArchivo = "archivo";
				var nombreArchivo = xhr.opciones.url.split("?");
				nombreArchivo = nombreArchivo[0].split("/");
				if(nombreArchivo.length > 1){
					nombreArchivo = nombreArchivo[nombreArchivo.length-1];
				}else{
					nombreArchivo = nombreArchivo[0];
				}
			}
			return 	nombreArchivo;
		},
		dArchivo:function(objetivo,opciones){
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
				opciones.onError = this.errorSolicitud;
			}
			if(!opciones.onSend){
				opciones.onSend  = this.antesEnvioSolicitud;
			}
			if(!opciones.onCompletado){
				opciones.onCompletado = this.solicitudCompletada;
			}
			if(!opciones.onExito){
				opciones.onExito = this.exitoSolicitud;
			}
			if(!opciones.onProgreso){
				opciones.onProgreso = this.muestraProgreso;
			}
			if(!opciones.crossD){
				opciones.crossD = false;
			}
			var cargadorPagina = $.ajax({
				processData: false,
				url: objetivo,
				cache: false,
				data: opciones.contenidos,
				type: opciones.metodo,
				dataType: opciones.tipoResultado,
				error: opciones.onError,
				beforeSend: opciones.onSend,
				complete: opciones.onCompletado,
				success: opciones.onExito,
				crossDomain: opciones.crossD,
				onProgreso:opciones.onProgreso,
				id:opciones.id
			})
			return cargadorPagina;
		},
		muestraProgreso:function(evt){
			if (evt.lengthComputable) {
				var percentComplete = evt.loaded / evt.total;
				console.log(percentComplete);
			}else{
				console.log("Muestra progreso sin avance");
			}
		},
		errorSolicitud:function(xhr, opcionesAjax, errorArrojado) {
			console.log("Error al generar la vista previa");
			console.log(xhr.responseText);
			console.log(errorArrojado);
			
		},
		antesEnvioSolicitud:function(evt,opciones) {
			console.log("antesEnvioSolicitud");
		},
		solicitudCompletada:function(evt,estado) {
			console.log("solicitudCompletada");
		},
		exitoSolicitud:function(data, estado, xhr) { 
			/*
			if(data){
				var nombreArchivo = obtieneNombre(xhr);
				var downloadUrl = URL.createObjectURL(data);
				var a = document.createElement("a");
				a.href = downloadUrl;
				a.download = nombreArchivo;
				document.body.appendChild(a);
				a.click();
			}*/
			console.log("exitoSolicitud");
		}
   }
})(jQuery);

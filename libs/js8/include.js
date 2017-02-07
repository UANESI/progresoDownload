// JavaScript Document
function abrir(opcion,archivo,destino,opciones){
	//alert(opcion+"|"+archivo+"|"+destino+"|"+opciones)
	if(!destino){
		destino = "_self"	
	}
	if(!opciones){
		opciones = ""	
	}
	if(opcion==0){
		if (confirm("¿Desea realmente eliminar este item?")) {
			window.open(archivo,destino,opciones)
		}else {
			return false
		}
	}else{
			window.open(archivo,destino,opciones)
	}
}
function muestraErrorInput(input,estado){
	if (input.parent().hasClass('input-control')) {
		input.parent().removeClass('error success');
	}
	if(estado){
		if (input.parent().hasClass('input-control')) {
			input.parent().addClass('error');
		} else {
			input.addClass('error');
		}
	}else{
		if (input.parent().hasClass('input-control')) {
			input.parent().addClass('success');
		} else {
			input.addClass('success');
		}
	}
}
function muestraMensajeCuadro(mensaje){
	if($("#dialog2")){
		var dialog = $("#dialog2").data('dialog');
		if(mensaje != undefined){
			mensaje = "<h1>Enviando data al servidor</h1>";
		}
		$("#dialogInterno2").html(mensaje);
		dialog.open();
	}
}
function secondeenminute(sec) {
	if ((sec/60)<1) {
		return  sec+'sec.' ;
	} else if ((sec/60)>1 && (sec/3600)<1) {
		var min = sec/60;
		sec = sec % 60;
		return  Math.floor(min)+'min. '+Math.floor(sec)+'sec.' ;
	} else {
		var hou = sec/3600;
		var rmin = sec % 3600;
		var min = rmin/60;
		sec = rmin % 60;
		return  Math.floor(hou)+'h. '+Math.floor(min)+'min. '+Math.floor(sec)+'sec.' ;
	}
}
function reemplazaCadena(busca,cambia,texto){
	while(texto.indexOf(busca)>-1){
    	texto = texto.replace(busca,cambia);
    }
	return texto;
}
function adecuaValor(valor){
	if(valor.indexOf(",") > -1 && valor.indexOf(".") > -1){
		if(valor.lastIndexOf(",") > valor.lastIndexOf(".")){
			valor = reemplazaCadena(",","|",valor);
			valor = reemplazaCadena(".","",valor);
			valor = reemplazaCadena("|",".",valor);
		}else{
			valor = reemplazaCadena(",","",valor);
		}	
	}else if(valor.indexOf(",") > -1){
		valor = reemplazaCadena(",",".",valor);
	}
	if(isNaN( parseFloat(valor))){
		valor = 0.00;
	}
	return parseFloat(valor);
}
function rtrim(str){
    return str.replace(/\s+$/, '');
}
function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}
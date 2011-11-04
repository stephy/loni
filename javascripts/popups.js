// JavaScript Document
//defining height for canvas -- should be removed out of popup.js
jQuery(document).ready(function(){
	var offset_top = $('#tabs-menu').height()+ $('#module-groupings').height();
	var offset_buttons = $('#play_buttons').height();
	var browser_height = $(document).height() -offset_top;
	var canvas_height =  browser_height - offset_top - offset_buttons-30;
	
	$('#wrapper').css('height', browser_height);
	$('#canvas-body').css('height', canvas_height);
	$('#canvas-1').css('height', canvas_height);
	
	
});
jQuery(document).ready(function(){
	// --------------------------------------
	//SHOW AND HIDE TAGS FOR MODULE POPUP
	// --------------------------------------
	
	$('#module-info-bt').click(function(){
		$('#module-info.popup-tab').show();
		$('#module-info-module.popup-tab').show();
		$('#module-info-module-website.popup-tab').show();
	});
	$('#module-parameters-bt').click(function(){
		$('.popup-tab').hide();
		$('#module-parameters.popup-tab').show();
	});
	$('#module-execution-bt').click(function(){
		$('.popup-tab').hide();
		$('#module-execution.popup-tab').show();
	});
	$('#module-metadata-bt').click(function(){
		$('.popup-tab').hide();
		$('#module-metadata.popup-tab').show();
	});
	
	//show and hide tabs for module-info tabs
	$('#module-info-provenence-bt').click(function(){
		$('.popup-tab').hide();
		$('#module-info.popup-tab').show();
		$('#module-info-provenence.popup-tab').show();
	});
	
	$('#module-info-module-bt').click(function(){
		$('.popup-tab').hide();
		$('#module-info.popup-tab').show();
		$('#module-info-module.popup-tab').show();
		$('#module-info-module-website.popup-tab').show();
	});
	
	$('#mod-info-mod-website-bt').click(function(){
		$('.popup-tab').hide();
		$('#module-info.popup-tab').show();
		$('#module-info-module.popup-tab').show();
		$('#module-info-module-website.popup-tab').show();
	});
	
	$('#mod-info-mod-citations-bt').click(function(){
		$('.popup-tab').hide();
		$('#module-info.popup-tab').show();
		$('#module-info-module.popup-tab').show();
		$('#module-info-module-citations.popup-tab').show();
	});
	
	$('#mod-info-mod-license-bt').click(function(){
		$('.popup-tab').hide();
		$('#module-info.popup-tab').show();
		$('#module-info-module.popup-tab').show();
		$('#module-info-module-license.popup-tab').show();
	});

	
	// --------------------------------------
	//SHOW AND HIDE TAGS FOR DATA SINK POPUP
	// --------------------------------------
	
	$('#data-sink-info-bt').click(function(){
		$('.popup-tab').hide();
		$('#data-sink-info.popup-tab').show();
	});
	$('#data-sink-outputs-bt').click(function(){
		$('.popup-tab').hide();
		$('#data-sink-outputs.popup-tab').show();
	});
	
	// --------------------------------------
	//SHOW AND HIDE TAGS FOR DATA SOURCE POPUP
	// --------------------------------------
	
	$('#data-source-info-bt').click(function(){
		$('.popup-tab').hide();
		$('#data-source-info.popup-tab').show();
	});
	$('#data-source-inputs-bt').click(function(){
		$('.popup-tab').hide();
		$('#data-source-inputs.popup-tab').show();
	});
	
	
	//close popups
	$('#close-popup-module').click(function(){
		$('#popup-module').hide();
	});
	
	$('#close-popup-data-sink').click(function(){
		$('#popup-data-sink').hide();
	});
	
	$('#close-popup-data-source').click(function(){
		$('#popup-data-source').hide();
	})
	
});
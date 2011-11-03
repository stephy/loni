// JavaScript Document

jQuery(document).ready(function(){
	//Show and hide tabs for module popup
	$('#module-info-bt').click(function(){
		console.log('module-info tag clicked');
		$('#module-info.popup-tab').show();
		$('#module-info-module.popup-tab').show();
		$('#module-info-module-website.popup-tab').show();
	});
	$('#module-parameters-bt').click(function(){
		console.log('module-para tag clicked');
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
	
});
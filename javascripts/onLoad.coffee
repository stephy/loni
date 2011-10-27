$ ->
	items = []
	location = ""
	$('body').dblclick (e)->
		location = e
		$('#main-menu').toggle().css({top:e.offsetY, left:e.offsetX})
	
	$('body').click (e)->
		$('#main-menu').hide()
		
	$('#option_module').click (e)->
		canvas.newDataSink(location)
			
	canvas = new canvasDisplay($('#canvas'))
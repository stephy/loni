$ ->
	items = []
	
	$('body').dblclick (e)->
		if(e.target.nodeName=='svg')
			canvas.newDataSink(e)
			
	canvas = new canvasDisplay($('#canvas'))
$ ->
	MAXWIDTH = $('#canvas').width()
	MAXHEIGHT = $('#canvas').height()

	items = []
	location = ""
	
	# Disable right click
	$(document).bind 'contextmenu' , (e) ->
		location = e
		posx = e.offsetX
		posy = e.offsetY
		menuWidth = $('#main-menu').width()
		menuHeight = $('#main-menu').height()
		if( (posx+menuWidth) > MAXWIDTH)
			posx = MAXWIDTH - menuWidth
			$('ul.menu li ul').css(left:-161)
		else
			$('ul.menu li ul').css(left:161)
		if( (posy + menuHeight) > MAXHEIGHT )
			posy = MAXHEIGHT- menuHeight
			
		if canvas.isSelected()
			$('#main-menu').show().css({top:posy, left:posx})
		else
			$('#edit-menu').show().css({top:posy, left:posx})
		return false

	$('body').click (e)->
		$('#main-menu').hide()
		$('#edit-menu').hide()
		canvas.removeGlow()
		
	$('#option_module').click (e)->
		canvas.newModule(location)
			
	canvas = new canvasDisplay($('#canvas'))
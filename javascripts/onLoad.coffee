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
			$('#edit-menu').hide()
			$('#main-menu').show().css({top:posy, left:posx})
		else
			$('#main-menu').hide()
			$('#edit-menu').show().css({top:posy, left:posx})
		return false

	$('body').click (e)->
		$('#main-menu').hide()
		$('#edit-menu').hide()
		if(e.target.nodeName != "circle")
			canvas.removeGlow()
	
	# orig_x = 0
	# orig_y = 0
	# drag = false
	# selectRect = ""
	# $('body').mousedown (e) ->
	# 	if e.which ==1 && (e.target.nodeName != "circle")
	# 		drag = true
	# 		orig_x = e.offsetX
	# 		orig_y = e.offsetY
	# 		selectRect = canvas.select(orig_x, orig_y, 1, 1)
	# $('body').mouseup (e) ->
	# 	if e.which ==1 && (e.target.nodeName != "circle")
	# 		if e.which ==1
	# 			drag = false
	# 			selectRect.remove()
	# $('body').mousemove (e) ->
	# 	selectRect.remove() # error-> when selectRect is empty
	# 	if e.which ==1 && (e.target.nodeName != "circle")
	# 		if drag
	# 			selectRect.remove()
	# 			selectRect = canvas.select(orig_x, orig_y, e.offsetX-orig_x , e.offsetY-orig_y)
	# 	
	$('#option_module').click (e)->
		canvas.newModule(location)
			
	canvas = new canvasDisplay($('#canvas'))
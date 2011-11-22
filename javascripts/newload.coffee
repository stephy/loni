$ ->
	
	
	r = Raphael("holder", 640, 480)
	shapes = [  r.ellipse(190, 100, 30, 20),
              r.rect(290, 80, 60, 40, 10),
              r.rect(290, 180, 60, 40, 2),
              r.ellipse(450, 100, 20, 20)
          ];

	startDraw = false
	prevPosition = {}
	curPosition = {}
	theRect = undefined

	
	$('body').mousedown (e) ->
		startDraw= true
		prevPosition = {x:e.offsetX, y:e.offsetY}
	
	# .mousemove (e) ->
	# 	if startDraw
	# 		curPosition = {x:e.offsetX, y:e.offsetY}
	# 		
	# 		if theRect != undefined
	# 			theRect.remRect(theRect.getRect())
	# 		theRect = new rect(r, prevPosition.x, prevPosition.y, curPosition.x, curPosition.y)
	# 		
	# 		for i in [1..3] 
	# 			if theRect.testRange(shapes[i].getBBox())
	# 				theRect.setGlow(shapes[i], true)
	# 			else 
	# 				theRect.setGlow(shapes[i], false)
			
			

	.mouseup ->
		startDraw=false
		theRect.remRect(theRect.getRect())
		theRect=undefined


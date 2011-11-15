window.rect = class rect
	
	existingRect = {}
	
	
	constructor: (r, @prev, @cur) ->
		@prevX = @prev.x
		@prevY = @prev.y
		@curX = @cur.x
		@curY = @cur.y
		@height = @curY - @prevY
		@width = @curX - @prevX
		@newX = @prevX
		@newY = @prevY
		if @height >= 0 and @width >= 0
		else if @height <= 0 and @width <= 0
			@height = Math.abs(@height)
			@width = Math.abs(@width)
			@newX = @prevX-@width
			@newY = @prevY-@height
		else if @height <= 0 and @width >= 0
			@height = Math.abs(@height)
			@newY = @prevY-@height
		else if @height >= 0 and @width <= 0
			@width = Math.abs(@width)
			@newX = @prevX-@width
			
		existingRect = r.rect(@newX, @newY, @width, @height)
	
	getRect: () ->
		return existingRect
		
		
	remRect: (existRect) ->
		existRect.remove()
		
	testRange: (@obj) ->
		if @obj.x > @newX+@width or @obj.x + @obj.width < @newX or @obj.y + @obj.height < @newY or @obj.y > @newY + @height
			return false
		return true
			
	setGlow:(curObj, state) ->
		@c = curObj.glow()
		if state
			@c = curObj.glow()
		else
			@c.remove()
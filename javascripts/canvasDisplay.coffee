window.canvasDisplay = class canvasDisplay
	constructor: (canvas) ->
		@paper = Raphael(0, 0, canvas.width(), canvas.height())
		@glow = ""
		@linkHover = false
	newModule: (e)->
		item = new module(@, e)
	newDataSink: (e)->
		item = new dataSink(@, e)

	setGlow: (c) ->
		if (@glow!="") then @glow.remove()
		@glow = c.glow({color:'#000'})
		
	removeGlow: ->
		if (@glow!="")
			@glow.remove()
			@glow = ""
	
	isSelected: ->
		if (@glow!="") then return false else return true		
	
	select: (x, y, w, h) ->
		@paper.rect(x, y, w, h)
	
	setHover: ->
		@linkHover = true
	unsetHover: ->
		@linkHover = false
	isHover: ->
		return @linkHover
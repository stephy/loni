window.canvasDisplay = class canvasDisplay
	constructor: (canvas) ->
		position = canvas.position()
		@paper = Raphael(position.left, position.top, canvas.width(), canvas.height())
		@glow = ""
		@linkHover = false
		@pathStartCoord = {}
	newModule: (coord)->
		item = new module(@, coord)
	newDataSink: (coord)->
		item = new dataSink(@, coord)

	setGlow: (obj) ->
		if (@glow!="") then @glow.removeAll()
		@glow = obj.glowAll({color:'#000'})
		
	removeGlow: ->
		if (@glow!="")
			@glow.removeAll()
			@glow = ""
	
	startStartPath: (obj) ->
		@startPathCoord = obj
		
	drawPath: (coord) ->
		console.log "draw path"
		
	removePath: ->
		console.log "removed Path"
	
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
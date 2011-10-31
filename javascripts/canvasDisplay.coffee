window.canvasDisplay = class canvasDisplay
	constructor: (canvas) ->
		position = canvas.position()
		@paper = Raphael(position.left, position.top, canvas.width(), canvas.height())
		@glow = ""
		@linkHover = false
		@pathStartCoord = {}
		@paths = []
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
	
	startStartPath: (obj, startObj) ->
		@startPathCoord = obj
		@startObj = startObj
		console.log @startPathCoord
		
	drawPath: (coord) ->
		if @path
			@path.remPath(@path.getPath())
		newcoord = {x: @startPathCoord.x + coord.x, y: @startPathCoord.y + coord.y}
		@path = new path(@paper, @startPathCoord, newcoord)
		
	removePath: ->
		@path.remPath(@path.getPath())
	
	savePath: (coord, endObj)->
		# Start obj is @startObj, end obj is endObj
		@startObj.c.drag(pathdragger,pathmove,pathup)
		endObj.c.drag(pathdragger,pathmove,pathup)
		@paths.push(@paper.connection2(@startObj.c, endObj.c, "#000"))
		return @startPathCoord
	
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
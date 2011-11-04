window.canvasDisplay = class canvasDisplay
	constructor: (canvas) ->
		position = canvas.position()
		@paper = Raphael(position.left, position.top, canvas.width(), canvas.height())
		@offsetCoord = {dx: position.left, dy:position.top}
		@glow = ""
		@linkHover = false
		@pathStartCoord = {}
		@paths = []
		@drawingPath = false
	newModule: (coord)->
		item = new module(@, coord)
	newDataSink: (coord)->
		item = new dataSink(@, coord)
	newDataSource: (coord)->
		item = new dataSource(@, coord)

	setGlow: (obj) ->
		if (@glow!="") then @glow.removeAll()
		@glow = obj.glowAll({color:'#000'})
		
	removeGlow: ->
		if (@glow!="")
			@glow.removeAll()
			@glow = ""

# ------ Drawing paths ------
	isDrawing: ->
		return @drawingPath
	startPathType: ->
		return @startObj.getType()
		
	startStartPath: (boxCoord, startObj, startCoord) ->
		@startPathCoord = boxCoord
		@startObj = startObj
		@drawingPath = true
		
	drawPath: (coord) ->
		if @path
			@path.remPath(@path.getPath())
		@path = new path(@paper, @startPathCoord, {x:coord.x-@offsetCoord.dx, y:coord.y-@offsetCoord.dy})
		
	removePath: ->
		@drawingPath = false
		@path.remPath(@path.getPath())
	
	savePath: (coord, endObj)->
		# Start obj is @startObj, end obj is endObj
		if @startObj.getType() != endObj.getType()
			@paths.push(@paper.connection2(@startObj.c, endObj.c, "#000"))
		@drawingPath = false
		return @startPathCoord
	translatePaths: ->
		for ele in @paths
			@paper.connection2(ele)
# ------ end of Drawing paths ------

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
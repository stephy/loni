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
		@rectangle = undefined
		@holder = []
		@onselect = []
		
	newModule: (coord, attr)->
		@holder.push(new module(@, coord, attr))
	newDataSink: (coord, attr)->
		@holder.push(new dataSink(@, coord, attr))
	newDataSource: (coord, attr)->
		@holder.push(new dataSource(@, coord, attr))

	setGlow: (obj) ->
		if (obj.moduleGlow!="") then obj.removeAll()
		if @rectangle != undefined and @rectangle.testRange(obj.c.getBBox())
			obj.glowAll({color:'#000'})
		
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
		
		
# ---- Rectangle
	deleteRect: ->
		if @rectangle != undefined
			@setSelectedElements()
			@rectangle.remRect(@rectangle.getRect())
			@rectangle = undefined
		
	setSelectedElements: ->
		for i in [0..@holder.length-1]
			if @rectangle.testRange(@holder[i].c.getBBox())
				@onselect.push(@holder[i])
# ---end of rectangle selects
		
		
# ----remove
	sremove: =>
		@paper.clear()
		
	setLight: ->
		for i in [0..@holder.length-1]
			this.setGlow(@holder[i])
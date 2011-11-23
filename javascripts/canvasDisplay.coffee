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
		@selectedObjectArray = []
		@rectangleStatus = 0
		
	newModule: (coord, attr)->
		a = new module(@, coord, attr)
		@holder.push(a)
		return a
	newDataSink: (coord, attr)->
		a = new dataSink(@, coord, attr)
		@holder.push(a)
		return a
	newDataSource: (coord, attr)->
		a = new dataSource(@, coord, attr)
		@holder.push(a)
		return a

	setGlow: (obj) ->
		if (obj.moduleGlow!="") then obj.removeAll()
		if @rectangle != undefined and @rectangle.testRange(obj.c.getBBox())
			@selectedObjectArray.push(obj)
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
		@rectangleStatus = 1
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
			@rectangleStatus = 0
		@drawingPath = false
		return @startPathCoord
	translatePaths: ->
		
		for ele in @paths
			@paper.connection2(ele)
# ------ end of Drawing paths ------

# --- moving object infront of the paths
	moveToFront: ->
		for ele in @holder
			ele.c.toFront()

	isSelected: ->
		if (@selectedObjectArray.length > 0) then return true else return false
	
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
			# @setSelectedElements()
			@rectangle.remRect(@rectangle.getRect())
			@rectangle = undefined
		
	setSelectedElements: ->
		for i in [0..@holder.length-1]
			if @rectangle.testRange(@holder[i].c.getBBox())
				@selectedObjectArray.push(@holder[i])
# ---end of rectangle selects
		
		
# ----remove
	sremove: =>
		@paper.clear()
		
	setLight: ->
		@selectedObjectArray = []
		for i in [0..@holder.length-1]
			this.setGlow(@holder[i])
			
			#data source 2 data sink 1 module 0
	gCopy: (objArray) ->
		for i in [0..objArray.length-1]
			if objArray[i].modID is 0 then newDataSink({x:300, y:300}, {name: "Song!"})
			else if objArray[i].modID is 1 then console.log "data sink"
			else console.log "data source"
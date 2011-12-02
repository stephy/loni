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
		@selectedTranslate = false

	newModule: (coord, attr)->
		nattr = $.extend(true, {}, attr)
		nattr['objectType'] = "module"
		nattr['parameter'] = [1,2,3, 4, 5]
		a = new module(@, coord, nattr)
		@holder.push(a)
		return a
	newDataSink: (coord, attr)->
		nattr = $.extend(true, {}, attr)
		nattr['objectType'] = "dataSink"
		a = new dataSink(@, coord, nattr)
		@holder.push(a)
		return a
	newDataSource: (coord, attr)->
		nattr = $.extend(true, {}, attr)
		nattr['objectType'] = "dataSource"
		a = new dataSource(@, coord, nattr)
		@holder.push(a)
		return a
		
	newGroup: (coord) ->
		console.log "CREATING NEW GROUP1"
		nattr = {elements: @selectedObjectArray}
		nattr['objectType'] = "group"
		a = new groupmodule(@, coord, nattr)
		@holder.push(a)

# Translation:
	translateSelected: (x, y) ->
		for ele in @selectedObjectArray
			ele.ztranslate(x, y)

# --------- Setting glows ----------
	setGlow: (obj) ->
		if (obj.moduleGlow!="") then obj.removeAll()
		if @rectangle != undefined and @rectangle.testRange(obj.c.getBBox())
			@selectedObjectArray.push(obj)
			if obj.modID isnt 0
				obj.objs[0].isBeingSelected = 1
			obj.glowAll({color:'#000'})

	setAllSelectedGlow: () ->
		for i in [0..@holder.length-1]
			@selectedObjectArray.push(@holder[i])
			if @holder[i].modID isnt 0
				@holder[i].objs[0].isBeingSelected = 1
			@holder[i].glowAll({color:'#000'})
		
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
			#use HASHMAP	
			@startObj.connectedObject = endObj
			endObj.connectedObject = @startObj
			@rectangleStatus = 0
		@drawingPath = false
		#console.log @map[@startObj.c]
		return @startPathCoord
		
	savePathForCopy: (obj1, obj2) ->
		@startObj = obj1
		endObj = obj2
		if @startObj.getType() != endObj.getType()
			@paths.push(@paper.connection2(@startObj.c, endObj.c, "#000"))
			#use HASHMAP	
			@startObj.connectedObject = endObj
			endObj.connectedObject = @startObj
			@rectangleStatus = 0
		@drawingPath = false
		#console.log @map[@startObj.c]
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
		if @holder.length > 0
			for j in [0..@holder.length-1]
				if @holder[j].objs[0] != undefined
					@holder[j].objs[0].isBeingSelected = 0
			for i in [0..@holder.length-1]
				this.setGlow(@holder[i])
			
			#data source 2 data sink 1 module 0
	gCopy: ->
		for i in [0..@selectedObjectArray.length-1]	
		#	console.log @selectedObjectArray[i].c + i		
			@selectedObjectMap[@selectedObjectArray[i].c] = i
		for j in [0..@selectedObjectArray.length-1]
			console.log "here is j" + j
			console.log @selectedObjectMap[@selectedObjectArray[j].c]
			
			
		
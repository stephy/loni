# Descrip: Every object has children. When the object glows, his children glows. When the object moves, his children should also move.
# Children can be moved, have glow

class baseModule
	constructor: (@disp, @prevCoord, @attr)->
		@dim = {width: 50, height:50}
		@c = @draw()
		@objs = []
		@coord = {x:0, y:0}
		@id = 0
		@c.drag(@drag, @mDown, @mUp)
		@c.hover(@hoverIn, @hoverOut)
		@moduleGlow = ""
	draw: ->
		c = @disp.paper.circle(@prevCoord.x,@prevCoord.y,40)
		c.attr(fill: '#ddf', stroke: '#33f', 'stroke-width':3)
		return c
	insertChildren: (obj)->
		@objs.push(obj)
	hoverIn: =>
		dim = @c.getBBox()
		@text = @disp.paper.text(dim.x+dim.width/2,dim.y+dim.height/2, @attr.name)
	hoverOut: =>
		@text.remove()
	drag: (dx, dy) =>
		elmt = @c.getBBox()
		tx = 0
		ty = 0
		#Calculating tx
		if ( elmt.x + elmt.width > @disp.paper.width)
			tx = -10
		else if (elmt.x < 10)
			tx = 10
		else
			tx = dx - @prevCoord.x
		#Calculating ty	
		if ( elmt.y + elmt.height > @disp.paper.height - 10)
			ty = -10	
		else if (elmt.y < 10)
			ty = 10
		else
			ty = dy - @prevCoord.y
		@ztranslate(tx, ty)
		@prevCoord = {x: dx, y: dy}
		@text.remove()
	mDown: () =>
		@text.remove()
		@coord = {x: @c.attr("cx"), y: @c.attr("cy")}
		@prevCoord = {x:0, y:0}
		@disp.setGlow(@)
		return false
	glowAll: (attr) ->
		@glowing = @c.glow(attr)
		for ele in @objs
			ele.glowAll(attr)
		return @
	removeAll: ->
		@glowing.remove()
		for ele in @objs
			ele.removeAll()
		return @
						
	ztranslate: (dx,dy) =>
		# if @glowing
		# 	@glowing.translate(dx, dy)
		@c.translate(dx,dy)
		for ele in @objs
			ele.ztranslate(dx, dy)
			
window.module = class module extends baseModule
	
window.sink = class sink extends baseModule
	constructor: (@disp, @prevCoord, @attr)->
		super(@disp, @prevCoord, @attr)
		@connectable = true
		@c.mouseup(@otherMouseUp)
		
	draw: ->
		connectDim = {x: @dim.width/2 +  @prevCoord.x , y:  @prevCoord.y - @dim.height/2}
		c = @disp.paper.circle(connectDim.x,connectDim.y,10)
		c.attr(fill: '#ddf', stroke: '#33f', 'stroke-width':1)
		return c
	
	drag: (dx, dy, x, y) =>
		@prevCoord = {x: dx, y: dy}
		@disp.drawPath({x:x, y:y})
		@text.remove()
	mDown: (x,y) =>
		@text.remove()
		@prevCoord = {x:0, y:0}
		@disp.setGlow(@)
		@disp.startStartPath(@c.getBBox(), @, {x:x, y:y})
		return false
	mUp:(e) =>
		@disp.removePath()
	getType: ->
		# Used for Path Connections
		return 'sink'
		
	otherMouseUp: (e) =>
		@disp.savePath(@c.getBBox(), @)
		
	hoverIn: =>
		dim = @c.getBBox()
		if (@disp.isDrawing() and @disp.startPathType() == @getType())
			@text = @disp.paper.text(dim.x+dim.width, dim.y+dim.height, "Cannot Connect!")
			@text.attr({stroke: '#f00'})
		else
			@text = @disp.paper.text(dim.x+dim.width, dim.y+dim.height, @attr.name)
	hoverOut: =>
		@text.remove()
	ztranslate: (dx,dy) =>
		super(dx, dy)
		@disp.translatePaths()


window.dataSink = class dataSink extends baseModule
	constructor: (@disp, @prevCoord, @attr)->
		super(@disp, @prevCoord, @attr)
		@objs.push(new sink(@disp, @prevCoord))
	draw: ->
		c = @disp.paper.path("M #{@prevCoord.x} #{@prevCoord.y} l #{@dim.height} 0 l -#{@dim.width/2} #{@dim.height} z")
		c.attr({stroke:'#00f', fill:'#0f0'})
		return c

window.source = class source extends sink
	constructor: (@disp, @prevCoord, @attr)->
		super(@disp, @prevCoord, @attr)
		@connectable = true
		@c.mouseup(@otherMouseUp)
	draw: ->
		start = {x: @dim.width/2 +  @prevCoord.x , y:  @prevCoord.y - @dim.height/2}
		c = @disp.paper.path("M #{@prevCoord.x} #{@prevCoord.y-@dim.height} l #{@dim.width/4} #{@dim.height/4} l -#{@dim.width/2} 0 z")
		c.attr(fill: '#ddf', stroke: '#33f', 'stroke-width':1)
		return c
	getType: ->
		# Used for Path Connections
		return 'source'


window.dataSource = class dataSource extends baseModule
	constructor: (@disp, @prevCoord, @attr)->
		super(@disp, @prevCoord, @attr)
		@objs.push(new source(@disp, @prevCoord))
	draw: ->
		c = @disp.paper.circle(@prevCoord.x,@prevCoord.y,@dim.height/2)
		c.attr({stroke:'#000', fill:'#aaa'})
		return c
		
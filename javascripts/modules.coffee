# Descrip: Every object has children. When the object glows, his children glows. When the object moves, his children should also move.
# Children can be moved, have glow

class baseModule
	constructor: (@disp, @prevCoord)->
		@dim = {width: 50, height:50}
		@c = @draw()
		@objs = []
		@id = 0
		@name = "Sexy Stephy"
		@c.drag(@drag, @mDown, @mUp)
		@c.hover(@hoverIn, @hoverOut)
	draw: ->
		c = @disp.paper.circle(@prevCoord.x,@prevCoord.y,25)
		c.attr(fill: '#ddf', stroke: '#33f', 'stroke-width':3)
		return c
	insertChildren: (obj)->
		@objs.push(obj)
	hoverIn: =>
		dim = @c.getBBox()
		@text = @disp.paper.text(dim.x+dim.width/2,dim.y+dim.height/2, @name)
	hoverOut: =>
		@text.remove()
	drag: (dx, dy) =>
		@disp.glow.ztranslate(dx-@prevCoord.x,dy-@prevCoord.y)
		@prevCoord = {x: dx, y: dy}
		@text.remove()
	mDown: (x,y) =>
		@text.remove()
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
		if @glowing
			@glowing.translate(dx, dy)
		@c.translate(dx,dy)
		for ele in @objs
			ele.ztranslate(dx, dy)

window.module = class module extends baseModule
	
window.sink = class sink extends baseModule
	constructor: (@disp, @prevCoord)->
		super(@disp, @prevCoord)
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
		
	otherMouseUp: (e) =>
		@disp.savePath(@c.getBBox(), @)
		
	hoverIn: =>
		dim = @c.getBBox()
		@text = @disp.paper.text(dim.x+dim.width, dim.y+dim.height, @name)
	hoverOut: =>
		@text.remove()
	ztranslate: (dx,dy) =>
		super(dx, dy)
		@disp.translatePaths()


window.dataSink = class dataSink extends baseModule
	constructor: (@disp, @prevCoord)->
		super(@disp, @prevCoord)
		@objs.push(new sink(@disp, @prevCoord))
	draw: ->
		c = @disp.paper.path("M #{@prevCoord.x} #{@prevCoord.y} l #{@dim.height} 0 l -#{@dim.width/2} #{@dim.height} z")
		c.attr({stroke:'#00f', fill:'#0f0'})
		return c
		

window.dataSource = class dataSource extends baseModule
	constructor: (@disp, @prevCoord)->
		super(@disp, @prevCoord)
		@objs.push(new sink(@disp, @prevCoord))
	draw: ->
		# c = @disp.paper.path("M #{@prevCoord.x} #{@prevCoord.y} l #{@dim.height} 0 l -#{@dim.width/2} #{@dim.height} z")
		c = @disp.paper.circle(@prevCoord.x,@prevCoord.y,@dim.height/2)
		c.attr({stroke:'#00f', fill:'#0f0'})
		return c
		
	# constructor: (@disp, coord)->
	# 	@dim = {width: 50, height:50}
	# 	@tri = @disp.paper.path("M #{coord.x} #{coord.y} l #{@dim.height} 0 l -#{@dim.width/2} #{@dim.height} z")
	# 	@tri.attr({stroke:'#00f', fill:'#0f0'})
	# 	
	# 	# Draw connector
	# 	@connectDim = {x: @dim.width/2 + coord.x, y: coord.y - @dim.height/2}
	# 	@connect = @disp.paper.circle(@connectDim.x,@connectDim.y,10)
	# 
	# 	# @c = @disp.paper.circle(coord.x,coord.y,50)
	# 	@dxOld=0
	# 	@dyOld=0
	# 	@objs = []
	# 	@objs.push(@)
		
	# initialize: ->
	# 	@c.attr("fill", '#f00')
	# 	@c.attr('stroke', '#000')
	# 	@disp.setGlow(@c)
	# 	
	# 	@sink = new sink(@disp, @c.getBBox())
	# 	@objs.push(@sink)
	# 	
	# 	@c.hover =>
	# 		@disp.setGlow(@c)
	# 
	# 	@c.drag(@drag, @mDown)
		
		



# window.path = class path
# 	constructor: (@startx, @starty, @endx, @endy, @disp) ->
# 		@empty = false
# 		@path = @disp.paper.path(@getStringPath())
# 	setStart: (x, y) ->
# 		@startx = x
# 		@starty = y
# 	setEnd: (x,y) ->
# 		@endx = x
# 		@endy = y
# 	getStringPath: ->
# 		return "M #{@startx} #{@starty} l #{@endx} #{@endy}"
# 	makePath: ->
# 		@path.remove()
# 		@path = @disp.paper.path(@getStringPath())
# 	destroy: ->
# 		@empty= true
# 		@path.remove()
		
# window.sink = class sink
# 	constructor: (@disp, @dim) ->
# 		@d = @disp.paper.circle(dim.x+dim.width/2,dim.y,10)
# 		@d.attr("fill", '#faa')
# 		@d.attr('stroke', '#000')
# 		@d.hover =>
# 			@disp.setGlow(@d)
# 			@disp.setHover()
# 		, =>
# 			@disp.unsetHover()
# 		@d.drag(@drag, @mDown, @mUp)
# 		@path = new path(0,0,0,0, @disp)
# 	drag: (dx, dy) =>
# 		@path.setEnd(dx,dy)
# 		@path.makePath()
# 		
# 	mDown: (x,y) =>
# 		@path.setStart(x, y)
# 		@disp.setGlow(@d)
# 		
# 	mUp: (x, y) =>
# 		if !@disp.isHover()
# 			@path.destroy()
# 	ztranslate: (x,y) =>
# 		@path.setStart(@path.startx+x, @path.starty+y)
# 		@path.setEnd(@path.endx-x, @path.endy-y)
# 		@path.makePath()
# 		@d.translate(x,y)


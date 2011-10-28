window.module = class module
	constructor: (@disp, e)->
		@c = @disp.paper.circle(e.offsetX,e.offsetY,50)
		@dxOld=0
		@dyOld=0
		@objs = []
		@objs.push(@)
		@c.attr(fill: '#ddf', stroke: '#33f', 'stroke-width':3)
		@c.drag(@drag, @mDown)
		@c.click(@click)
	drag: (dx, dy) =>
		for ele in @objs
			ele.ztranslate(dx-@dxOld , dy-@dyOld)
		@disp.glow.translate(dx-@dxOld,dy-@dyOld)
		@dxOld = dx
		@dyOld = dy
	mDown: (x,y) =>
		@dxOld=0
		@dyOld=0
		@disp.setGlow(@c)
	ztranslate: (dx,dy) =>
		@c.translate(dx,dy)
		




window.path = class path
	constructor: (@startx, @starty, @endx, @endy, @disp) ->
		@empty = false
		@path = @disp.paper.path(@getStringPath())
	setStart: (x, y) ->
		@startx = x
		@starty = y
	setEnd: (x,y) ->
		@endx = x
		@endy = y
	getStringPath: ->
		return "M #{@startx} #{@starty} l #{@endx} #{@endy}"
	makePath: ->
		@path.remove()
		@path = @disp.paper.path(@getStringPath())
	destroy: ->
		@empty= true
		@path.remove()
		

window.sink = class sink
	constructor: (@disp, @dim) ->
		@d = @disp.paper.circle(dim.x+dim.width/2,dim.y,10)
		@d.attr("fill", '#faa')
		@d.attr('stroke', '#000')
		@d.hover =>
			@disp.setGlow(@d)
			@disp.setHover()
		, =>
			@disp.unsetHover()
		@d.drag(@drag, @mDown, @mUp)
		@path = new path(0,0,0,0, @disp)
	drag: (dx, dy) =>
		@path.setEnd(dx,dy)
		@path.makePath()
		
	mDown: (x,y) =>
		@path.setStart(x, y)
		@disp.setGlow(@d)
		
	mUp: (x, y) =>
		if !@disp.isHover()
			@path.destroy()
	ztranslate: (x,y) =>
		@path.setStart(@path.startx+x, @path.starty+y)
		@path.setEnd(@path.endx-x, @path.endy-y)
		@path.makePath()
		@d.translate(x,y)
		

window.dataSink = class dataSink
	constructor: (@disp, e)->
		@c = @disp.paper.circle(e.offsetX,e.offsetY,50)
		@dxOld=0
		@dyOld=0
		@objs = []
		@objs.push(@)
		@initialize()
		
	initialize: ->
		@c.attr("fill", '#f00')
		@c.attr('stroke', '#000')
		@disp.setGlow(@c)
		
		@sink = new sink(@disp, @c.getBBox())
		@objs.push(@sink)
		
		@c.hover =>
			@disp.setGlow(@c)

		@c.drag(@drag, @mDown)
			
	drag: (dx, dy) =>
		for ele in @objs
			ele.ztranslate(dx-@dxOld , dy-@dyOld)
		if(@disp.glow != "") then @disp.glow.translate(dx-@dxOld,dy-@dyOld)
		@dxOld = dx
		@dyOld = dy
	mDown: (x,y) =>
		@dxOld=0
		@dyOld=0
		@disp.setGlow(@c)
	ztranslate: (dx,dy) =>
		@c.translate(dx,dy)
		
		

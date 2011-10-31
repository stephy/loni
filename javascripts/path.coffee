window.path = class path
	
	existingLine = {}
	
	constructor: (r, prevpos, pos) ->
		existingLine = r.connection(prevpos, pos, "#fff")		
	
	getPath: () ->
		return existingLine
		
	
	remPath: (existPath) ->
		existPath.line.remove()
		
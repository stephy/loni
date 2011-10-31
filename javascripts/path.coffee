window.path = class path
	
	existingLine = {}
	
	constructor: (r, @startPos, @endPos) ->
		existingLine = r.connection(@startPos, @endPos, "#000")
	
	getPath: () ->
		return existingLine
	
	remPath: (existPath) ->
		existPath.line.remove()
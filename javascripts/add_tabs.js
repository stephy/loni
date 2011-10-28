/*can be combined to other js later */
/* this script will add new tabs to the DOM */

// next Canvas index
// to create a new canvas unique id, we will:
// 1. traverse trhought the DOM
// 2. count the amount of canvases in the DOM
// 3. Assign an unique id to the canvas 
// 		which will be total_canvas+1
// RETURN: next canvas index
function nextCanvasIndex(){
	return $('.canvas').length +1;
}
jQuery(document).ready(function(){
	
	//create new canvas on create_blank click
	$('#add_new_canvas').click(function(){
		var new_canvas_index = nextCanvasIndex();
		$('<li>untitled</li>').insertBefore('#add_new_canvas');
		$('<div id="canvas-'+ new_canvas_index +'" class="canvas" width="300" height="300"></div>').appendTo('.canvae');
		//display the new/recently created canvas only, hide all others
		for(i=0; i<$('.canvas').length; i++){
			if(i== new_canvas_index){
				$('#canvas-'+ i).css('display', 'block');
			}
			else{
				$('#canvas-'+ i).css('display', 'none');
			}	
		}
	});
});

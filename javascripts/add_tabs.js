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
	
	//create new canvas on create_blank (+ tab button) click
	$('#add_new_canvas').click(function(){
		var new_canvas_index = nextCanvasIndex();
		var new_canvas_id = 'canvas-'+ new_canvas_index;
		$('.tabs li:eq(0)').clone().insertBefore('#add_new_canvas');
		$('<div id="'+ new_canvas_id +'" class="canvas"></div>').appendTo('.canvae');
		//display the new/recently created canvas only, hide all others
		$('.canvas').hide();
		$('#'+new_canvas_id).show();
	});
	
	
	//close canvas on close ( x tab button) click
	$('.button-close').click(function(){
		$(this).parent().remove()
		//$('#canvas-1').remove();
	});
	
});

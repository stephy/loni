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
		$('.tabs li:eq(0)').clone().insertBefore('#add_new_canvas').attr("canvas-id", new_canvas_id);
		$('<div id="'+ new_canvas_id +'" class="canvas"></div>').appendTo('.canvae');
		//display the new/recently created canvas only, hide all others
		$('.canvas').hide();
		$('#'+new_canvas_id).show();
	});
	
	
	//close canvas and tab on close ( x tab button) click
	$('.button-close').live('click', function(){
		var value = $(this).parent();
		var canvas_id = $(value).attr('canvas-id');
		var tabs_size = $('li').length -1;
		if (tabs_size >1){ //don't remove tabs if there's only one tab left
			$(value).remove(); 
			$('#'+canvas_id).remove();
		}	
	});
	
	//display canvas for the selected tab
	$('li:not(:first-child)').live('click', function(){
		var selected_canvas = $(this).attr('canvas-id');
		console.log(selected_canvas);
		$('.canvas').hide();
		$('#'+selected_canvas).show();
	});
	
	//adjstment for first tab
	//this tab can't be deleted, and this tab does 
	//not have an attribute tag 
	$('li:eq(0)').click(function(){
		$('.canvas').hide();
		$('.canvas:eq(0)').show();
	});
	
	
});

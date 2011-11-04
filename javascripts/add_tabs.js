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
	$('#add_new_canvas').live('click', function(){
		var new_canvas_index = nextCanvasIndex();
		var new_canvas_id = 'canvas-'+ new_canvas_index;
		$('.tabs li').removeClass('tabSelected');
		$('.tabs li:first').clone().addClass('tabSelected').insertBefore('#add_new_canvas').attr("canvas-id", new_canvas_id);
		$('<div id="'+ new_canvas_id +'" class="canvas"></div>').appendTo('.canvae');
		//display the new/recently created canvas only, hide all others
		$('.canvas').hide();
		$('#'+new_canvas_id).show();	
	});
	
	
	//close canvas and tab on close ( x tab button) click
	$('.button-close').live('click', function(){
		var value = $(this).parent();
		var canvas_id = $(value).attr('canvas-id');
		var tabs_size = $('#tabs-menu ul.tabs li').length -1;
		if (tabs_size >1){ //don't remove tabs if there's only one tab left
			$(value).remove(); 
			$('#'+canvas_id).remove();
		}
		//add highlight for the last tab on the screen that is not the plus (add) button
		// $("li:last-child").addClass('tabSelected');
	});
	
	//display canvas for the selected tab
	$('.tabs li:not(:first-child #add_new_canvas)').live('click', function(){
    // var selected_canvas = $(this).attr('canvas-id');
    // console.log(selected_canvas);
		$('.canvas').hide();
    $('.tabs li').removeClass('tabSelected');
    $(this).addClass('tabSelected')
    // $('[canvas-id='+ selected_canvas +']').addClass('tabSelected');//display highlighted tab
		$('#'+selected_canvas).show();
	});
	
	//adjstment for first tab
	//this tab can't be deleted, and this tab does 
	//not have an attribute tag 
	$('.tabs li:eq(0)').click(function(){
		$('.canvas').hide();
		$('.tabs li').removeClass('tabSelected');
		$('.tabs li:eq(0)').addClass('tabSelected');//display highlighted tab
		$('.canvas:eq(0)').show();
	});
	
	
});

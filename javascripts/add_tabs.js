/*can be combined to other js later */
/* this script will add new tabs to the DOM */

// next Canvas index
// to create a new canvas unique id, we will:
// 1. traverse trhought the DOM
// 2. count the amount of canvases in the DOM
// 3. Assign an unique id to the canvas 
// 		which will be total_canvas+1
// RETURN: next canvas index

canvasCounter = 1
function nextCanvasIndex(){
  canvasCounter += 1;
	return canvasCounter;
}
jQuery(document).ready(function(){
	
	//create new canvas on create_blank (+ tab button) click
	$('#add_new_canvas').live('click', function(){
		var new_canvas_index = nextCanvasIndex();
		var new_canvas_id = 'canvas-'+ new_canvas_index;
		console.log(new_canvas_id)
		$('.tabs li').removeClass('tabSelected');
		$('.tabs li:first').clone().attr("canvas-id", new_canvas_id).addClass('tabSelected').insertBefore('#add_new_canvas');

    currentCanvas = new canvasDisplay($('#canvas-1'));
		canvasHash[new_canvas_id]= currentCanvas;
	  $('svg:last').attr('id', 'svg-' + new_canvas_id);
	  $('svg').hide()
	  $("#svg-"+new_canvas_id).show();
	});
	
	
  //close canvas and tab on close ( x tab button) click
  $('.button-close').live('click', function(event){
   var value = $(this).parent();
   var canvas_id = $(value).attr('canvas-id');
   var tabs_size = $('#tabs-menu ul.tabs li').length -1;
   if (tabs_size >1){ //don't remove tabs if there's only one tab left
    var selected = false;
    if(value.is('.tabSelected')){
      selected = true;
    }
    $(value).remove(); 
    if(selected){
      canvasHash[canvas_id].sremove();
      $('.tabs li:first').click();
      event.stopPropagation();
    }
   }
   return false;
  });
  
  //display canvas for the selected tab
  $('#tabs-menu .tabs li:not(#add_new_canvas)').live('click', function(){
      var selected_canvas = $(this).attr('canvas-id');
      // Set Canvas to display
      currentCanvas = canvasHash[selected_canvas];
      $("svg").hide();
      $('#svg-'+selected_canvas).show()
      
      //change tab color
      $('.tabs li').removeClass('tabSelected');
      $(this).addClass('tabSelected')
  });
  
  
    //display highlits for popup selected tab
  $('.popup-controller .tabs li:not(#add_new_canvas)').live('click', function(){
      //change tab color
      $('.popup-controller .tabs li').removeClass('tabSelected');
      $(this).addClass('tabSelected')
  });

});

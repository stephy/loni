// JavaScript Document
var idx= 1;
function getNewParameter(idx){
	var new_parameter = '<tr>'+
          '<td>'+
          '<input name="m_parameter_name'+idx+'" type="text" id="m_parameter_name'+idx+'" value="New Parameter '+idx+'" size="25"></td>'+
          '<td>'+
            '<select name="m_type'+idx+'" id="m_type'+idx+'">'+
              '<option value="File" selected>File</option>'+
              '<option value="Directory">Directory</option>'+
              '<option value="String">String</option>'+
              '<option value="Number">Number</option>'+
             ' <option value="Enumerated">Enumerated</option>'+
              '<option value="FlowControl">Flow Control</option>'+
          '</select></td>'+
          '<td><select name="state'+idx+'" id="state'+idx+'">'+
            '<option value="Enabled" selected>Enabled</option>'+
            '<option value="Disabled">Disabled</option>'+
            '<option value="Exported">Exported</option>'+
          '</select></td>'+
          '<td><input type="checkbox" name="m_required'+idx+'" id="m_required'+idx+'"></td>'+
         ' <td><input name="m_input'+idx+'" type="checkbox" id="m_input'+idx+'" checked></td>'+
        '</tr> ';
		return new_parameter;
}
jQuery(document).ready(function(){
	
	$('#addParameterButton').live('click', (function(){
		$('#parameters-table tbody').append(getNewParameter(idx));
		idx++;
		if (idx >1){
			$('#cloneParameterButton').css('background-image','url(images/button-clone-par-live.jpg)');
			$('#removeParameterButton').css('background-image','url(images/button-remove-par-live.jpg)');
		}
		$('#parameters-details').show();
		$('#mod-par-general-bt').addClass('tabSelected');
		$('#mod-par-general').show();

	}));
	
	$("#parameters-table tr").live("click", function() {
   		$(this).addClass("selectedRow").siblings().removeClass("selectedRow");
		
			var row = $(this);
		console.log(row);
		$(this).css('background-color', '#ccc');
		
		$('#removeParameterButton').live('click', (function(){
			var removed = $('.selectedRow').remove();
			idx = $('#parameters-table tr').length;
			console.log(idx);
			if (idx <2){
				$('#cloneParameterButton').css('background-image','url(images/button-clone-par-live-des.jpg)');
				$('#removeParameterButton').css('background-image','url(images/button-remove-par-live-des.jpg)');
				$('#parameters-details').hide();
			}
			

		}));

		$('#cloneParameterButton').live('click', (function(){
			console.log("cloned:");
			
			var cloned = $('.selectedRow').removeClass('selectedRow').clone();
			console.log(cloned);
			$('#parameters-table tr:last').after(cloned);
		}));
	});

	
	
	
});
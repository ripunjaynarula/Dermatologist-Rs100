// JavaScript Document

$(document).ready(function() {
    $("#hsubmit").click(function() {
		var name   	 = $('input[name=name]').val();
		var email    = $('input[name=email]').val();
        var phone  	 = $('input[name=phone]').val();
		var message  	 = $('textarea[name=message]').val();
		var letters_code   	 = $('input[name=letters_code]').val();
        var proceed = true;
			var alertmsg='';
		 if(name==""){ 
		  $('input[name=name]').css('border','2px solid #ff0000'); 
		  alertmsg +="Please fill name\n";
            proceed = false;
        }
		var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
		if(email=="" || !re.test(email)){ 
            $('input[name=email]').css('border','2px solid #ff0000');
			alertmsg +="Please fill email\n"; 
            proceed = false;
        }
        if(phone==""){ 
            $('input[name=phone]').css('border','2px solid #ff0000'); 
			alertmsg +="Please fill phone\n";
            proceed = false;
        }
		 if(message==""){ 
            $('textarea[name=message]').css('border','2px solid #ff0000'); 
			alertmsg +="Please fill message\n";
            proceed = false;
        }
		 	if(letters_code==""){ 
            $('input[name=letters_code]').css('border','2px solid #ff0000'); 
			alertmsg +="Please fill code\n";
            proceed = false;
        }
		if(alertmsg!=''){alert(alertmsg);}
        if(proceed) 
        {
post_data = {'name':name,'email':email,'phone':phone,'message':message,'letters_code':letters_code};
            $.post('aform.php', post_data, function(data){ 
                $("#hresult").hide().html('<div class="success">'+data+'</div>').slideDown();
            }).fail(function(err) {  //load any error data
                $("#hresult").hide().html('<div class="error">'+err.statusText+'</div>').slideDown();
            });
        }
    });
    $("#hform input, #hform textarea, #hform select").keyup(function() { 
        $("#hform input, #hform textarea, #hform select").css('border',''); 
        $("#hresult").slideUp();
    });
});
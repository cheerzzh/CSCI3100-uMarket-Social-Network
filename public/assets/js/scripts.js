
jQuery(document).ready(function() {
	
    /*
        Fullscreen background
    */
    //$.backstretch("assets/img/backgrounds/1.jpg");
    //$.backstretch("images/background-1.jpg");
    $.backstretch(
        ["images/index/3.jpg","images/index/1.jpg","images/index/2.jpg"],{duration: 2500, fade: 1500});
    /*
        Form validation
    */
    $('.login-form input[type="text"], .login-form input[type="password"], .login-form textarea').on('focus', function() {
    	$(this).removeClass('input-error');
    });
    
    $('.login-form').on('submit', function(e) {
    	
    	$(this).find('input[type="text"], input[type="password"], textarea').each(function(){
    		if( $(this).val() == "" ) {
    			e.preventDefault();
    			$(this).addClass('input-error');
    		}
    		else {
    			$(this).removeClass('input-error');
    		}
    	});
    	
    });

    
    $('.registration-form input[type="text"], .login-form input[type="password"], .login-form textarea').on('focus', function() {
        $(this).removeClass('input-error');
    });
    
    $('.registration-form').on('submit', function(e) {
        
        $(this).find('input[type="text"], input[type="password"], textarea').each(function(){
            if( $(this).val() == "" ) {
                e.preventDefault();
                $(this).addClass('input-error');
            }
            else {
                $(this).removeClass('input-error');
            }
        });
        
    });
    
    
});

function switchToRegistration()
{
    $('#login-form').hide();
    $('#register-form').show();
}

function switchToLogin()
{
    $('#login-form').show();
    $('#register-form').hide();
}

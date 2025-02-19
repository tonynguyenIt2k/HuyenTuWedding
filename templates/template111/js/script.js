$(document).ready(function () {
	const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
	const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
});

(function($) {
	"use strict";
	// $(".add-calendar-button").on('click', function(e) {
    // 	e.preventDefault();
    // 	let index = $(this).data("index");
    // 	$(this).closest('.info-wrap').find('#atcb-btn-' + index).trigger("click");
    // });
	$(document).on('click', '.calendar-button-custom-click', function(){
    	$(this).parent().find('.calendar-button .atcb-click').click();
    });
    

	if ($("#clock").length) {
        function timeElapse(date){
            var current = Date();
            var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
            var days = Math.floor(seconds / (3600 * 24));
            if (days < 10) {
                days = "0" + days;
            }
            seconds = seconds % (3600 * 24);
            var hours = Math.floor(seconds / 3600);
            if (hours < 10) {
                hours = "0" + hours;
            }
            seconds = seconds % 3600;
            var minutes = Math.floor(seconds / 60);
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            seconds = seconds % 60;
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            var html = '<div class="box"><div>' + days + '</div> <span>'+ $('#clock').data('text-day') +'</span></div><div class="box"><div>' + hours + '</div> <span>'+ $('#clock').data('text-hour') +'</span> </div><div class="box"><div>' + minutes + '</div> <span>'+ $('#clock').data('text-minute') +'</span> </div><div class="box"><div>' + seconds + '</div> <span>'+ $('#clock').data('text-second') +'</span></div>';
            $('#clock').html(html);
        }
		var time = $('#clock').data('date');
        $('#clock').countdown(time.replace(/-/g,'/'), function(event) {
            if(event.type == 'stoped'){
                var together = new Date($('#clock').data('date'));           
                together.setHours(0);                           
                together.setMinutes(0);             
                together.setSeconds(0);                 
                together.setMilliseconds(0);
                setInterval(function() {
                    timeElapse(together);
                }, 1000);
            }else{
                var $this = $(this).html(event.strftime(''
                + '<div class="box"><div>%D</div> <span>'+ $('#clock').data('text-day') +'</span> </div>'
                + '<div class="box"><div>%H</div> <span>'+ $('#clock').data('text-hour') +'</span> </div>'
                + '<div class="box"><div>%M</div> <span>'+ $('#clock').data('text-minute') +'</span> </div>'
                + '<div class="box"><div>%S</div> <span>'+ $('#clock').data('text-second') +'</span> </div>'));
            }
        });
    }
	
	/*------------------------------------------
        = WISH FORM SUBMISSION
    -------------------------------------------*/
	if ($("#wish-form").length) {
		$("#wish-form").validate({
			rules: {
				name: {
					required: true,
					minlength: 3
				},
				content: {
					required: true,
					minlength: 10
				},
				email: {
					required: false,
					email: true
				},
			},
	
			messages: {
				name: {
                    required: '<span style="color:red;">Vui lòng nhập tên của bạn.</span>',
                    minlength: '<span style="color:red;">Tên phải lớn hơn 5 ký tự.</span>',
                },
                content: {
                    required: '<span style="color:red;">Vui lòng nhập lời chúc.</span>',
                    minlength: '<span style="color:red;">Lời chúc phải lớn hơn 10 ký tự.</span>',
                },
                email: {
                    email: '<span style="color:red;">Địa chỉ email không hợp lệ.</span>'
                }
			},
			
			errorPlacement: function(error, element) {
                if (element.attr("name") == "content" ) {
                  error.insertAfter("#wish-form .vitualTextarea");
                } else {
                  error.insertAfter(element);
                }
            },
			submitHandler: function (form) {
				$("#loader").css("display", "inline-block");
				$.ajax({
					type: "POST",
					url: "/wish",
					data: $(form).serialize(),
					success: function (res) {
						$( "#loader").hide();
						if(!res.error){
							$('#show-comments').scrollTop(0);
							$('#show-comments').prepend('<div class="box-comment p-3 mb-3 bg"><h4 id="user-name-comment">'+$(form).find("input[name='name']").val().replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;")+'</h4><p>'+$(form).find("textarea[name='content']").val().replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;")+'</p></div>');
							$( "#success").html(res.message).slideDown( "slow" );
							setTimeout(function() {
							$( "#success").slideUp( "slow" );
							}, 5000);
						}else{
							$( "#error").html(res.message).slideDown( "slow" );
							setTimeout(function() {
							$( "#error").slideUp( "slow" );
							}, 5000);
						}
						form.reset();
					},
					error: function() {
						$( "#loader").hide();
						$( "#error").slideDown( "slow" );
						setTimeout(function() {
						$( "#error").slideUp( "slow" );
						}, 5000);
					}
				});
				return false;
			}
	
		});
	}
	if ($("#section-commen").length) {
		$("#contact-form").validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				},
				email: "required",
	
				guest: {
					required: true
				},
	
				services: {
					required: true
				}
	
			},
	
			messages: {
				name: "Please enter your name",
				email: "Please enter your email",
				guest: "Select your number of guest",
				services: "Select your service"
			},
	
			submitHandler: function (form) {
				$("#loader").css("display", "inline-block");
				$.ajax({
					type: "POST",
					url: "mail-contact.php",
					data: $(form).serialize(),
					success: function () {
						$( "#loader").hide();
						$( "#success").slideDown( "slow" );
						setTimeout(function() {
						$( "#success").slideUp( "slow" );
						}, 3000);
						form.reset();
					},
					error: function() {
						$( "#loader").hide();
						$( "#error").slideDown( "slow" );
						setTimeout(function() {
						$( "#error").slideUp( "slow" );
						}, 3000);
					}
				});
				return false; // required to block normal submit since you used ajax
			}
	
		});
	}

	 /*------------------------------------------
        = DONATE MODAL
    -------------------------------------------*/
    if ($("#donate-modal").length && $(".buttonDonate").length  && $(".donate-modal-close").length) {
		$(document).on('click','.buttonDonate',function(){
			console.log("check btn click");
			$("#donate-modal").show();
			if ($('body').hasClass('offcanvas')) {
                $('body').removeClass('offcanvas');
                $('.js-oliven-nav-toggle').removeClass('active');
            }
		});
		$(document).on('click','.donate-modal-close',function(){
			$("#donate-modal").hide();
		});
		$(document).on('click','body',function(e){
			if(e.target.id == $("#donate-modal").attr('id')) { $("#donate-modal").hide(); }
		});
	}

	$(document).on('click', '.crypto-item', function(){
		let parent = $(this).parents('.donate-card');
		parent.find('.cryptos-box-view').show();
		parent.find('.cryptos-box-view .coin-img').html('<img src="'+$(this).data('img')+'" />');
		parent.find('.cryptos-box-view .coin-id').html($(this).data('id'));
		parent.find('.cryptos-box-view .coin-address').html($(this).data('address'));
		parent.find('.cryptos-box-view .coin-qr-code').html('').qrcode({width: 160,height: 160,text: $(this).data('address')});
	});
	
	$(document).on('click', '.cryptos-box-view-close', function(){
		let parent = $(this).parents('.donate-card');
		parent.find('.cryptos-box-view').hide();
	});

	    /*------------------------------------------
    = MENU ACCESSBILITY
    -------------------------------------------*/
    $('.btn-menu-open').click(function() {
        $('ul.list-menu-icon').css('opacity','1');
        $('ul.list-menu-icon').css('pointer-events','');
        $('.btn-menu-close').show();
        $('.btn-menu-open').hide();
    })
    $('.btn-menu-close').click(function() {
        $('ul.list-menu-icon').css('opacity','0');
        $('ul.list-menu-icon').css('pointer-events','none');
        $('.btn-menu-open').show();
        $('.btn-menu-close').hide();
    })
    setTimeout(() => {
        $('.btn-menu-open').hide();
        $('.btn-menu-close').show();
        $('ul.list-menu-icon').css('opacity','1');
    }, 3000); 
    $( window ).on("load", function(){
		if($('.bii-logo').length > 0){
			$('#menu-access').css('bottom','278px');
			document.querySelector('style').textContent += "@media (max-width: 799px){#menu-access{bottom: 238px!important;}}"
		} 
	})

})(window.jQuery);




document.addEventListener("DOMContentLoaded", () => {
	const dateContainer = document.getElementById("dateContainer");
	const dateString = dateContainer.getAttribute("data-wedding-date");
	const trimmedString = dateString.trim();
	const characters = trimmedString.split('');
  
	for (let i = 0; i < characters.length; i++) {
	  const span = document.createElement("span");
	  span.textContent = characters[i];
	  dateContainer.appendChild(span);
	}

	function shakeTooltip(){
        var arrTooltip = $('ul.list-menu-icon').children();
        arrTooltip.each(function(index) {
            setTimeout(() => {
                if(document.querySelector('.btn-menu-close').style.display !== "none"){  
                    $(this).addClass('shake');
                    $(this).children().children().children('.tooltiptext').css('visibility','visible');
                    setTimeout(() => {
                        $(this).children().children().children('.tooltiptext').css('visibility','');
                        $(this).removeClass('shake');
                    }, 3000);
                } else{
                    return false;
                }
            }, index*5000); 
        });   
    }
    if($('#menu-access').length >0){
        setTimeout(() => {
            shakeTooltip();
            myInterval = setInterval(shakeTooltip, 20000);
        }, 3000);
    }
    $('.btn-menu-close').click(function(){
        $('tooltiptext').css('visibility','');
        clearInterval(myInterval);
    });

	$(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

  });
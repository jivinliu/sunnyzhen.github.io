(function($){$.fn.touchwipe=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft(e)}else{config.wipeRight(e)}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown(e)}else{config.wipeUp(e)}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})(jQuery);

$(document).ready(function(){
	
	//触摸触发事件
	$("body").touchwipe({
		wipeDown: function() {
			wipe_down();
		 },
		 wipeUp: function() { 
			wipe_up();
		 },
		 wipeLeft: function() {
			wipe_right();
		 },
		 wipeRight: function() { 
		 	wipe_left();
		 },
		min_move_x: 80,
		min_move_y: 80,
		preventDefaultEvents: true
	});
	
	
	function wipe_right(){
		
	}
	
	function wipe_left(){
		
	}
	
	function wipe_up(){
		
	}
	
	function wipe_down(){
		
	}
	
	function musicPlay(){
		var audio = document.createElement("audio");
		audio.src = "media/happy.mp3";
		audio.loop = true;
		audio.load();
		audio.addEventListener("canplaythrough", function(){
			
			audio.volume=0.01;
			timer_volume_up=setInterval(function(){
				if(audio.volume<0.15){
					audio.volume+=0.01;
				}
				else{
					audio.volume=0.15;
					clearInterval(timer_volume_up);
				}
				console.log(audio.volume);
			},1000);
			
			timer_count=setTimeout(function(){
                timer_volume_down=setInterval(function(){
                    if(audio.volume>0.01){
                        audio.volume-=0.01;
                    }
                    else{
                        audio.volume=0.01;
                        clearInterval(timer_volume_down);
                    }
                  	console.log(audio.volume);
                },1000);
			},parseInt(audio.duration*1000-15000));
			
			audio.play();
			
		},false);
		
		$(".audio_wrap").append(audio);
	}
	
	musicPlay();
	
	
});





















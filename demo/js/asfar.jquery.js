(function( $ ){
	function html5AjaxHistoryC(callback,selector){
		var hash 				= location.hash;
		var pagecount  		  	= 0;
		var before;
		var insert;
		var success;
		var error;
		var after;
		
		if(typeof history.pushState === 'undefined') {
			var html5 = false;
			
			html5AjaxHistoryR 	= this;
			
			setInterval(function()
			{
				if (location.hash != hash)
				{
					html5AjaxHistoryR.call(location.hash.substring(2));
				
				}
			}, 100);
		}else{
			var html5 = true;
			
			html5AjaxHistoryR 	= this;
			
			window.onpopstate = function(event) {
				if(!(event.state == null)){
					if("ajax" == event.state.type){
						html5AjaxHistoryR.call(document.location.pathname,target,true);
					}
				}
			};
		}
		
		this.before = function(urlFragment,target){}
		this.success = function(urlFragment,target){}
		this.after = function(urlFragment,target){}
		this.error = function(urlFragment,target){}
		this.insert = function(urlFragment,target,data){
			var html = $(data).find('h2').html();
			console.log($(data));
			console.log(html);
			$(target).html(html);
		}
				
		this.call = function(urlFragment,target,history)
		{
			target = typeof(target) != 'undefined' ? target : '#content';
			history = typeof(history) != 'undefined' ? history : false;
			var thisR = this;
			
			thisR.before(urlFragment,target);
			
			$.ajax({
				cache: false,
				async: true,
				type: 'GET',
				url: urlFragment,
				dataType: 'html',
				success: function(data) {
					thisR.insert(urlFragment,target,data);
				
					$(target).find(selector).click(function(){
						event.preventDefault();
						this.call($(this).attr('href'),target);
					});
					
					thisR.success(urlFragment,target);
					
					if (typeof callback == 'function') {
						callback(urlFragment);
					}
					//$('#loadAnimationWrapper').hide();
				}
			});
			
			thisR.after(urlFragment,target);
			
			if(true != history){
				this.pushState(urlFragment);
			}
		
		};

		this.pushState  = function(urlFragment)
		{
			if(true == html5){
				history.pushState({type: 'ajax'}, "title " + this.pagecount,urlFragment);
				pagecount++;
			}else{
				location.hash = '#!' + urlFragment;
				hash = location.hash;
			}
		}
	}
	
	$.fn.asfar = function(){
		// place this in your header to optimize performance
		if('#!' === location.hash.substring(0,2)){
			location.href = location.hash.substring(2);
		}
	
		html5AjaxHistoryO = new html5AjaxHistoryC();

		if((typeof(arguments[0]) != 'undefined')){
			if((typeof(arguments[0]['before']) != 'undefined')){
				html5AjaxHistoryO.before = arguments[0]['before'];
			}
			if((typeof(arguments[0]['insert']) != 'undefined')){
				html5AjaxHistoryO.insert = arguments[0]['insert'];
			}
			if((typeof(arguments[0]['success']) != 'undefined')){
				html5AjaxHistoryO.success = arguments[0]['success'];
			}
			if((typeof(arguments[0]['after']) != 'undefined')){
				html5AjaxHistoryO.after = arguments[0]['after'];
			}
			if((typeof(arguments[0]['error']) != 'undefined')){
				html5AjaxHistoryO.error = arguments[0]['error'];
			}
		}
	
		if( (typeof(arguments[0]) == 'undefined') || (typeof(arguments[0]['selector']) == 'undefined')){
			var selector = 'a';
		}else{
			var selector = arguments[0]['selector'];
		}
						
		target = this;
		
		$(selector).live('click',function(event){
			event.preventDefault();
			html5AjaxHistoryO.call($(this).attr('href'),target);
		});
	}
})( jQuery );

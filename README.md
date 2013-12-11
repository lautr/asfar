#[asfar](http://www.lautr.com/asfar) - ajax substitute for (all) requests

asfar is a "simple" approch to implement the new HTML5 History Interface or shebangs (depending on Browser Capability) to load content via AJAX to a specific DOM Target and keep track of that in the History & Adress Bar of the Browser.

In its current Form asfar is an jQuery Plugin and need the Library to function, depending on the feedback this might change in the future.

##about

The main goal of asfar is to provide an easy way (just look at the basic implementation) to Access and Reffer Information/States of Content that is provided via AJAX and work with them, most likely show them in some way on the page, whyle keeping track of thoose changes in the History & Adress Bar of the Browser.

If your Browser does not support the HMLT5 History Interface (yes IE Users, I'm looking at you), the functionality is the same only that shebangs are used (like Facebbok does in general for Example).

##demos

DEMOS ARE CURRENTLY UNAVAIBLE – SORRY

Plain: [http://www.lautr.com/asfar/example-plain/index.php](http://www.lautr.com/asfar/example-plain/index.php)

Effetcs using Callbacks: [http://www.lautr.com/asfar/example-fancy/index.php](http://www.lautr.com/asfar/example-fancy/index.php)

Complete page as ajax response - no server partial response: [http://www.lautr.com/asfar/example-complete-response/start.html](http://www.lautr.com/asfar/example-complete-response/start.html)

##implementation & Examples
###basic
<pre>
	$('#content').asfar();
</pre>

###selector
<pre>
	$('#content').asfar({
		 selector : 'a:not(.extern)'
	});
</pre>

###callbacks
<pre>
	$('#content').asfar({
        selector : 'a:not(.extern)',
        before : function(urlFragment,target){
            console.log('before');
        },
        insert : function(urlFragment,target,data){
            $(target).fadeOut(1000,function(){
                $(target).html(data);
                $(target).fadeIn(1000);
            });
        },
        after : function(urlFragment,target){
            console.log('after');
        },
        success : function(urlFragment,target){
            if(0 &gt; $('a[href="' + urlFragment + '"]').length){
                $('a').removeClass('active');
                $('a[href="' + urlFragment + '"]').addClass('active');
            }
            _gaq.push(['_trackPageview',urlFragment]);
        }
	});
</pre>

##optimization

### Server Side

You can optimize your application to only return the part of the page that you actually want to load, you can do that by recognizing an "ajax" call and delivering different/partial content depending on that.

### Client Side

You can place this peace of javascript Code in the header of your page so he can perform redirects without loading & showing the whole (wrong) page first
<pre>
		if ('#!' === location.hash.substring(0,2)) {
			location.href = location.hash.substring(2);
		}
</pre>



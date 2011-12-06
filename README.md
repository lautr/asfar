#[asfar](http://www.lautr.com/asfar) - ajax substitute for (all) requests

asfar is a "simple" approch to implement the new HTML5 History Interface or shebangs (depending on Browser Capability) to load content via AJAX to a specific DOM Target and keep track of that in the History & Adress Bar of the Browser.

In its current Form asfar is an jQuery Plugin and need the Library to function, depending on the feedback this might change in the future.

##about

The main goal of asfar is to provide an easy way (just look at the basic implementation) to Access and Reffer Information/States of Content that is provided via AJAX and work with them, most likely show them in some way on the page, whyle keeping track of thoose changes in the History & Adress Bar of the Browser.

If your Browser does not support the HMLT5 History Interface (yes IE Users, I'm looking at you), the functionality is the same only that shebangs are used (like Facebbok does in general for Example).

##demos

Plain: [http://www.lautr.com/asfar/example-plain/index.html](http://www.lautr.com/asfar/example-plain/index.html)

Effetcs using Callbacks: [http://www.lautr.com/asfar/example-plain/index.html](http://www.lautr.com/asfar/example-plain/index.html)

Complete page as ajax response - no server partial response: [http://www.lautr.com/asfar/example-complete-response/start.html](http://www.lautr.com/asfar/example-complete-response/start.html

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

You can optimize your application to only return the part of the page that you actually want to load, you can do that by recognizing an "ajax" call and delivering different/partial content depending on that. Here are some examples how to do that in some PHP Enviroments:

#### Zend Framework Example
<pre>
	class IndexController extends Zend_Controller_Action
	{
		public function init()
		{
			// Disable render helper and zend Layout
			if($this->_request->isXmlHttpRequest()){
				$this->_helper->layout()->disableLayout();
			}
		}
	}
</pre>
#### Symfony 2 Example
<pre>
	/**
	 * checks if the request is done by an ajax like query
	 * @return boolean 
	 */
	public function isXmlHttpRequest() {
		return $this->get('request')->isXmlHttpRequest() || $this->get('request')->get('_xml_http_request');
	}
</pre>
#### native PHP Example
<pre>
	/**
	 * checks if the current Request is ajax or not
	 * @return bool
	 */
	function isAjaxRequest()
	{
		if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
			return true;
		}else{
			return false;
		}
	}
</pre>

### Client Side

You can place this peace of javascript Code in the header of your page so he can perform redirects without loading & showing the whole (wrong) page first
<pre>
		if ('#!' === location.hash.substring(0,2)) {
			location.href = location.hash.substring(2);
		}
</pre>



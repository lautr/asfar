#[asfar](http://www.lautr.com/asfar) - ajax substitute for (all) requests

##about

##demos

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

You can optimize your application to only return the part of the page that you actually want to load, you can do that by recognizing an "ajax" call and devlivering different content depending on that.

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



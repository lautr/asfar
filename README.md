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
            if(0 < $('a[href="' + urlFragment + '"]').length){
                $('a').removeClass('active');
                $('a[href="' + urlFragment + '"]').addClass('active');
            }
            _gaq.push(['_trackPageview',urlFragment]);
        }
    });
</pre>

##optimization

### Server Side

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



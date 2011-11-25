<?php

/**
 * small class to help with examples, renders view into templates provides some helpers
 * 
 * @author Johannes Lauter 
 */
class core{
	/**
	 * @var string path to the layout to use
	 */
	public $layout;
	
	/**
	 * @var string title to be used for the page
	 */
	public $title;
	
	/**
	 * @var core instance of itself
	 */
	private static $_i;
	
	/**
	 * Called when script ends, returns output
	 * 
	 * @return string
	 */
	public function __destruct()
	{
		$content = ob_get_clean();

		if(NULL !== $this->layout && !$this->isAjaxRequest()){
			$layout = file_get_contents($this->layout);
			$content = str_replace('{{content}}',$content,$layout);
			$content = str_replace('{{title}}',$this->title,$content);
		}
		
		print $content;
	}
	
	/**
	 * checks if the current Request is ajax or not
	 * @return bool
	 */
	protected function isAjaxRequest()
	{
		if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
			//return false;
			return true;
		}else{
			return false;
		}
	}
	
	/**
	 * Starts the Process Rendering, takes an optional layout to rende rthe information int o and the page title
	 * 
	 * @param $layout string path to layout
	 * @param $title string title for the page
	 */
	public static function start($layout = NULL,$title = NULL)
	{
		ob_start();
		self::$_i = new core;
		self::$_i->layout = $layout;
		self::$_i->title = $title;
	}
}

function getmicrotime($e = 7) 
{ 
    list($u, $s) = explode(' ',microtime()); 
    return bcadd($u, $s, $e); 
} 

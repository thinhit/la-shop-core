<?php namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
class News extends Model {

	

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'news';
	
	var $timestamps = false;
	protected $hidden = array();

	
	// Start for relations
	public function Author(){
		return $this->hasOne('App\Http\Models\User', 'id', 'user_id')->select('id', 'name');
	}
	public function GroupNews(){
		return $this->hasOne('App\Http\Models\Group_news', 'id', 'group_news_id')->select('id', 'name');
	}
	// End for relations

	public function getAll(){
		$_ret = $this->with(array('GroupNews', 'Author'));
		$_ret = $_ret->select('id', 'name', 'images','count_views','description', 'create_time', 'update_time', 'status', 'group_news_id', 'user_id');
		return $_ret;
	}

}

<?php namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
class Product extends Model {

	

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'Product';
	
	var $timestamps = false;
	protected $hidden = array();

	
	// Start for relations
	public function Category(){
		return $this->hasOne('App\Http\Models\Category','id', 'category_id')->select('id', 'name');
	}
	// End for relations

	public function getAll(){
		$_ret = $this->with(array('category'));
		$_ret = $_ret->select('id', 'name','price', 'alt','keywords','images','description', 'content', 'status', 'create_time', 'update_time','category_id');
		return $_ret;
	}

}

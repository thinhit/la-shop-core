<?php namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use DB;
class Group_news extends Model {

	

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'group_news';
	
	var $timestamps = false;
	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	public function getData() {
		$res = DB::table('group_news')->get();
		return $res;
	}
}

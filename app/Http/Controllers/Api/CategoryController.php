<?php namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Response;
use App\Http\Models as Models;
use DB;
// use Carbon\Carbon;

class CategoryController extends Controller {

	/*
	|--------------------------------------------------------------------------
	| Home Controller
	|--------------------------------------------------------------------------
	|
	| This controller renders your application's "dashboard" for users that
	| are authenticated. Of course, you are free to change or remove the
	| controller as you wish. It is just here to get your app started!
	|
	*/

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		$this->middleware('auth');
	}

	/**
	 * Show the application dashboard to the user.
	 *
	 * @return Response
	 */

	public function getIndex(Request $request) {
		$Model  = new Models\Category();
		$Total  = $Model->get()->count();
		$Model  = $Model->orderBy('id','DESC')->where('parent_key','=','0');
		$datas  = $this->paging($Model, $request);
		$result = array();
		// foreach ($datas as $key => $value) {
		// 	if((int)$value['id'] = (int)$value['parent_key']) {
		// 		unset($datas[$key]);	
		// 	}
		// }
		foreach ($datas as $k => $item) {
			$_data    = DB::table('category')->where('parent_key','=',$item['id'])->get();
			$result[] = array(
				'id'       => $item['id'],
				'name'     => $item['name'],
				'children' => $_data
				);

		}
		$_objReturn = array(
			"error" 	=> false,
			"data"		=> array(),
			"message"	=> "",
			"total"		=> $Total
		);
		$_objReturn['data'] = $result;
		return Response::json($_objReturn);
	}


	public function postPost(Request $request){
		$arr        = ['error' => false,'message' => '','data' => ''];
		$col_data   = DB::table('Category')->lists('name');
		$name       = $request->input('name');
		$_cat       = $request->input('category');
		$parent_key = $request->input('parent_id');
		if(isset($name) && !empty($name)) {
			if(in_array($name,$col_data)) {
				$arr['message'] = 'exits_data';
			} else {
				$Category              = new Models\Category;
				$Category->name        = $name;
				$Category->create_time = date("Y-m-d H:i:s");
				$Category->parent_key  = $parent_key;
				$rs           = $Category->save();
				$LastInsertId = $Category->id;
				$data = ['id' => $LastInsertId,
							'name' => $name,
							'create_time' => date("Y-m-d H:i:s"),
							'parent_key' => $parent_key
							];
				if($rs == true) {
					$arr['data']    = $data;
					$arr['message'] = 'Done';
				} else {
					$arr['error']   = true;
					$arr['message'] = 'Not Done';
				}
			}
		} else {
			$arr['error']   = true;
			$arr['message'] = 'null';
		}
		return Response::json($arr);
	}
	
	public function postPush(Request $request) {
		$id         = $request->input('id');
		$name       = $request->input('name');
		$col_data = DB::table('category')->lists('name');
		if(isset($name) && !empty($name)) {
			$Category              = Models\Category::find($id);
			$Category->name        = $name;
			$Category->update_time = date("Y-m-d H:i:s");
			$rs   = $Category->save();
			$data = ['id' => $id,'name' => $name,'update_time' => date("Y-m-d H:i:s")];
			$arr  = ['error' => false,'message' => '','data' => ''];
			if($rs == true) {
				$arr['data']    = $data;
				$arr['message'] = 'Done';
			} else {
				$arr['error']   = true;
				$arr['message'] = 'not done ';
			}
		} else {
			$arr['message'] = 'null';
		}
		return json_encode($arr);
	}

	public function postDelete(Request $request) {
		$id   = $request->input('id');
		if(!isset($id) && empty($id)) {
			return false;
		}
		$Category = new Models\Category;
		$Category = Models\Category::find($id);
		$rs = $Category->delete();
		if($rs == true) {
					$arr = array('error' => true,'message' => 'Done');
		} else {
			$arr = array('error' => false,'message' => 'not Done');
		}
		return json_encode($arr);
	}

}

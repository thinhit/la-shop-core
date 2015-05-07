<?php namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Response;
use App\Http\Models as Models;
use DB;
// use Carbon\Carbon;

class ProductController extends Controller {

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
	 * Hiển thị danh sách sản phẩm
	 * @author daotc94@gmail.com
	 * @return void
	 */
	public function __construct()
	{
		$this->middleware('auth');
	}

	/*Hiển thị danh sách tin tức */
	public function getIndex(Request $request){
		$stt   = $request->input('stt');
		$Model = new Models\Product();
		$Total = $Model->get()->count();
		if(!empty($stt)) {
			$datas = DB::table('product')->where('status','=',$stt)->get();
			// $Model = $Model->getAll()->where('status','=',$stt)->orderBy('id','DESC');
		} else {
			$Model = $Model->getAll()->orderBy('id','DESC');	
			$datas = $this->paging($Model, $request);
		}

		$_objReturn = array(
			"error" 	=> false,
			"data"		=> array(),
			"message"	=> "",
			"total"		=> $Total
		);

		if($datas){
			$_objReturn['data'] = $datas;
		}
		return Response::json($_objReturn);


	}

	/*Tree combobox category*/
	public function getCategory(request $request) {
		$Model  = new Models\Category();
		$Total  = $Model->get()->count();
		$Model  = $Model->orderBy('id','DESC')->where('parent_key','=','0');
		$datas  = $this->paging($Model, $request);
		$result = array();
		foreach ($datas as $k => $item) {
			$_data    = DB::table('category')->where('parent_key','=',$item['id'])->get();
			if(!empty($_data)) {
				foreach ($_data as $value) {
					$result[] = array(
					'id'    => $value->id,
					'group' => $item['name'],
					'label' => $value->name
					);
				}	
			} else {
				$result[] = array(
					'id'    => $item['id'],
					'label' => $item['name']
				);
			}
			
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

	/*Thêm mới sản phẩm*/
	public function postPost(Request $request){
		$arr      = ['error' => false,'message' => '','data' => ''];
		$col_data = DB::table('product')->lists('name');
		$name     = $request->input('name');
		$category = $request->input('category');
		$image    = $request->input('images');
		$alt      = $request->input('alt');
		$des      = $request->input('des');
		$content  = $request->input('content');
		$price    = $request->input('price');
		$keywords = $request->input('keywords');
		if(isset($name) && !empty($name) && !empty($category) && !empty($image) && !empty($price) && !empty($des)) {
			if(in_array($name,$col_data)) {
				$arr['message'] = 'exits_data';
			} else {
				$table              = new Models\Product;
				$table->name        = $name;
				$table->category_id = $category;
				$table->alt         = $alt;
				$table->keywords    = $keywords;
				$table->images      = $image;
				$table->description = $des;
				$table->content     = $content;
				$table->price       = $price;
				$table->create_time = date("Y-m-d H:i:s");
				$rs                 = $table->save();
				$LastInsertId       = $table->id;
				$_category          = DB::table('category')->where('id','=',$category)->pluck('name');
				$data = ['id' => $LastInsertId,
							'name'        => $name,
							'alt'         => $alt,
							'keywords'    => $keywords,
							'images'      => $image,
							'price'       => intval($price),
							'description' => $des,
							'content'     => $content,
							'status'      => 2,//2 không kích hoạt,1 là đã kích hoạt
							'category'    => ['name' => $_category],
							'create_time' => date("Y-m-d H:i:s")];
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
	
	/*chỉnh sửa trạng thái */
	public function postChangestatus(Request $request) {
		$id     = $request->input('id');
		$stt    = $request->input('status');
		$status = $stt == 1 ? 2 : 1;
		if(!isset($id) && empty($id)) {
			return false;
		}
		$rs = DB::table('product')->where('id',$id)->update(array('status' => $status));
		if($rs == true) {
			$data = ['id' => $id,'status' => $status];
			$arr = array('error' => true,'message' => 'Done','data'=>$data);
		} else {
			$arr = array('error' => false,'message' => 'not Done');
		}
		return json_encode($arr);
	}

	public function postPush(Request $request) {
		$id        = $request->input('id');
		$name      = $request->input('name');
		$category  = $request->input('category');
		$image     = $request->input('images');
		$alt       = $request->input('alt');
		$des       = $request->input('des');
		$content   = $request->input('content');
		$price     = $request->input('price');
		$keywords  = $request->input('keywords');
		$col_data  = DB::table('product')->lists('name');
		$_category = DB::table('category')->where('id','=',$category)->pluck('name');
		if(isset($name) && !empty($name) && !empty($category) && !empty($image) && !empty($price) && !empty($des)) {
			$table              = Models\product::find($id);
			$table->name        = $name;
			$table->category_id = $category;
			$table->alt         = $alt;
			$table->keywords    = $keywords;
			$table->images      = $image;
			$table->description = $des;
			$table->content     = $content;
			$table->price       = $price;
			$table->update_time = date("Y-m-d H:i:s");
			$rs = $table->save();
			$data = ['id' => $id,
						'name'        => $name,
						'price'       => $price,
						'alt'         => $alt,
						'update_time' => date("Y-m-d H:i:s"),
						'keywords'    => $keywords,
						'images'      => $image,
						'price'       => intval($price),
						'description' => $des,
						'content'     => $content,
						'category'    => ['name' => $_category],

					];
			$arr = ['error' => false,'message' => '','data' => ''];
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

	/*xóa sản phẩm*/
	public function postDelete(Request $request) {
		$id   = $request->input('id');
		if(!isset($id) && empty($id)) {
			return false;
		}
		$table = new Models\Product;
		$table = Models\Product::find($id);
		$image = DB::table('product')->where('id','=',$id)->pluck('images');
		$rs    = $table->delete();
		$path  = "uploads/".$image;
		if($rs == true) {
			if($image !=""){
				unlink($path);	
			} else {
				// code
			}
			$arr = array('error' => true,'message' => 'Done');
		} else {
			$arr = array('error' => false,'message' => 'not Done');
		}
		return json_encode($arr);
	}

}

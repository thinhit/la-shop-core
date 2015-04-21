<?php namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Response;
use App\Http\Models as Models;
use DB;
use Illuminate\Support\Facades\Session;
class NewsController extends Controller {


	public function __construct()
	{
		$this->middleware('auth');
	}

	/**
	 * Hiển thị danh sách tin tức
	 * @author thinhit http://github.con/thinhit
	 * @return Response <json>
	 */
	public function getIndex(Request $request)
	{
		$stt = $request->input('stt');
		$Model = new Models\News();
		$Total = $Model->get()->count();
		if(!empty($stt)) {
			$Model = $Model->getAll()->where('status','=',$stt)->orderBy('id','DESC');
		} else {
			$Model = $Model->getAll()->orderBy('id','DESC');	
		}
		$datas = $this->paging($Model, $request);

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

	public function getGroupnews(Request $Request) {
		$model = DB::table('group_news')->select('id', 'name');
		$Total = $model->count();
		$datas = $model->get();
		
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

	public function postPost(Request $request){
		$arr      = ['error' => false,'message' => '','data' => ''];
		$name     = $request->input('name');
		$category = $request->input('category');
		$content  = $request->input('content');
		$des      = $request->input('des');
		$image    = $request->input('images');
		$user_id  = $request->user()->id;
		if(isset($name) && !empty($name)) {
			$table                = new Models\News;
			$table->name          = $name;
			$table->create_time   = date("Y-m-d H:i:s");
			$table->group_news_id = $category;
			$table->images        = $image;
			$table->description   = $des;
			$table->content       = $content;
			$table->user_id       = $user_id;
			$table->status        = 0;// 0 : không chọn , 1 là được chọn
			$rs                   = $table->save();
			$username             = DB::table('users')->where('id','=',$user_id)->pluck('name');
			$gr_news              = DB::table('group_news')->where('id','=',$category)->pluck('name');
			$LastInsertId         = $table->id;
			$data = ['id' => $LastInsertId,
					'name'          => $name,
					'create_time'   => date("Y-m-d H:i:s"),
					'group_news_id' => $category,
					'images'        => $image,
					'description'   => $des,
					'content'       => $content,
					'author'        => array('name' => $username),
					'group_news'    => array('name' => $gr_news),
					'status'        => 0// 0 : không chọn , 1 là được chọn
					];
			if($rs == true) {
				$arr['data']    = $data;
				$arr['message'] = 'Done';
			} else {
				$arr['error']   = true;
				$arr['message'] = 'Not Done';
			}
		} else {
			$arr['error']   = true;
			$arr['message'] = 'null';
		}
		return Response::json($arr);
	}


	public function postDelete(Request $request) {
		$id   = $request->input('id');
		if(!isset($id) && empty($id)) {
			return false;
		}
		$rs = DB::table('news')->where('id', '=',$id)->delete();
		if($rs == true) {
					$arr = array('error' => true,'message' => 'Done');
		} else {
			$arr = array('error' => false,'message' => 'not Done');
		}
		return json_encode($arr);
	}

}

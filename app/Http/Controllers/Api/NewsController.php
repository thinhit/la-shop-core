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
		$Model 		= new Models\News();
		$Total 		= $Model->getAll()->count();
		$datas 		= $this->paging($Model->getAll(), $request);

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
			$rs           = $table->save();
			$LastInsertId = $table->id;
			$data = ['id' => $LastInsertId,
					'name'          => $name,
					'create_time'   => date("Y-m-d H:i:s"),
					'group_news_id' => $group_news_id,
					'images'        => $images,
					'description'   => $description,
					'content'       => $content,
					'user_id'       => $user_id,
					'status'       => 0// 0 : không chọn , 1 là được chọn
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

}

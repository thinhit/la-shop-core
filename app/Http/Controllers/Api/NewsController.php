<?php namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Response;
use App\Http\Models as Models;

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



	public function getViewall() {
		$data = Models\Group_news::all();
		if(empty($data)) {
			$arr = array('error' => false,'message'=>"Error",'data'=>$data);
		} else {
			$arr = array('error' => true,'message'=>"Done",'data'=>$data);
		}
		return json_encode($arr);
	}

	public function postPost(Request $request){
		$name = $request->input('name');
		if(isset($name) && !empty($name)) {
				$Group_news = new Models\Group_news;
				$Group_news->name        = $name;
				$Group_news->create_time = date("Y-m-d H:i:s");
				$rs = $Group_news->save();
				if($rs == true) {
					$arr = array('error' => true,'message' => 'Done','data' => array('name' => $name,'create_time' => date("Y-m-d H:i:s")));
				} else {
					$arr = array('error' => false,'message' => 'not Done');
				}
				return json_encode($arr);
		}
	}

	public function getPush($id) {
		if(!isset($_GET['id']) && empty($_GET['id'])) {
			return false;
		}
		$id   = $_GET['id'];
		$name = Input::get('name');
		$Group_news = new Models\Group_news;
		$Group_news = Models\Group_news::find($id);
		$Group_news->name = $name;
		$rs = $Group_news->save();
		if($rs == true) {
					$arr = array('error' => true,'message' => 'Done');
		} else {
			$arr = array('error' => false,'message' => 'not Done');
		}
		return json_encode($arr);
	}

	public function postDelete(Request $request) {
		$id   = $request->input('id');
		if(!isset($id) && empty($id)) {
			return false;
		}
		$Group_news = new Models\Group_news;
		$Group_news = Models\Group_news::find($id);
		$rs = $Group_news->delete();
		if($rs == true) {
					$arr = array('error' => true,'message' => 'Done');
		} else {
			$arr = array('error' => false,'message' => 'not Done');
		}
		return json_encode($arr);
	}

}

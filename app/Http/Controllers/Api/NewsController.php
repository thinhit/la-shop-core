<?php namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Response;
use App\Http\Models as Models;
use DB;
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
		$Model = DB::table('group_news')->select('name')->get();
		return Response::json($Model);
	}

}

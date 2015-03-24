<?php namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Http\Models as Models;

class GroupnewsController extends Controller {

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
	public function getIndex()
	{
		return 1;
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
		return $request->input('name');
		if(isset($_POST['name']) && !empty($_POST['name'])) {
				$Group_news = new Models\Group_news;
				$Group_news->name        = Input::get('name');
				$Group_news->create_time = date("Y-m-d H:i:s");
				$rs = $Group_news->save();
				if($rs == true) {
					$arr = array('error' => true,'message' => 'Done');
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

	public function getDelete() {
		if(!isset($_GET['id']) && empty($_GET['id'])) {
			return false;
		}
		$id   = $_GET['id'];
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

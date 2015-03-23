<?php namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
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

	public function getCreate(){
		return 2;	
	}



}

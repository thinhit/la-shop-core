<?php namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesCommands;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request as Request;

abstract class Controller extends BaseController {

	use DispatchesCommands, ValidatesRequests;

	public function paging ($model, Request $request){
		$page       = $request->has('page')                ? (int)$request->get('page')                       : 1;
        $limit    	= $request->has('limit')               ? (int)$request->get('limit')                      : 20;
        $offset     = ($page - 1)*$limit;

        return $model->offset($offset)->limit($limit)->get()->toArray();
	}
}

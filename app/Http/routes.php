<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'WelcomeController@index');

Route::get('home', 'HomeController@index');
Route::get('home2',function() {
	$users = DB::table('group_news')->select('name')->get();
	foreach ($users as $key => $value) {
		echo $value->name.'</br>';
	}
});


/*API*/

Route::group(['prefix' => 'api/v1', 'middleware' => 'auth'], function()
{	
	Route::controller('group_news', 'Api\GroupnewsController');
	Route::controller('category', 'Api\CategoryController');
	Route::controller('news', 'Api\NewsController');

});

/*Admin*/

Route::group(['prefix' => 'admin', 'middleware' => 'auth'], function()
{	
	Route::controller('', 'Admin\MainController');

});

Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);

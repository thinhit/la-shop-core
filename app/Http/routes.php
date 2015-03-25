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


/*API*/

Route::group(['prefix' => 'api/v1', 'middleware' => 'auth'], function()
{	
	Route::controller('group_news', 'Api\GroupnewsController');
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

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('/api/workerinfo', 'Api\ApiCategory@index');


Route::middleware('api')->group( function () {
  Route::resource('workercategory', 'Api\ApiCategory');
  Route::resource('workerdepartment', 'Api\ApiDepartment');
  Route::resource('workergtpositions', 'Api\ApiGtWorkerPosition');

});
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

Route::get("aaa", function () {
    return "Hello";
});

Route::group(['middleware' => ['api', 'checkPassword'], 'namespace' => 'ApiAdmin'], function () {
    Route::post('register', 'AuthController@register');
    Route::post('login', 'AuthController@login');
    Route::get('User', 'AuthController@getUser');
    Route::get('Admin/Count', "AuthController@AdminCount");
});
Route::group(['middleware' => ['api', 'checkPassword', 'checkAdminsToken:admins-api'], 'namespace' => 'ApiAdmin'], function () {
    //////////////////////////////////////// items ///////////////////////////////////
    Route::post('create/items', 'ItemController@create_item');
    Route::get('items', "ItemController@getItem");
    Route::get('edit/item/{id}', "ItemController@editItems");
    Route::post('update/item/{id}', "ItemController@updateItems");
    Route::delete('delete/item/{id}', "ItemController@deleteItems");
    Route::get('Items/Count', "ItemController@ItemsCount");
    ///////////////////////////////// End ITems/ /////////////////////////////////////
    ////////////////////////////////////// start User ////////////////////////////////
    Route::post('Add/user', "UserController@AddUser");
    Route::get('users', "UserController@getUsers");
    Route::delete('delete/users/{id}', "UserController@deleteUsers");
    Route::get('edit/user/{id}', "UserController@editUsers");
    Route::post('update/user/{id}', "UserController@updateUsers");
    Route::get('Users/Count', "UserController@UsersCount");
    /////////////////////////////////End users //////////////////////////////////////

    ///////////////////////////////// Start Category ///////////////////////////////
    Route::post('Add/Category', 'CategoryController@AddCategory');
    Route::get('Categories', 'CategoryController@getCategories');
    Route::post('delete/category/{id}', "CategoryController@deleteCategory");
    Route::get('edit/category/{id}', "CategoryController@editCategory");
    Route::post('update/category/{id}', "CategoryController@updateCategory");
    Route::get('get/items/{id}', "CategoryController@getitems");
    Route::get('Category/Count', "CategoryController@CategoriesCount");






    //////////////////////////////// End Category /////////////////////////////////
});

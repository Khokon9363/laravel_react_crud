<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/contacts', 'HomeController@index')->name('home');

Route::get('/add-contact', 'HomeController@index');
Route::get('/get_contacts', 'ContactController@contacts');
Route::post('/store', 'ContactController@store');
Route::get('/destroy/{id}', 'ContactController@destroy');
Route::get('/edit/{id}', 'ContactController@edit');
Route::post('/update/{id}', 'ContactController@update');
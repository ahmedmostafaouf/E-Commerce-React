<?php

namespace App\Http\Controllers\ApiAdmin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Traits\General;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Laravel\Ui\Presets\React;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    use General;
    public function register(Request $request)
    {
        try {
            $validator = validator($request->all(), [
                "name" => "required|string",
                "email" => "required|email|unique:admins,email",
                "password" => "required",
            ]);
            if ($validator->fails()) {
                return $this->responsesData('0', 'validation error', $validator->errors()->first(), 'error');
            }
            $request_date = request()->except(['password']);
            $request_date['password'] = Hash::make(request()->get('password'));
            $admins = Admin::create($request_date);
            return $this->responsesData('1', 'admins', $admins, 'add success');
        } catch (\Exception $ex) {
            return $this->returnError($ex->getCode(), $ex->getMessage());
        }
    }
    public function login(Request $request)
    {
        $validator = validator($request->all(), [

            "email" => "required",
            "password" => "required",
        ]);
        if ($validator->fails()) {
            return $this->responsesData('0', 'validation error', $validator->errors()->first(), 'error');
        }
        $credentials = request()->only(['email', 'password']);

        $token = auth('api')->attempt($credentials);

        if (!$token) {
            return $this->returnError('E003', 'بيانات الدخول غير صحيحة');
        }
        $admin = auth('api')->user();
        $admin->api_token = $token;
        return $this->responsesData('1', 'admin', $admin);
    }
    public function getUser(Request $request)
    {
        $validator = validator($request->all(), [
            "token" => "required",
        ]);
        if ($validator->fails()) {
            return $this->responsesData('0', 'validation error', $validator->errors()->first(), 'error');
        }
        $token = auth('api')->user();

        return $token;
    }
    public function AdminCount()
    {
        $admin = Admin::select('id')->get();
        $adminCount = $admin->count();
        return $this->responsesData('1', 'count', $adminCount);
    }
}

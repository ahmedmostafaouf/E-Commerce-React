<?php

namespace App\Http\Controllers\ApiAdmin;

use App\Models\User;
use App\Traits\General;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    use General;
    public function AddUser(Request $request)
    {
        if ($request->file('photo')) {
            $rulePhoto = "required|image|mimes:jpg,jpeg,gif,png|max:10489";
        } else {
            $rulePhoto = '';
        }
        $validator = validator($request->all(), [

            "name" => "required|string|min:3|max:20",
            "photo" => $rulePhoto,
            "password" => "required|string|min:3|max:20",
            "email" => "required|email|unique:users",


        ]);
        if ($validator->fails()) {
            return $this->responsesData('0', 'validation error', $validator->errors()->first(), 'error');
        }
        $path = '';
        if ($request->file('photo')) {
            $path = $this->SaveImages($request->photo, "assets/images/users");
        }

        $users = User::create([
            'name' => $request->name,
            'password' => Hash::make($request->get('password')),
            "photo" => $path,
            "approve" => 1,
            "email" => $request->email,
            "date" => now(),

        ]);
        return $this->responsesData('1', 'success', $users, 'Add Successfully');
    }
    public function getUsers(Request $request)
    {
        $users = User::orderBy("id", "desc")->paginate("5");
        return response()->json($users);
    }
    public function deleteUsers($id)
    {
        $users = User::where('id', $id)->find($id);
        $users->delete();
        return response()->json('deleted');
    }
    public function editUsers($id)
    {
        $users = User::find($id);
        return response()->json($users);
    }
    public function updateUsers(Request $request, $id)
    {
        $users = User::where('id', $id)->find($id);

        if ($request->file('photo')) {
            $rulePhoto = "required|image|mimes:jpg,jpeg,gif,png|max:10489";
        } else {
            $rulePhoto = '';
        }
        $validator = validator($request->all(), [

            "name" => "required|string|min:3|max:20",
            "photo" => $rulePhoto,
            "email" => "required|email|unique:users,email," . $request->id


        ]);
        if ($validator->fails()) {
            return $this->responsesData('0', 'validation error', $validator->errors()->first(), 'error');
        }
        $path = $users->photo;
        if ($request->file('photo')) {
            $path = $this->SaveImages($request->photo, "assets/images/users");
        }
        $users->update([
            'name' => $request->name,
            "photo" => $path,
            "approve" => 1,
            "email" => $request->email,
            "date" => now(),
        ]);
        return $this->responsesData('1', 'success', $users, 'Update Successfully');
    }
    public function UsersCount()
    {
        $users = User::select('id')->get();
        $usersCount = $users->count();
        return $this->responsesData('1', 'count', $usersCount, 'Get Count');
    }
}

<?php

namespace App\Http\Controllers\ApiAdmin;

use App\Models\Item;
use App\Traits\General;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ItemController extends Controller
{
    use General;
    public function create_item(Request $request)
    {
        $validator = validator($request->all(), [

            "name" => "required|string",
            "description" => "required|string",
            "photo" => "required_without:id",
            "status" => "required",
            "category_id" => "required|not_in:0",
            "price" => "required",


        ]);
        if ($validator->fails()) {
            return $this->responsesData('0', 'validation error', $validator->errors()->first(), 'error');
        }
        $path = '';
        if ($request->has('photo')) {
            $path = $this->SaveImages($request->photo, "assets/images/items");
        }

        $items = Item::create([
            'name' => $request->name,
            'description' => $request->description,
            "photo" => $path,
            "status" => $request->status,
            "category_id" => $request->category_id,
            "approve" => 1,
            "price" => $request->price,
            "date" => now(),
            "admin_id" => $request->user()->id,
        ]);
        return $this->responsesData('1', 'success', $items, 'Add Successfully');
    }
    public function getItem(Request $request)
    {
        $items = Item::with('category')->paginate("5");

        return response()->json($items);
    }
    public function editItems($id)
    {
        $items = Item::find($id);
        return response()->json($items);
    }
    public function updateItems(Request $request, $id)
    {
        $items = Item::find($id);
        if ($request->file('photo')) {
            $rulePhoto = "required|image|mimes:jpg,jpeg,gif,png|max:10489";
        } else {
            $rulePhoto = '';
        }
        $validator = validator($request->all(), [

            "name" => "required|string",
            "description" => "required|string",
            "photo" => $rulePhoto,
            "status" => "required",
            "category_id" => "required|not_in:0",
            "price" => "required",


        ]);
        if ($validator->fails()) {
            return $this->responsesData('0', 'validation error', $validator->errors()->first(), 'error');
        }
        $path = $items->photo;
        if ($request->file('photo')) {
            $path = $this->SaveImages($request->photo, "assets/images/items");
        }
        $items->update([
            'name' => $request->name,
            'description' => $request->description,
            "approve" => 1,
            "price" => $request->price,
            "status" => $request->status,
            "photo" => $path,
            "category_id" => $request->category_id,
            "date" => now(),
            "admin_id" => $request->user()->id,
        ]);
        return response()->json($items);
    }
    public function deleteItems($id)
    {
        $items = Item::where("id", $id)->find($id);
        $items->delete();
        return response()->json('deleted');
    }
    public function ItemsCount()
    {
        $items = Item::select('id')->get();
        $itemsCount = $items->count();
        return $this->responsesData('1', 'count', $itemsCount, 'Get Count');
    }
}

<?php

namespace App\Http\Controllers\ApiAdmin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Traits\General;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    use General;
    public function AddCategory(Request $request)
    {
        $validator = validator($request->all(), [
            'name' => "required|string|min:3|unique:categories,name," . $request->id,
            "description" => "required|string",
            "photo" => "required|image|mimes:jpeg,jpg,png,gif"
        ]);
        if ($validator->fails()) {
            return $this->responsesData('0', 'validation error', $validator->errors()->first(), 'error');
        }
        $path = "";
        if ($request->file('photo')) {
            $path = $this->SaveImages($request->photo, "assets/images/categories");
        }
        $categories = Category::create([
            'name' => $request->name,
            "description" => $request->description,
            "photo" => $path
        ]);
        return $this->responsesData('1', 'success', $categories, 'Add Successfully');
    }
    public function getCategories()
    {
        $categories = Category::paginate("5");
        return $this->responsesData('Categories', 'Category', $categories, 'Get Success');
    }
    public function deleteCategory($id)
    {
        $categories = Category::find($id);
        $categories->delete();
        return response()->json('deleted');
    }
    public function editCategory($id)
    {
        $categories = Category::find($id);
        return response()->json($categories);
    }
    public function updateCategory(Request $request, $id)
    {
        $categories = Category::where('id', $id)->find($id);
        if ($request->file('photo')) {
            $rulePhoto = "required|image|mimes:jpg,jpeg,gif,png|max:10489";
        } else {
            $rulePhoto = '';
        }

        $validator = validator($request->all(), [
            'name' => "required|string|min:3|unique:categories,name," . $request->id,
            "description" => "required|string",
            "photo" => $rulePhoto
        ]);
        if ($validator->fails()) {
            return $this->responsesData('0', 'validation error', $validator->errors()->first(), 'error');
        }
        $path = $categories->photo;
        if ($request->file('photo')) {
            $path = $this->SaveImages($request->photo, "assets/images/categories");
        }

        $categories->update([
            "name" => $request->name,
            "description" => $request->description,
            "photo" => $path
        ]);
        return response()->json($categories);
    }
    public function getitems($id)
    {
        $categories = Category::findOrFail($id);
        $items = $categories->items;
        return $this->responsesData('Items', 'Items', $items, 'Get Success');
    }
    public function CategoriesCount()
    {
        $categories = Category::select('id')->get();
        $categoriesCount = $categories->count();
        return $this->responsesData('1', 'count', $categoriesCount, 'Get Count');
    }
}

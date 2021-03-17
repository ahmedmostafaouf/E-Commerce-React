<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = "categories";
    protected $fillable = ['id', 'name', 'description', 'photo', 'created_at', 'updated_at'];
    public function items()
    {
        return $this->hasMany('App\Models\Item', 'category_id');
    }
}

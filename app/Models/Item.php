<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $table = "items";
    protected $fillable = ['id', 'name', 'description', 'price', 'approve', 'photo', 'photo', 'date', 'status', 'category_id', 'admin_id', 'created_at', 'updated_at'];
    public function category()
    {
        return $this->belongsTo('App\Models\Category', 'category_id');
    }
}

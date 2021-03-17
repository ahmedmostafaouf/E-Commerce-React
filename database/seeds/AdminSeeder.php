<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Admin::create([
         'name'=>"Ahmed Mostafa",
         'email'=>'super_admin@app.com',
         'password'=>Hash::make('123456'),
        ]);
    }
}

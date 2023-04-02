<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class UserTask extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $user_id = DB::table('users')->insertGetId([
            'nombre' => 'stiven'
        ]);
        for ($i=0; $i < 5; $i++) {
            # code...
            DB::table('tasks')->insert([
                "nombre_task" => "Task {$i}",
                "completed" => false,
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
                "user_id" => $user_id
            ]);
        }
    }
}

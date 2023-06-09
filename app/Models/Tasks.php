<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tasks extends Model
{
    use HasFactory;
    protected $fillable = ["nombre_task", "completed"];

    protected $hidden = [];

    public function user(){
        return $this->belongsTo(User::class);
    }
}

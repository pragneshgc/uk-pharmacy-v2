<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrescriptionFile extends Model
{
    use HasFactory;

    protected $fillable = ['prescription_id', 'file_path', 'file_type'];
}

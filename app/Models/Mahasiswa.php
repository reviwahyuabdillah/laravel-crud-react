<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mahasiswa extends Model
{
    //
    protected $fillable = ['nim','nama', 'alamat', 'tanggal_lahir', 'fakultas', 'prodi'];
}

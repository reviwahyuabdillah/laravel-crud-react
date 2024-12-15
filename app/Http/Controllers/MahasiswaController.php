<?php

namespace App\Http\Controllers;

use App\Models\Mahasiswa;
use Illuminate\Http\Request;

class MahasiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Mahasiswa::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'nim' => 'required|unique:mahasiswa',
            'nama' => 'required',
            'alamat' => 'required',
            'tanggal_lahir' => 'required|date',
            'fakultas' => 'required',
            'prodi' => 'required',
        ]);
        return Mahasiswa::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
        return Mahasiswa::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Mahasiswa $mahasiswa)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //
        $mahasiswa = Mahasiswa::findOrFail($id);
        $mahasiswa->update($request->all());
        return $mahasiswa;

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        Mahasiswa::destroy($id);
        return response()->json(['message' => 'Data Berhasil dihapus']);
    }
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MahasiswaList = ({ onRefresh }) => {
    const [mahasiswa, setMahasiswa] = useState([]);
    const [isEditing, setIsEditing] = useState(null);
    const [editData, setEditData] = useState({ nim: '', nama: '', fakultas: '', prodi: '' });

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/mahasiswas')
            .then(response => setMahasiswa(response.data))
            .catch(error => console.error(error));
    }, [onRefresh]);

    const handleDelete = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/mahasiswas/${id}`)
            .then(() => {
                alert('Mahasiswa berhasil dihapus!');
                onRefresh();
            })
            .catch(error => console.error(error));
    };

    const handleEdit = (mhs) => {
        setIsEditing(mhs.id);
        setEditData({ nim: mhs.nim, nama: mhs.nama, fakultas: mhs.fakultas, prodi: mhs.prodi });
    };

    const handleEditSubmit = (e, id) => {
        e.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/mahasiswas/${id}`, editData)
            .then(() => {
                alert('Data mahasiswa berhasil diperbarui!');
                setIsEditing(null);
                onRefresh();
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h2>Daftar Mahasiswa</h2>
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>NIM</th>
                        <th>Nama</th>
                        <th>Fakultas</th>
                        <th>Prodi</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {mahasiswa.map((mhs) => (
                        <tr key={mhs.id}>
                            {isEditing === mhs.id ? (
                                <>
                                    <td>
                                        <input
                                            type="text"
                                            value={editData.nim}
                                            onChange={(e) => setEditData({ ...editData, nim: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={editData.nama}
                                            onChange={(e) => setEditData({ ...editData, nama: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={editData.fakultas}
                                            onChange={(e) => setEditData({ ...editData, fakultas: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={editData.prodi}
                                            onChange={(e) => setEditData({ ...editData, prodi: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <button onClick={(e) => handleEditSubmit(e, mhs.id)}>Simpan</button>
                                        <button onClick={() => setIsEditing(null)}>Batal</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{mhs.nim}</td>
                                    <td>{mhs.nama}</td>
                                    <td>{mhs.fakultas}</td>
                                    <td>{mhs.prodi}</td>
                                    <td>
                                        <button onClick={() => handleEdit(mhs)} style={{ border: 'none', background: 'none' }}>
                                            <i className="fas fa-edit" style={{ color: 'blue', cursor: 'pointer' }}></i>
                                        </button>
                                        <button onClick={() => handleDelete(mhs.id)} style={{ border: 'none', background: 'none' }}>
                                            <i className="fas fa-trash" style={{ color: 'red', cursor: 'pointer' }}></i>
                                        </button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MahasiswaList;

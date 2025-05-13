import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', quantity: '', price: '', gst: '' });
  const [editingItemId, setEditingItemId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const fetchItems = async () => {
    const res = await axios.get('http://localhost:5000/api/items');
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    const res = await axios.post('http://localhost:5000/api/items', {
      name: form.name,
      quantity: parseInt(form.quantity),
      price: parseFloat(form.price),
      gst: parseFloat(form.gst),
    });
    setItems([...items, res.data]);
    setForm({ name: '', quantity: '', price: '', gst: '' });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEdit = (item) => {
    setEditingItemId(item.id);
    setEditForm({ ...item });
  };

  const handleUpdate = async (id) => {
    await axios.put(`http://localhost:5000/api/items/${id}`, {
      name: editForm.name,
      quantity: parseInt(editForm.quantity),
      price: parseFloat(editForm.price),
      gst: parseFloat(editForm.gst),
    });
    setEditingItemId(null);
    fetchItems();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/items/${id}`);
    fetchItems();
  };

  const exportToText = () => {
    const content = items.map(({ id, ...i }) =>
      `${i.product_code}: ${i.name} - ${i.quantity} pcs, ₹${i.price}, GST: ${i.gst}%, Total: ₹${i.total_price}`
    ).join('\n');
    saveAs(new Blob([content], { type: 'text/plain' }), 'stock-list.txt');
  };

  const exportToExcel = () => {
    const exportData = items.map(({ id, ...rest }) => rest);
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Stocks');
    const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'stocks.xlsx');
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="p-4 border rounded shadow-sm bg-light">
        <h3 className="mb-4 text-primary">📦 Inventory Management</h3>

        <div className="row g-2 mb-4">
          <div className="col-md-2"><input className="form-control" name="name" placeholder="Item Name" value={form.name} onChange={handleChange} /></div>
          <div className="col-md-2"><input className="form-control" name="quantity" placeholder="Qty" value={form.quantity} onChange={handleChange} /></div>
          <div className="col-md-2"><input className="form-control" name="price" placeholder="Price ₹" value={form.price} onChange={handleChange} /></div>
          <div className="col-md-2"><input className="form-control" name="gst" placeholder="GST %" value={form.gst} onChange={handleChange} /></div>
          <div className="col-md-2"><button className="btn btn-primary w-100" onClick={handleAdd}>➕ Add Item</button></div>
        </div>

        <table className="table table-striped table-bordered align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Code</th>
              <th>Name</th>
              <th>Qty</th>
              <th>Price ₹</th>
              <th>GST %</th>
              <th>Total ₹</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={item.id}>
                <td>{i + 1}</td>
                <td><span className="badge bg-secondary">{item.product_code}</span></td>
                <td>
                  {editingItemId === item.id
                    ? <input name="name" className="form-control form-control-sm" value={editForm.name} onChange={handleEditChange} />
                    : item.name}
                </td>
                <td>
                  {editingItemId === item.id
                    ? <input name="quantity" className="form-control form-control-sm" value={editForm.quantity} onChange={handleEditChange} />
                    : item.quantity}
                </td>
                <td>
                  {editingItemId === item.id
                    ? <input name="price" className="form-control form-control-sm" value={editForm.price} onChange={handleEditChange} />
                    : item.price}
                </td>
                <td>
                  {editingItemId === item.id
                    ? <input name="gst" className="form-control form-control-sm" value={editForm.gst} onChange={handleEditChange} />
                    : item.gst}
                </td>
                <td><strong>₹{item.total_price}</strong></td>
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    {editingItemId === item.id ? (
                      <button className="btn btn-success btn-sm" onClick={() => handleUpdate(item.id)}>💾 Save</button>
                    ) : (
                      <button className="btn btn-warning btn-sm" onClick={() => handleEdit(item)}>✏️ Edit</button>
                    )}
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>🗑️ Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="d-flex gap-3 mt-4">
          <button onClick={exportToText} className="btn btn-outline-secondary">📄 Export TXT</button>
          <button onClick={exportToExcel} className="btn btn-outline-success">📊 Export Excel</button>
        </div>
      </div>
    </div>
  );
};

export default ItemList;

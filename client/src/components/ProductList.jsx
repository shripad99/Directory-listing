import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, updateCombination, bulkUpdate } from '../store/productSlice';
import AddProductModal from './AddProductModal';
import '../index.css';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, materials, grades, combinations } = useSelector((state) => state.products);
  const [filters, setFilters] = useState({ productId: '', materialId: '' });
  const [selectedIds, setSelectedIds] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [editForm, setEditForm] = useState({
    price: 0,
    currency: 'INR',
    materialId: '',
    shape: '',
    thickness: '',
    length: 0,
  });
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleQuickEdit = (combo) => {
    if (expandedId === combo._id) {
      setExpandedId(null);
    } else {
      setExpandedId(combo._id);
      setEditForm({
        price: combo.price || 0,
        currency: combo.currency || 'INR',
        materialId: combo.materialId?._id || '',
        shape: combo.shape || '',
        thickness: combo.thickness || '',
        length: combo.length || 0,
      });
    }
  };

  const saveEdit = (id) => {
    const filledFields = Object.values(editForm).filter((value) => value !== '' && value !== 0).length;
    if (filledFields < 4) {
      alert('Please fill at least 4 fields');
      return;
    }
    dispatch(updateCombination({ id, updates: editForm }));
    setExpandedId(null);
  };

  const handleBulkEdit = () => {
    const filledFields = Object.values(editForm).filter((value) => value !== '' && value !== 0).length;
    if (filledFields < 4) {
      alert('Please fill at least 4 fields');
      return;
    }
    dispatch(bulkUpdate({ ids: selectedIds, updates: editForm }));
    setSelectedIds([]);
  };

  const filteredCombinations = combinations.filter((c) =>
    (!filters.productId || c.productId._id === filters.productId) &&
    (!filters.materialId || c.materialId._id === filters.materialId)
  );

  // Pagination logic
  const totalItems = filteredCombinations.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCombinations = filteredCombinations.slice(startIndex, endIndex);

  return (
    <div className="container">
      <div className="header">
        <button onClick={() => setShowModal(true)} className="add-btn">Add Products</button>
        <div className="pagination-info">
          {startIndex + 1}-{Math.min(endIndex, totalItems)}/{totalItems} Products
        </div>
      </div>
      <div className="filters">
        <select
          value={filters.productId}
          onChange={(e) => setFilters({ ...filters, productId: e.target.value })}
        >
          <option value="">Products</option>
          {products.map((p) => (
            <option key={p._id} value={p._id}>{p.name}</option>
          ))}
        </select>
        <select
          value={filters.materialId}
          onChange={(e) => setFilters({ ...filters, materialId: e.target.value })}
        >
          <option value="">Materials</option>
          {materials.map((m) => (
            <option key={m._id} value={m._id}>{m.name}</option>
          ))}
        </select>
        <select>
          <option value="">Bulk Actions</option>
          <option value="edit">Edit Selected</option>
          <option value="delete">Delete Selected</option>
        </select>
        <button className="apply-btn">Apply</button>
        <div className="pagination">
          <span>Products</span>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Products</th>
            <th>Action</th>
            <th>Product Details</th>
            <th>Price in Unit</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCombinations.map((c) => (
            <React.Fragment key={c._id}>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(c._id)}
                    onChange={() => setSelectedIds((prev) =>
                      prev.includes(c._id) ? prev.filter((id) => id !== c._id) : [...prev, c._id]
                    )}
                  />
                </td>
                <td>{c.name}</td>
                <td>
                  <button onClick={() => handleQuickEdit(c)}>Quick Edit</button>
                  <button onClick={() => console.log('Add Product Details')}>Add Product Details</button>
                </td>
                <td>
                  <div>Material: {c.materialId?.name || 'N/A'}</div>
                  <div>Unit Length: {c.length ? `${c.length} meter` : 'N/A'}</div>
                  <div>Shape: {c.shape || 'N/A'}</div>
                </td>
                <td>{c.price ? `${c.price}/KG` : 'N/A'}</td>
              </tr>
              {expandedId === c._id && (
                <tr>
                  <td colSpan="5">
                    <div className="edit-form">
                      <h4>Product Details (Minimum 4 fields required)</h4>
                      <div className="form-row">
                        <label>Price *</label>
                        <input
                          type="number"
                          value={editForm.price}
                          onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                          placeholder="Price"
                          required
                        />
                        <select
                          value={editForm.currency}
                          onChange={(e) => setEditForm({ ...editForm, currency: e.target.value })}
                        >
                          <option value="INR">INR</option>
                          <option value="USD">USD</option>
                          <option value="EUR">EUR</option>
                        </select>
                        <span>/ KG</span>
                      </div>
                      <div className="form-row">
                        <label>Material</label>
                        <select
                          value={editForm.materialId}
                          onChange={(e) => setEditForm({ ...editForm, materialId: e.target.value })}
                        >
                          <option value="">Select Material</option>
                          {materials.map((m) => (
                            <option key={m._id} value={m._id}>{m.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-row">
                        <label>Shape</label>
                        <select
                          value={editForm.shape}
                          onChange={(e) => setEditForm({ ...editForm, shape: e.target.value })}
                        >
                          <option value="">Select Shape</option>
                          <option value="Round">Round</option>
                          <option value="Square">Square</option>
                          <option value="Flat">Flat</option>
                        </select>
                      </div>
                      <div className="form-row">
                        <label>Thickness</label>
                        <input
                          value={editForm.thickness}
                          onChange={(e) => setEditForm({ ...editForm, thickness: e.target.value })}
                          placeholder="e.g., 1mm to 3mm"
                        />
                      </div>
                      <div className="form-row">
                        <label>Length</label>
                        <input
                          type="number"
                          value={editForm.length}
                          onChange={(e) => setEditForm({ ...editForm, length: e.target.value })}
                          placeholder="Length"
                        />
                      </div>
                      <div className="form-actions">
                        <button className="update-btn" onClick={() => saveEdit(c._id)}>Update</button>
                        <button className="cancel-btn" onClick={() => setExpandedId(null)}>Cancel</button>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {selectedIds.length > 0 && (
        <div>
          <h3>Bulk Edit</h3>
          <button onClick={handleBulkEdit}>Apply to Selected</button>
        </div>
      )}
      {showModal && <AddProductModal closeModal={() => setShowModal(false)} />}
    </div>
  );
};

export default ProductList;
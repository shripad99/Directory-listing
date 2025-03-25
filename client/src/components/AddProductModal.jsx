import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCombination } from '../store/productSlice';
import './AddProductModal.css'; // Create a separate CSS file for the modal

const AddProductModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { products, materials, grades, combinations } = useSelector((state) => state.products);
  const [form, setForm] = useState({ productId: '', materialId: '', gradeIds: [] });

  const handleGradeChange = (gradeId) => {
    setForm((prev) => {
      const gradeIds = prev.gradeIds.includes(gradeId)
        ? prev.gradeIds.filter((id) => id !== gradeId)
        : [...prev.gradeIds, gradeId];
      return { ...form, gradeIds };
    });
  };

  const handleSubmit = () => {
    if (!form.productId || !form.materialId || form.gradeIds.length === 0) {
      alert('Please select a product, material, and at least one grade');
      return;
    }
    dispatch(addCombination(form));
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add Products</h2>
          <button className="close-btn" onClick={closeModal}>X</button>
        </div>
        <div className="modal-body">
          <div className="modal-column">
            <h3>Product</h3>
            <select
              value={form.productId}
              onChange={(e) => setForm({ ...form, productId: e.target.value })}
            >
              <option value="">Select Product</option>
              {products.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name} ({combinations.filter(c => c.productId._id === p._id).length})
                </option>
              ))}
            </select>
          </div>
          <div className="modal-column">
            <h3>Material</h3>
            <select
              value={form.materialId}
              onChange={(e) => setForm({ ...form, materialId: e.target.value })}
            >
              <option value="">Select Material</option>
              {materials.map((m) => (
                <option key={m._id} value={m._id}>
                  {m.name} ({combinations.filter(c => c.materialId._id === m._id).length})
                </option>
              ))}
            </select>
          </div>
          <div className="modal-column">
            <h3>Grade</h3>
            <div className="grade-list">
              {grades.map((g) => {
                const combinationName = form.productId && form.materialId
                  ? `${materials.find(m => m._id === form.materialId)?.name} ${g.name} ${products.find(p => p._id === form.productId)?.name}`
                  : '';
                return (
                  <label key={g._id} className="grade-item">
                    <input
                      type="checkbox"
                      checked={form.gradeIds.includes(g._id)}
                      onChange={() => handleGradeChange(g._id)}
                    />
                    {combinationName || g.name}
                  </label>
                );
              })}
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="submit-btn" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
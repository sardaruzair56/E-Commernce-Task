// src/pages/Shop.jsx
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from './userAuth';
import { useCart } from '../Context/CartContext';

function Shop() {
  const { token } = useAuth();
  const { addToCart } = useCart();

  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', price: 100, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Product 2', price: 150, image: 'https://via.placeholder.com/150' },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: null,
    imagePreview: null 
  });

  const handleAddProduct = (e) => {
    e.preventDefault();
    setProducts([...products, { 
      id: products.length + 1, 
      name: newProduct.name, 
      price: parseFloat(newProduct.price), 
      image: newProduct.imagePreview 
    }]);
    setNewProduct({ name: '', price: '', image: null, imagePreview: null });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({
          ...newProduct,
          image: file,
          imagePreview: reader.result 
        });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h2>Shop</h2>
      
      
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Product Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          required
        />
        <input
          type="file"
          accept="image/*" 
          onChange={handleImageChange}
          required
        />
        {newProduct.imagePreview && (
          <img src={newProduct.imagePreview} alt="Preview" width="100" />
        )}
        <button type="submit">Add Product</button>
      </form>

      {/* Display Products */}
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <img src={product.image} alt={product.name} width="100" />
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;

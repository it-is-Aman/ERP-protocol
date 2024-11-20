import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function InventoryManagement() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', sku: '', quantity: '', price: '' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch('http://localhost:5000/api/products');
    const data = await response.json();
    setProducts(data);
  };

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    });
    setNewProduct({ name: '', sku: '', quantity: '', price: '' });
    fetchProducts();
  };

  const handleUpdateQuantity = async (id, newQuantity) => {
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: newQuantity }),
    });
    fetchProducts();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Management</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 mb-4">
          <Input
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            required
          />
          <Input
            name="sku"
            value={newProduct.sku}
            onChange={handleInputChange}
            placeholder="SKU (stock keeping unit)"
            required
          />
          <Input
            name="quantity"
            value={newProduct.quantity}
            onChange={handleInputChange}
            placeholder="Quantity"
            type="number"
            required
          />
          <Input
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            placeholder="Price"
            type="number"
            step="0.01"
            required
          />
          <Button type="submit">Add Product</Button>
        </form>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell className="flex gap-2">
                  <Button onClick={() => handleUpdateQuantity(product._id, product.quantity + 1)}>+</Button>
                  <Button onClick={() => handleUpdateQuantity(product._id, Math.max(0, product.quantity - 1))}>-</Button>
                  <Button onClick={() => handleDelete(product._id)}>Delete</Button>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default InventoryManagement;
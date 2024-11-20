import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RevenueManagement() {
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({ description: '', amount: '', date: '' });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const response = await fetch('http://localhost:5000/api/sales/transactions');
    const data = await response.json();
    setTransactions(data);
  };

  const handleInputChange = (e) => {
    setNewTransaction({ ...newTransaction, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/sales/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTransaction),
    });
    setNewTransaction({ description: '', amount: '', date: '' });
    fetchTransactions();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Management</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 mb-4">
          <Input
            name="description"
            value={newTransaction.description}
            onChange={handleInputChange}
            placeholder="Transaction Description"
            required
          />
          <Input
            name="amount"
            value={newTransaction.amount}
            onChange={handleInputChange}
            placeholder="Amount"
            type="number"
            step="0.01"
            required
          />
          <Input
            name="date"
            value={newTransaction.date}
            onChange={handleInputChange}
            placeholder="Date"
            type="date"
            required
          />
          <Button type="submit">Add Transaction</Button>
        </form>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction._id}>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
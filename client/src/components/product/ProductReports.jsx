import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function ProductReports() {
    const [reportData, setReportData] = useState({
        stockLevels: [],
        productPerformance: [],
        restockingNeeds: []
    });

    useEffect(() => {
        fetchReportData();
    }, []);

    const fetchReportData = async () => {
        const response = await fetch('http://localhost:5000/api/products/reports');
        const data = await response.json();
        setReportData(data);
    };

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Stock Levels</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={reportData.stockLevels}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="quantity" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* <Card>
                <CardHeader>
                    <CardTitle>Product Performance</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={reportData.productPerformance}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="sales" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card> */}

            <Card>
                <CardHeader>
                    <CardTitle>Restocking Needs</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={reportData.restockingNeeds}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="neededQuantity" fill="#ffc658" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}

export default ProductReports;
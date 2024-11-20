import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function SalesReporting() {
    const [reportData, setReportData] = useState({
        monthlySales: [],
        salesByStage: [],
        topSalespeople: []
    });

    useEffect(() => {
        fetchReportData();
    }, []);

    const fetchReportData = async () => {
        const response = await fetch('http://localhost:5000/api/sales/reports');
        const data = await response.json();
        setReportData(data);
    };

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Monthly Sales</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={reportData.monthlySales}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* <Card>
                <CardHeader>
                    <CardTitle>Sales by Stage</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={reportData.salesByStage}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="stage" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card> */}

            <Card>
                <CardHeader>
                    <CardTitle>Top Salespeople</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={reportData.topSalespeople}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="sales" fill="#ffc658" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}
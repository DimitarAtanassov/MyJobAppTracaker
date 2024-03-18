import React from 'react';
import { BarChart, Bar, Cell, XAxis, LabelList } from 'recharts';


const JobAppChart = ({ jobApplications }) => {
    const data = [
        { name: 'Accepted', value: jobApplications.accepted },
        { name: 'Rejected', value: jobApplications.rejected },
        { name: 'Pending', value: jobApplications.pending }
    ];
    // Hardcoded mock data
    // const data = [
    //     { name: 'Accepted', value: 25 },
    //     { name: 'Reject', value: 15 },
    //     { name: 'Pending', value: 10 }
    // ];
    const COLORS = ['#2E8B57', '#FF6347', '#FFD700'];

    return (
        <BarChart width={400} height={400} data={data}>
            <XAxis dataKey="name" />
            <Bar dataKey="value" fill="#8884d8">
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
                <LabelList dataKey="value" position="top" />
            </Bar>
        </BarChart>
    );
};

export default JobAppChart;



        // Hardcoded mock data
        // const data = [
        //     { name: 'Accepted', value: 25 },
        //     { name: 'Reject', value: 15 },
        //     { name: 'Pending', value: 10 }
        // ];
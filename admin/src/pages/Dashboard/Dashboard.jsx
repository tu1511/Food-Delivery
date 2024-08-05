// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
} from "chart.js";

import "./Dashboard.css";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title
);
const Dashboard = ({ url }) => {
  const [userCount, setUserCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalRevenueReal, setTotalRevenueReal] = useState(0);
  const [monthlyOrderCount, setMonthlyOrderCount] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyRevenueData, setMonthlyRevenueData] = useState({});

  const fetchCategoryData = async () => {
    try {
      const response = await axios.get(`${url}/api/order/category`);
      if (response.data.success) {
        setCategoryData(response.data.categoryData);
      } else {
        console.error("Error fetching category data");
      }
    } catch (error) {
      console.error("Error fetching category data", error);
    }
  };

  // Function to fetch user count
  const fetchUserCount = async () => {
    try {
      const response = await axios.get(`${url}/api/user/user`);
      if (response.data.success) {
        setUserCount(response.data.userData.length);
      } else {
        console.error("Error fetching user count");
      }
    } catch (error) {
      console.error("Error fetching user count", error);
    }
  };

  // Function to fetch total revenue
  const fetchTotalRevenue = async () => {
    try {
      const response = await axios.get(`${url}/api/order/revenue`);
      if (response.data.success) {
        setTotalRevenue(response.data.revenue);
      } else {
        console.error("Error fetching total revenue");
      }
    } catch (error) {
      console.error("Error fetching total revenue", error);
    }
  };

  // Function to fetch total real revenue
  const fetchTotalRevenueReal = async () => {
    try {
      const response = await axios.get(`${url}/api/order/revenuereal`);
      if (response.data.success) {
        setTotalRevenueReal(response.data.revenue);
      } else {
        console.error("Error fetching total revenue (real)");
      }
    } catch (error) {
      console.error("Error fetching total revenue (real)", error);
    }
  };

  // Function to fetch monthly order count
  const fetchMonthlyOrderCount = async () => {
    try {
      const response = await axios.get(`${url}/api/order/monthlyorder`);
      if (response.data.success) {
        setMonthlyOrderCount(response.data.count);
      } else {
        console.error("Error fetching monthly order count");
      }
    } catch (error) {
      console.error("Error fetching monthly order count", error);
    }
  };

  // Function to fetch monthly revenue
  const fetchMonthlyRevenue = async () => {
    try {
      const response = await axios.get(`${url}/api/order/monthlyrevenue`);
      if (response.data.success) {
        const { revenue, monthlyData } = response.data;

        // Update state with fetched data
        setMonthlyRevenue(revenue);
      } else {
        console.error("Error fetching monthly revenue");
      }
    } catch (error) {
      console.error("Error fetching monthly revenue", error);
    }
  };

  // Function to fetch monthly revenue
  const fetchMonthlyRevenueDetail = async () => {
    try {
      const response = await axios.get(`${url}/api/order/detail`);
      if (response.data.success) {
        const { monthlyRevenue } = response.data;

        // Update state with fetched data
        setMonthlyRevenueData(monthlyRevenue);
      } else {
        console.error("Error fetching monthly revenue");
      }
    } catch (error) {
      console.error("Error fetching monthly revenue", error);
    }
  };

  // useEffect to fetch initial data on component mount
  useEffect(() => {
    fetchUserCount();
    fetchTotalRevenue();
    fetchTotalRevenueReal();
    fetchMonthlyOrderCount();
    fetchMonthlyRevenue();
    fetchMonthlyRevenueDetail();
    fetchCategoryData();
  }, []);

  const chartData = {
    labels: categoryData.map((data) => data.category),
    datasets: [
      {
        label: "Products Sold by Category",
        data: categoryData.map((data) => data.quantity),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#4CAF50",
          "#000000",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#4CAF50",
          "#000000",
        ],
      },
    ],
  };

  // Sort labels for bar chart in chronological order
  const sortedMonths = Object.keys(monthlyRevenueData).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateA - dateB;
  });

  const barChartData = {
    labels: sortedMonths,
    datasets: [
      {
        label: "Total Revenue",
        data: sortedMonths.map((month) => monthlyRevenueData[month].total),
        backgroundColor: "#36A2EB",
        borderColor: "#36A2EB",
        borderWidth: 1,
      },
      {
        label: "Paid Revenue",
        data: sortedMonths.map((month) => monthlyRevenueData[month].paid),
        backgroundColor: "#FF6384",
        borderColor: "#FF6384",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className=" flex-col order add">
      <h3>Admin Dashboard</h3>
      <div className="dashboard">
        <div className="dashboard-stats">
          <div className="dashboard-stat">
            <h2>Total Revenue (All Orders)</h2>
            <p>${totalRevenue.toFixed(2)}</p>
          </div>
          <div className="dashboard-stat">
            <h2>Total Revenue (Paid Orders)</h2>
            <p>${totalRevenueReal.toFixed(2)}</p>
          </div>
          <div className="dashboard-stat">
            <h2>Orders This Month</h2>
            <p>{monthlyOrderCount}</p>
          </div>
          <div className="dashboard-stat">
            <h2>Monthly Revenue</h2>
            <p>${monthlyRevenue.toFixed(2)}</p>
          </div>
        </div>
        <div className="dashboard-chart">
          <h2>Top Category</h2>
          <Doughnut data={chartData} />
        </div>
      </div>
      <div className="dashboard-chart-details">
        <h2>Monthly Revenue Details</h2>
        <Bar data={barChartData} />
      </div>
    </div>
  );
};

export default Dashboard;

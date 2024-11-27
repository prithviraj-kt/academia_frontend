import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Components/Navabr";
import { useNavigate } from "react-router-dom";
const BillsPage = () => {

  const navigate = useNavigate()
  useEffect(() => {
    const auth = async() => {
      const token = await localStorage.getItem("token");
      if (!token){
        navigate("/login")
      }
    }
    auth();
  },[])
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
/*
{
          headers: {
            authorisation: "",
          },
        },

*/ 
  // Fetch bills on page load
  useEffect(() => {
    const fetchBills = async () => {
      const studentId = localStorage.getItem("studentId");
      try {
        const response = await axios.post("/api/getBills", { studentId });
        setBills(response.data.bills); // Assuming the API returns an array of bills
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };

    fetchBills();
  }, []);

  const handleHistoryClick = async (bill) => {
    const studentId = localStorage.getItem("studentId");
    try {
      const response = await axios.post("/api/getBillHistory", {
        studentId,
        billId: bill.id,
      });
      setSelectedBill({ ...bill, history: response.data.history }); // Assuming API returns 'history' array
    } catch (error) {
      console.error("Error fetching bill history:", error);
    }
  };

  const closePopup = () => {
    setSelectedBill(null);
  };

  const payInstallment = (bill) => {
    console.log("Pay installment for bill:", bill);
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-8 px-4 lg:px-10">
        <h1 className="text-2xl font-bold text-blue-900 text-center mb-6">
          Bills
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Bill Date</th>
                <th className="px-4 py-2 text-left">Dead Line</th>
                <th className="px-4 py-2 text-left">Remaining</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((bill) => (
                <tr
                  key={bill.id}
                  className="border-t border-gray-300 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2">{bill.id}</td>
                  <td className="px-4 py-2">{bill.description}</td>
                  <td className="px-4 py-2">{bill.amount}</td>
                  <td className="px-4 py-2">{bill.billDate}</td>
                  <td className="px-4 py-2">{bill.deadLine}</td>
                  <td className="px-4 py-2">{bill.remainingAmount}</td>
                  <td className="px-4 py-2 flex justify-center gap-2">
                    <button
                      onClick={() => payInstallment(bill)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                      Pay
                    </button>
                    <button
                      className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                      onClick={() => handleHistoryClick(bill)}
                    >
                      History
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedBill && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-blue-900 mb-4">
                Transaction History for {selectedBill.description}
              </h2>
              <table className="min-w-full bg-gray-50 border border-gray-300 rounded">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2 text-left">ID</th>
                    <th className="px-4 py-2 text-left">Amount</th>
                    <th className="px-4 py-2 text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedBill.history.map((transaction) => (
                    <tr key={transaction.id} className="border-t">
                      <td className="px-4 py-2">{transaction.id}</td>
                      <td className="px-4 py-2">{transaction.amount}</td>
                      <td className="px-4 py-2">{transaction.paymentDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition w-full"
                onClick={closePopup}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillsPage;

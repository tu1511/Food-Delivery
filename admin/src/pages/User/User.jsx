// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "./User.css";
import axios from "axios";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";

const User = ({ url }) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Chỉnh sửa bắt đầu từ 0
  const [itemsPerPage] = useState(10); // Số sản phẩm trên mỗi trang

  const fetchUsers = async () => {
    const response = await axios.get(url + "/api/user/user");
    if (response.data.success) {
      setUsers(response.data.userData);
      console.log(response.data.userData);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Paginate Logic
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem).reverse();

  return (
    <div className="list add flex-col">
      <h3>All Users</h3>
      <div className="list-table">
        <div className="list-table-format title">
          <b>NU</b>
          <b>ID</b>
          <b>Name</b>
          <b>Email</b>
          <b>Action</b>
        </div>
        {currentItems.map((user, index) => {
          return (
            <div key={index} className="list-table-format">
              <p>{index + 1 + currentPage * itemsPerPage}</p>
              {/* Chỉnh sửa index để tính đúng thứ tự trong toàn bộ danh sách */}
              <p>{user._id}</p>
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p className="cursor">X</p>
            </div>
          );
        })}
      </div>
      <ReactPaginate
        pageCount={Math.ceil(users.length / itemsPerPage)}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default User;

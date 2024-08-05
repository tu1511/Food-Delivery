// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "./Contact.css";
import axios from "axios";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";

const Contact = ({ url }) => {
  const [contacts, setContacts] = useState([]); // Ensure the state is initialized as an empty array
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const fetchContacts = async () => {
    try {
      const response = await axios.get(url + "/api/contact/get");
      if (response.data.success) {
        setContacts(response.data.messages);
      } else {
        toast.error("Error fetching contacts");
      }
    } catch (error) {
      toast.error("Error fetching contacts");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Handle page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Paginate logic
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    contacts.length > 0
      ? contacts.slice(indexOfFirstItem, indexOfLastItem).reverse()
      : [];

  return (
    <div className="list add flex-col">
      <h3>All Contacts</h3>
      <div className="list-table">
        <div className="list-table__format title">
          <b>Time</b>
          <b>Name</b>
          <b>Email</b>
          <b>Message</b>
          <b>Action</b>
        </div>
        {currentItems.length > 0 ? (
          currentItems.map((contact, index) => (
            <div key={index} className="list-table__format">
              <p>{contact.date}</p>
              <p>{contact.name}</p>
              <p>{contact.email}</p>
              <p>{contact.message}</p>
              <p className="cursor">X</p>
            </div>
          ))
        ) : (
          <p>No contacts found</p>
        )}
      </div>
      <ReactPaginate
        pageCount={Math.ceil(contacts.length / itemsPerPage)}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default Contact;

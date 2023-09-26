import React, { useState } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiSolidPencil, BiTrash } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import InvoiceModal from "../components/InvoiceModal";
import { useNavigate } from "react-router-dom";
import { useInvoiceListData } from "../redux/hooks";
import { useDispatch } from "react-redux";
import { deleteInvoice } from "../redux/invoicesSlice";

const InvoiceList = () => {
  const { invoiceList } = useInvoiceListData();
  const isListEmpty = invoiceList.length === 0;
  const invoiceTable = invoiceList.map((invoice) => (
    <InvoiceRow key={invoice.invoiceNumber} invoice={invoice} />
  ));
  return (
    <Row>
      <Col className="w-100" md={8} lg={9}>
        <Card className="d-flex p-4 p-xl-5 my-3 my-xl-4">
          {isListEmpty ? (
            <div className="d-flex flex-column align-items-center">
              <h3 className="fw-bold pb-4">No invoices present</h3>
              <Link to="/create">
                <Button variant="primary">Create Invoice</Button>
              </Link>
            </div>
          ) : (
            <div className="d-flex flex-column">
              <div className="d-flex flex-row align-items-center justify-content-between ">
                <h3 className="fw-bold pb-4">Invoice List</h3>
                <Link to="/create">
                  <Button variant="primary mb-4 mr-2">Create Invoice</Button>
                </Link>
              </div>
              <Table>
                <thead>
                  <tr>
                    <th>Invoice No.</th>
                    <th>Bill To</th>
                    <th>Bill From</th>
                    <th>Due Date</th>
                    <th>Total Amt.</th>
                  </tr>
                </thead>
                <tbody>{invoiceTable}</tbody>
              </Table>
            </div>
          )}
        </Card>
      </Col>
    </Row>
  );
};

const InvoiceRow = ({ invoice }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDeleteClick = () => {
    dispatch(deleteInvoice(invoice.id));
  };
  const handleEditClick = () => {
    navigate(`/edit/${invoice.id}`);
  };

  const openModal = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <tr>
      <th>{invoice.invoiceNumber}</th>
      <th className="fw-normal">{invoice.billTo}</th>
      <th className="fw-normal">{invoice.billFrom}</th>
      <th className="fw-normal">{invoice.dateOfIssue}</th>
      <th className="fw-normal">
        {invoice.currency}
        {invoice.total}
      </th>
      <th style={{ width: "5%" }}>
        <Button variant="outline-primary" onClick={handleEditClick}>
          <div className="d-flex align-items-center justify-content-center gap-2">
            <BiSolidPencil />
          </div>
        </Button>
      </th>
      <th style={{ width: "5%" }}>
        <Button variant="danger" onClick={handleDeleteClick}>
          <div className="d-flex align-items-center justify-content-center gap-2">
            <BiTrash />
          </div>
        </Button>
      </th>
      <th style={{ width: "5%" }}>
        <Button variant="secondary" onClick={openModal}>
          <div className="d-flex align-items-center justify-content-center gap-2">
            <BsEyeFill />
          </div>
        </Button>
      </th>
      <InvoiceModal
        showModal={isOpen}
        closeModal={closeModal}
        info={{
          isOpen,
          id: invoice.id,
          currency: invoice.currency,
          currentDate: invoice.currentDate,
          invoiceNumber: invoice.invoiceNumber,
          dateOfIssue: invoice.dateOfIssue,
          billTo: invoice.billTo,
          billToEmail: invoice.billToEmail,
          billToAddress: invoice.billToAddress,
          billFrom: invoice.billFrom,
          billFromEmail: invoice.billFromEmail,
          billFromAddress: invoice.billFromAddress,
          notes: invoice.notes,
          total: invoice.total,
          subTotal: invoice.subTotal,
          taxRate: invoice.taxRate,
          taxAmount: invoice.taxAmount,
          discountRate: invoice.discountRate,
          discountAmount: invoice.discountAmount,
        }}
        items={invoice.items}
        currency={invoice.currency}
        subTotal={invoice.subTotal}
        taxAmount={invoice.taxAmount}
        discountAmount={invoice.discountAmount}
        total={invoice.total}
      />
    </tr>
  );
};

export default InvoiceList;

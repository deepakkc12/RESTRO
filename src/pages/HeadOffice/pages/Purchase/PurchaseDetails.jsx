import TableLayout from "../../../../components/Table/TableLayout";
import { getRequest } from "../../../../services/apis/requests";
import React, { useEffect, useState } from "react";
import { formatDateToDDMMYYYY } from "../../../../utils/helper";

function PurchaseDetails({branchCode,onBack,branchName,start=null,end=null,onChangeDate}) {

  const [data, setData] = useState([]);

  const [startDate, setStartDate] = useState(start);
  const [endDate, setendDate] = useState(end);

  const [loading, setLoading] = useState(false);

  const onChangeDates = (startDate, endDate) => {
    setStartDate(startDate);
    setendDate(endDate);
    onChangeDate(startDate, endDate)
  };
  
  const headers = [
    { key: "slNo", label: "Sl.No" },
    { key: "PartyName", label: "Party" },
    { key: "TaxNumber", label: "TaxNumber" },
    { key: "InvoiceNumber", label: "InvoiceNumber" },
    { key: "InvoiceDate", label: "InvoiceDate" },
    { key: "TaxableAmount", label: "TaxableAmount" },
    { key: "Tax", label: "Tax" },
    { key: "Charges", label: "Charges" },
    { key: "Discount", label: "Discount" },
    { key: "NetValue", label: "NetValue" },
    { key: "Cash", label: "Cash" },
    { key: "Credit", label: "Credit" },


    // { key: "TotalAmount", label: "TotalAmount" },
  ];

  const getData = async () => {
    const today = new Date(); // Current date
    const weekAgo = new Date(today); // Clone the today date
    weekAgo.setDate(today.getDate() - 7);


    setLoading(true)
    const formated_startdate =startDate? formatDateToDDMMYYYY(startDate) : formatDateToDDMMYYYY(weekAgo)
    const formated_endDate =endDate? formatDateToDDMMYYYY(endDate) : formatDateToDDMMYYYY(today)
    const response = await getRequest(`ho/purchase-sales-details/?startDate=${formated_startdate}&endDate=${formated_endDate}&branchCode=${branchCode}`);
    setData(response.data);
    setLoading(false)
  };


  useEffect(() => {
    getData();
  }, [startDate,endDate]);
  return (
    <div className="p-4">


      <TableLayout
      onBack = {onBack}
        loading={loading}
        datePickerOptions={{
          showDatePicker: true,
          pickerType: "range",
        }}
        startDate={start}
        endDate={end}
        onDateRangeChange={onChangeDates}
        headers={headers}
        data={data}
        title={`Purchase details in ${branchName}`}
      />

    </div>
  );
}

export default PurchaseDetails;

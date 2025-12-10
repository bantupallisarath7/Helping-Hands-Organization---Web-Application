import dayjs from "dayjs";
const Donation = ({ data }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition text-sm text-gray-800 space-y-4">
      <h3 className="text-lg font-bold text-red-800">
        Campaign Title:{" "}
        <span className="text-gray-900 font-semibold">{data.campaignTitle}</span>
      </h3>

      <p>
        <span className="text-gray-500 font-semibold">Requested Student:</span>{" "}
        {data.requestedStudent}
      </p>

      <p>
        <span className="text-gray-500 font-semibold">Donor Name:</span>{" "}
        {data.donorName}
      </p>

      <p>
        <span className="text-gray-500 font-semibold">Transaction ID:</span>{" "}
        {data.transactionId}
      </p>

      <p>
        <span className="text-gray-500 font-semibold">Donated Amount:</span>{" "}
        <span className="text-green-700 font-semibold">{" "}₹{data.donatedAmount.toLocaleString()}</span>
      </p>

      <p>
        <span className="text-gray-500 font-semibold">Donation Date:</span>{" "}
        <span className="text-red-600 font-semibold">{dayjs(data.donationDate).format("DD MMMM YYYY")}</span>
      </p>
    </div>
  );
};

export default Donation;
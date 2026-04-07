const StatusBadge = ({ status }) => {

  const styles = {
    Applied: "bg-blue-100 text-blue-600",
    "Under Review": "bg-yellow-100 text-yellow-600",
    Interview: "bg-purple-100 text-purple-600",
    Selected: "bg-green-100 text-green-600",
    Rejected: "bg-red-100 text-red-600"
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
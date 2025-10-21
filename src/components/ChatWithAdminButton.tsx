import React from "react";

const ChatWithAdminButton: React.FC = () => {
  const handleChatClick = () => {
    const phoneNumber = "911234567890"; // Replace with your admin's WhatsApp number
    const message = encodeURIComponent("Hello Admin, I have a query.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <button
      onClick={handleChatClick}
      className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-700 transition"
    >
      Chat with Admin
    </button>
  );
};

export default ChatWithAdminButton;

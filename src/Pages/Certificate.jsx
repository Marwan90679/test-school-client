import React, { useState } from "react";
import { Award, Download, Eye, X } from "lucide-react";

// Dummy data for a user's certificates
const DUMMY_USER_CERTIFICATES = [
  "A1: Introduction to React",
  "B2: Advanced State Management",
  "C1: Component Lifecycle Mastery",
];

// Dummy user for the preview modal
const DUMMY_USER = {
  displayName: "John Doe",
};

// The main certificates page component
const Certificate = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [certificateToPreview, setCertificateToPreview] = useState(null);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  // Function to handle preview button click
  const handlePreviewClick = (certificateName) => {
    setCertificateToPreview(certificateName);
    setShowPreview(true);
  };

  // Function to handle download button click
  const handleDownloadClick = () => {
    setShowDownloadModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8 sm:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">My Certificates</h2>
          <Award size={36} className="text-yellow-400" />
        </div>
        
        {/* Certificate List */}
        <div className="space-y-4">
          {DUMMY_USER_CERTIFICATES.map((cert, index) => (
            <div 
              key={index} 
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-gray-900 rounded-xl shadow-lg border border-gray-700"
            >
              <div className="flex items-center mb-4 sm:mb-0">
                <Award size={24} className="text-blue-500 mr-4 flex-shrink-0" />
                <p className="text-lg font-medium text-white">{cert}</p>
              </div>
              <div className="flex space-x-4">
                <button 
                  onClick={() => handlePreviewClick(cert)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
                >
                  <Eye size={20} />
                  <span>Preview</span>
                </button>
                <button 
                  onClick={handleDownloadClick}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-gray-300 font-semibold rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-300"
                >
                  <Download size={20} />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-[999]">
          <div className="relative bg-white text-gray-900 rounded-xl shadow-2xl p-8 max-w-lg w-full transform transition-all scale-100 animate-zoom-in">
            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
            >
              <X size={24} />
            </button>
            <div className="flex flex-col items-center text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Certificate of Completion</h3>
              <p className="text-sm text-gray-500 mb-6">This certificate is awarded to</p>
              <p className="text-4xl font-extrabold text-blue-600 mb-8">{DUMMY_USER.displayName}</p>
              
              <div className="w-full h-px bg-gray-300 mb-8"></div>
              
              <p className="text-lg font-semibold text-gray-700 mb-2">For successfully completing the course:</p>
              <p className="text-2xl font-extrabold text-green-700 mb-6">{certificateToPreview}</p>
              
              <div className="text-gray-600">
                <p>Date: August 10, 2025</p>
                <p>Instructor: Jane Smith</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Download Confirmation Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-[999]">
          <div className="relative bg-white text-gray-900 rounded-xl shadow-2xl p-8 max-w-sm w-full transform transition-all scale-100 animate-zoom-in text-center">
            <h3 className="text-2xl font-bold mb-4">Download Coming Soon!</h3>
            <p className="text-gray-600 mb-6">The download functionality is currently being built. Please check back later!</p>
            <button
              onClick={() => setShowDownloadModal(false)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificate;

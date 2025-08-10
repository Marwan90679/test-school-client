import React, { useState, useEffect, useContext } from "react";
import { Award, Download, Eye, X } from "lucide-react";
import { Document, Page, Text, View, StyleSheet, pdf } from "@react-pdf/renderer";
import { AuthContext } from "../Contexts/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";

const certificateNames = {
  A1: "Beginner Assessment: Introduction Quiz",
  A2: "Beginner Assessment: Foundational Challenge",
  B1: "Intermediate Assessment: History Quiz",
  B2: "Intermediate Assessment: Advanced Logic Exam",
  C1: "Advanced Assessment: Complex Problem Solving",
  C2: "Advanced Assessment: Knowledge Evaluation",
};

const styles = StyleSheet.create({
  page: { flexDirection: "column", backgroundColor: "#ffffff", padding: 40, fontFamily: "Helvetica" },
  container: { border: "2px solid #000", borderRadius: 10, padding: 30, flexGrow: 1, justifyContent: "center", alignItems: "center" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 10, color: "#000" },
  subheader: { fontSize: 18, color: "#555", marginBottom: 5 },
  title: { fontSize: 48, fontWeight: "extrabold", color: "#3b82f6", marginBottom: 20, marginTop: 20 },
  course: { fontSize: 22, fontWeight: "bold", color: "#10b981", marginTop: 20 },
  signature: { fontSize: 14, color: "#888", marginTop: 30 },
});

const MyDocument = ({ userName, certificateName }) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.header}>Certificate of Achievement</Text>
        <Text style={styles.subheader}>This certificate is awarded to</Text>
        <Text style={styles.title}>{userName}</Text>
        <Text style={styles.subheader}>For successfully completing the assessment:</Text>
        <Text style={styles.course}>{certificateName}</Text>
        <Text style={styles.signature}>Issued on: August 10, 2025</Text>
      </View>
    </Page>
  </Document>
);

const Certificate = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [showPreview, setShowPreview] = useState(false);
  const [certificateToPreview, setCertificateToPreview] = useState(null);
  const [userCertificates, setUserCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user || !user.email) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await axiosSecure.get("/users/data", {
          params: { email: user.email }
        });
        const userData = response.data;
        setUserName(userData.name || "User");

        if (userData.certificates && userData.certificates.includes("Failed")) {
          setUserCertificates([]);
        } else {
          const mappedCerts = userData.certificates.map(
            certCode => certificateNames[certCode] || certCode
          );
          setUserCertificates(mappedCerts);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserCertificates([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user, axiosSecure]);

  const handlePreviewClick = (certificateName) => {
    setCertificateToPreview(certificateName);
    setShowPreview(true);
  };

  const generateAndDownloadPdf = async (certificateName) => {
    const doc = <MyDocument userName={userName} certificateName={certificateName} />;
    const blob = await pdf(doc).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${certificateName.replace(/ /g, "_")}_Certificate.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-xl">Loading your certificates...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8 sm:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">My Achievements</h2>
          <Award size={36} className="text-yellow-400" />
        </div>

        <div className="space-y-4">
          {userCertificates.length > 0 ? (
            userCertificates.map((cert, index) => (
              <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-gray-900 rounded-xl shadow-lg border border-gray-700">
                <div className="flex items-center mb-4 sm:mb-0">
                  <Award size={24} className="text-blue-500 mr-4 flex-shrink-0" />
                  <p className="text-lg font-medium text-white">{cert}</p>
                </div>
                <div className="flex space-x-4">
                  <button onClick={() => handlePreviewClick(cert)} className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300">
                    <Eye size={20} />
                    <span>Preview</span>
                  </button>
                  <button onClick={() => generateAndDownloadPdf(cert)} className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-gray-300 font-semibold rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-300">
                    <Download size={20} />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-8 bg-gray-900 rounded-xl border border-gray-700">
              <p className="text-lg font-medium text-gray-400">You have not completed any assessments yet.</p>
            </div>
          )}
        </div>
      </div>

      {showPreview && certificateToPreview && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-75 flex items-center justify-center p-4 z-[999]">
          <div className="relative bg-white text-gray-900 rounded-xl shadow-2xl p-8 max-w-lg w-full">
            <button onClick={() => setShowPreview(false)} className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300">
              <X size={24} />
            </button>
            <div className="flex flex-col items-center text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Certificate of Achievement</h3>
              <p className="text-sm text-gray-500 mb-6">This certificate is awarded to</p>
              <p className="text-4xl font-extrabold text-blue-600 mb-8">{userName}</p>
              <div className="w-full h-px bg-gray-300 mb-8"></div>
              <p className="text-lg font-semibold text-gray-700 mb-2">For successfully completing the assessment:</p>
              <p className="text-2xl font-extrabold text-green-700 mb-6">{certificateToPreview}</p>
              <div className="text-gray-600">
                <p>Date: August 10, 2025</p>
                <p>Administrator: Jane Smith</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificate;

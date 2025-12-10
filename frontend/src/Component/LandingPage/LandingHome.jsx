import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { FaUserGraduate, FaRupeeSign, FaCalendarAlt, FaHandsHelping, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { toast } from "react-toastify";
import FeedbackForm from "../Cards/FeedbackForm";
import { FaXTwitter } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import QRcode from "../../assets/upi-qr.png"
import TopDonors from "../Cards/topDonors";
import { useSelector } from "react-redux";
import BankDetails from "../Cards/BankDetails";
import UpiSection from "../Cards/UpiSection";

const LandingHome = ({ setView }) => {
  const currentUser = useSelector((state) => state.user.currentUser)
  const [feedbacks, setFeedbacks] = useState([]);
  const isAdmin = currentUser?.role === "admin";
  const getAllFeedbacks = async () => {
    try {
      const res = await axios.get("http://localhost:8815/feedback/all");
      if (res.data.success === false) {
        return toast.error(res.data.message);
      }
      setFeedbacks(res.data.feedbacks);
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    }
  }
  const deleteFeedback = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8815/feedback/delete/${id}`, { withCredentials: true });
      if (res.data.success === false) {
        return toast.error(res.data.message);
      }
      toast.success(res.data.message)
      getAllFeedbacks()
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getAllFeedbacks()
  }, [])
  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow space-y-16">
        <section className=" bg-white py-16 px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-red-900 mb-4">
            Empowering Students. One Donation at a Time.
          </h1>
          <p className="text-gray-700 max-w-2xl mx-auto mb-6">
            A student-led nonprofit based at RGUKT Ongole, dedicated to providing financial assistance for health challenges, empowering education, and fostering community support through sustainable initiatives.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={() =>
                isAdmin ? toast.info("Campaign creation is not allowed from the admin panel") :
                  toast.info("Please sign in to create a new campaign")}
              className="bg-red-900 text-white px-6 py-2 rounded hover:bg-red-700"
            >
              Start a Campaign

            </button>
            <button
              onClick={() =>
                isAdmin ? toast.info("You'll find all active campaigns in the Manage Campaigns panel") : setView("campaigns")}
              className="border border-red-900 text-red-900 px-6 py-2 rounded hover:bg-red-100"
            >
              Explore Active Campaigns
            </button>
          </div>
        </section>

        <TopDonors />

        <section className="py-12 px-6 bg-white text-center">
          <h2 className="text-2xl font-bold text-red-900 mb-8">Support Us Directly</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            {/* Bank Details */}
            <BankDetails isAdmin={isAdmin} />

            {/* UPI & QR Codes */}
            <UpiSection isAdmin={isAdmin} />
          </div>
        </section>



        <section className="py-12 px-6 bg-white text-center">
          <h2 className="text-2xl font-bold text-red-900 mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: "Start a Campaign", icon: "📢" },
              { title: "Share Your Story", icon: "📖" },
              { title: "Receive Donations", icon: "💰" },
              { title: "Achieve Your Goals", icon: "🎓" },
            ].map((step, i) => (
              <div key={i} className="bg-red-100 p-6 rounded shadow hover:shadow-lg transition">
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-lg font-semibold text-red-900">{step.title}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12 px-6 bg-gray-50 text-center">
          <h2 className="text-2xl font-bold text-red-900 mb-8">Why Donate?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Transparent Impact", desc: "Track every rupee and see the difference you make.", icon: "🔍" },
              { title: "Direct Support", desc: "Your donation goes straight to students in need.", icon: "🎯" },
              { title: "Community Growth", desc: "Help build a stronger, more educated future.", icon: "🌱" },
            ].map((item, i) => (
              <div key={i} className="bg-red-100 p-6 rounded shadow hover:shadow-md transition">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-red-900">{item.title}</h3>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>


        {/* Impact Stats */}
        <section className="bg-white py-12 px-6 text-center">
          <h2 className="text-2xl font-bold text-red-900 mb-8">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-red-100 p-6 rounded shadow hover:shadow-md transition">
              <FaUserGraduate className="text-4xl text-red-900 mx-auto mb-2" />
              <div className="text-3xl font-bold text-red-900">500+</div>
              <p className="text-gray-700 font-medium">Students Helped</p>
            </div>
            <div className="bg-red-100 p-6 rounded shadow hover:shadow-md transition">
              <FaRupeeSign className="text-4xl text-red-900 mx-auto mb-2" />
              <div className="text-3xl font-bold text-red-900">₹10L+</div>
              <p className="text-gray-700 font-medium">Funds Raised</p>
            </div>
            <div className="bg-red-100 p-6 rounded shadow hover:shadow-md transition">
              <FaCalendarAlt className="text-4xl text-red-900 mx-auto mb-2" />
              <div className="text-3xl font-bold text-red-900">5+</div>
              <p className="text-gray-700 font-medium">Years of Service</p>
            </div>
            <div className="bg-red-100 p-6 rounded shadow hover:shadow-md transition">
              <FaHandsHelping className="text-4xl text-red-900 mx-auto mb-2" />
              <div className="text-3xl font-bold text-red-900">50+</div>
              <p className="text-gray-700 font-medium">Events Organized</p>
            </div>
          </div>
        </section>


        {/* Testimonials */}
        <section className="py-12 px-6 bg-white text-center">
          <h2 className="text-2xl font-bold text-red-900 mb-8">What People Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Live Feedbacks - Auto-scroll */}
            <div className="md:col-span-2 overflow-y-auto max-h-96 pr-4">
              <div className="space-y-4 animate-scroll">
                {feedbacks.map((feedback, index) => (
                  <div key={index} className="bg-red-100 p-6 rounded shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="italic text-gray-700 mb-4">“{feedback.description}”</p>
                        <p className="font-semibold text-red-900">{feedback.reviewer}</p>
                      </div>
                      {isAdmin && (
                        <button className="bg-white rounded-full shadow ml-4 p-2">
                          <MdDelete
                            className="text-red-900 cursor-pointer"
                            onClick={() => {
                              deleteFeedback(feedback._id);
                            }}
                          />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feedback Form */}
            <FeedbackForm refreshFeedbacks={getAllFeedbacks} />
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-red-900 text-white py-16 px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="mb-6">Whether you're here to give or receive, Helping Hands is here for you.</p>
          <button
            onClick={() => setView("campaigns")}
            className="bg-white text-red-900 px-6 py-2 rounded font-semibold hover:bg-red-100"
          >
            Get Started
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-red-900 text-white text-center py-8 text-sm">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6 text-left">
          {/* Address */}
          <div>
            <h4 className=" font-semibold mb-2">Address</h4>
            <p>
              Santhanutalapadu, 523225<br />
              Andhra Pradesh, India
            </p>
          </div>

          {/* Phone */}
          <div>
            <h4 className=" font-semibold mb-2">Phone</h4>
            <p>+91 79819 37656</p>
          </div>

          {/* Email */}
          <div>
            <h4 className=" font-semibold mb-2">Email</h4>
            <p>
              <a href="mailto:hho@rguktong.ac.in" className="hover:underline">
                hho@rguktong.ac.in
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="mt-6 space-x-4">
          <button onClick={() => setView("about")} className="hover:underline">About</button>
          <button onClick={() => setView("campaigns")} className="hover:underline">Campaigns</button>
          <button onClick={() => setView("signin")} className="hover:underline">Login</button>
        </div>

        <div className="mt-4 flex justify-center space-x-6 text-lg">
          <a href="https://facebook.com/iiit.ongole.hho" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-white hover:text-blue-600 transform transition-transform duration-200 hover:scale-125" />
          </a>
          <a href="https://x.com/hhoiiitong" target="_blank" rel="noopener noreferrer" >
            <FaXTwitter className="text-white hover:text-black transform transition-transform duration-200 hover:scale-125" />
          </a>
          <a href="https://instagram.com/helping_hands_rgukt.ongole" target="_blank" rel="noopener noreferrer" >
            <FaInstagram className="text-white hover:text-pink-600 transform transition-transform duration-200 hover:scale-125" />
          </a>
          <a href="https://linkedin.com/in/helping-hands-organization-rgukt-ongole-02826b178" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-white hover:text-blue-900 transform transition-transform duration-200 hover:scale-125" />
          </a>
        </div>


        {/* Copyright */}
        <p className="mt-4">&copy; {new Date().getFullYear()} Helping Hands Organization. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingHome;
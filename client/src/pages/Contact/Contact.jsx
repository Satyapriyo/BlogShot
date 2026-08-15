import React, { useState } from "react";
import Footer from "../../components/Footer/Footer";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const message = formData.get("message")?.toString().trim();

    if (!name || !email || !message) {
      setFormError("Please fill in your name, email, and message.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      e.currentTarget.reset();
      setTimeout(() => setSubmitted(false), 5000);
    }, 800);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div>
      <Helmet>
        <title>Contact BlogShot – Get in touch</title>
        <meta
          name="description"
          content="Have questions or feedback about BlogShot? Reach out to our team using the contact form."
        />
        <meta property="og:title" content="Contact BlogShot – Get in touch" />
        <meta
          property="og:description"
          content="Start a conversation with the BlogShot team and let us know how we can help."
        />
      </Helmet>

      <div className="bg-gradient-to-b from-white via-blue-50 to-white min-h-screen py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Get in Touch
            </h1>
            <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto">
              Have a question or feedback? We'd love to hear from you. Send us a
              message and we'll respond as soon as possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Information */}
            <motion.div className="space-y-8" variants={itemVariants}>
              {/* Info Card */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  Contact Information
                </h2>

                {/* Location */}
                <motion.div className="flex gap-4 mb-8" whileHover={{ x: 5 }}>
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-blue-100">
                      <MapPinIcon className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Office Location
                    </h3>
                    <p className="text-gray-600">
                      BlogShot HQ
                      <br />
                      Tech Street, Innovation District
                      <br />
                      San Francisco, CA 94105
                    </p>
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div className="flex gap-4 mb-8" whileHover={{ x: 5 }}>
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-purple-100">
                      <PhoneIcon className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Phone
                    </h3>
                    <a
                      href="tel:+14155552670"
                      className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      +1 (415) 555-2670
                    </a>
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div className="flex gap-4" whileHover={{ x: 5 }}>
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-pink-100">
                      <EnvelopeIcon className="h-6 w-6 text-pink-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Email
                    </h3>
                    <a
                      href="mailto:support@blogshot.com"
                      className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      support@blogshot.com
                    </a>
                  </div>
                </motion.div>
              </div>

              {/* Response Time Card */}
              <motion.div
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200"
                variants={itemVariants}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  📍 Response Time
                </h3>
                <p className="text-gray-700">
                  We typically respond to all inquiries within 24 hours during
                  business days. For urgent matters, please use the phone number
                  above.
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
              variants={itemVariants}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-900 placeholder-gray-500"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-900 placeholder-gray-500"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    placeholder="Tell us about your experience or question..."
                    rows="5"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-900 placeholder-gray-500 resize-none"
                  />
                </div>

                {/* Error Message */}
                {formError && (
                  <motion.div
                    className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <ExclamationCircleIcon className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{formError}</p>
                  </motion.div>
                )}

                {/* Success Message */}
                {submitted && !formError && (
                  <motion.div
                    className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <CheckCircleIcon className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-green-700 font-medium">
                      ✓ Thanks for reaching out! We'll get back to you soon.
                    </p>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold"
                  style={{
                    background:
                      "linear-gradient(to right, rgb(37, 99, 235), rgb(168, 85, 247))",
                  }}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </motion.button>

                <p className="text-xs text-gray-500 text-center">
                  We respect your privacy. We'll never share your information.
                </p>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;

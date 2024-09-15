import ars from "../assets/Abdullah.png";
const AboutUs = () => {
  return (
    <div className="p-8 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen relative overflow-hidden">
      {/* Decorative Background Animation */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 opacity-50 animate-pulse"></div>

      <section className="mb-12 text-center relative z-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 transform transition-transform duration-500 hover:scale-105">
          Welcome to FitGearHub
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          your go-to destination for top-quality fitness equipment and
          accessories. Founded in 2020, we are dedicated to helping you achieve
          your fitness goals with our range of premium products. Our mission is
          to provide innovative solutions that enhance your workout experience
          and promote a healthier lifestyle. Our vision is to be the leading
          provider of fitness solutions, making high-quality equipment
          accessible to everyone.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center relative z-10">
          Meet Our Team
        </h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex items-center bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-500 hover:shadow-2xl hover:scale-105 relative z-10">
            <img
              src={ars}
              alt="Team Member 1"
              className="w-24 h-24 rounded-full mr-4 transform transition-transform duration-300 hover:rotate-6"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                ARS ABDULLAH
              </h3>
              <p className="text-gray-600">CEO & Founder</p>
              <p className="text-gray-700 mt-2">
                ARS is the visionary behind our company, bringing over 4 years
                of experience in the fitness industry.
              </p>
            </div>
          </div>
          <div className="flex items-center bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-500 hover:shadow-2xl hover:scale-105 relative z-10">
            <img
              src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Team Member 2"
              className="w-24 h-24 rounded-full mr-4 transform transition-transform duration-300 hover:rotate-6"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Jane Smith
              </h3>
              <p className="text-gray-600">Head of Product Development</p>
              <p className="text-gray-700 mt-2">
                Jane leads our product development team, ensuring that our
                products meet the highest standards of quality and innovation.
              </p>
            </div>
          </div>
          {/* Add more team members as needed */}
        </div>
      </section>

      <section className="mb-12 relative z-10">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          What Our Customers Say
        </h2>
        <div className="space-y-6">
          <blockquote className="bg-gray-100 border-l-4 border-blue-500 p-6 rounded-lg italic text-gray-700 shadow-md transform transition-transform duration-500 hover:shadow-xl hover:-translate-y-1">
            <p>
              "I've never been more satisfied with a fitness product. The
              quality and durability of the equipment are unmatched!"
            </p>
            <footer className="mt-2">- Alex Johnson</footer>
          </blockquote>
          <blockquote className="bg-gray-100 border-l-4 border-blue-500 p-6 rounded-lg italic text-gray-700 shadow-md transform transition-transform duration-500 hover:shadow-xl hover:-translate-y-1">
            <p>
              "Exceptional service and support. I highly recommend FitGearHub
              for anyone looking to enhance their workout experience."
            </p>
            <footer className="mt-2">- Sarah Lee</footer>
          </blockquote>
          {/* Add more testimonials as needed */}
        </div>
      </section>

      <section className="relative z-10">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Contact Us
        </h2>
        <p className="text-lg text-gray-700 mb-4 text-center">
          If you have any questions or feedback, we would love to hear from you.
          Reach out to us through the following channels:
        </p>
        <ul className="list-disc list-inside text-lg text-gray-700 max-w-md mx-auto">
          <li>
            Email:{" "}
            <a
              href="https://mail.google.com/mail/u/0"
              className="text-blue-500 hover:underline"
            >
              mdabdullah161036@gmail.com
            </a>
          </li>
          <li>
            Phone:{" "}
            <a
              href="tel:881735753341"
              className="text-blue-500 hover:underline"
            >
              +8801735752241
            </a>
          </li>
          <li>Address: 123 Fitness St, Gym City, FIT 45678</li>
        </ul>
      </section>
    </div>
  );
};

export default AboutUs;

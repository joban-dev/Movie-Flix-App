import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import backgroundimg from '/backgroundimage.jpg'; // Make sure to import the background image

function About() {
  document.title = "MovieFlix | About Us";

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  const cardVariants = {
    hover: { scale: 1.02, boxShadow: "0px 10px 20px rgba(101, 86, 205, 0.3)" },
    initial: { scale: 1, boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)" },
  };

  // Animation for the paragraph box
  const paragraphBoxVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.4 } },
  };

  return (
    <div className=" w-full h-screen flex bg-black">
      {/* Side Navigation */}
      <div className="w-[20%] h-full border-r-2 border-zinc-700 p-10">
        <h1 className="text-2xl text-white font-bold">
          <i className="text-[#b138e9] ri-tv-fill mr-2"></i>
          <span className="text-2xl">Movie App</span>
        </h1>

        <nav className="flex flex-col text-zinc-400 gap-3">
          <h1 className="text-white font-semibold text-xl mt-10 mb-5">New Feeds</h1>
          {["Trending", "Popular", "Movies", "Tv Shows", "People"].map((item, index) => (
            <Link key={index} to={`/${item.toLowerCase()}`} className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3 pl-5">
              <i className={`text-${index === 0 ? 'orange' : index === 1 ? 'red' : index === 2 ? 'sky' : index === 3 ? 'green' : 'blue'}-400 mr-2 ri-${index === 0 ? 'fire' : index === 1 ? 'bard' : index === 2 ? 'movie' : index === 3 ? 'tv-2' : 'team'}-fill`}></i>
              {item}
            </Link>
          ))}
        </nav>

        <hr className="border-none h-[1px] bg-zinc-700 mt-3" />

        <nav className="flex flex-col text-zinc-400 gap-3">
          <h1 className="text-white font-semibold text-xl mt-7 mb-2">New Feeds</h1>
          {["About", "Contact"].map((item, index) => (
            <Link key={index} to={`/${item.toLowerCase()}`} className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3 pl-5">
              <i className={`text-${index === 0 ? 'orange' : 'red'}-400 mr-2 ri-${index === 0 ? 'information' : 'contacts'}-fill`}></i>
              {item} Us
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <motion.div
        className="w-[80%] h-full overflow-auto overflow-x-hidden p-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          backgroundImage: `url(${backgroundimg})`, // Add the background image here
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <motion.h1 className="text-4xl font-bold text-white mb-10" variants={itemVariants}>About Us</motion.h1>

        {/* Paragraph Box with Animation */}
        <motion.div
          className="bg-[rgba(42,41,50,0.5)] p-8 rounded-lg border-2 border-zinc-700 hover:border-[#6556CD] transition-all duration-300 mb-10 backdrop-blur-sm"
          variants={paragraphBoxVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-zinc-400 text-lg leading-relaxed">
            <p className="mb-5">Welcome to <span className="text-[#aa00ff] font-semibold">MovieApp</span>, your ultimate destination for discovering and exploring the world of movies and TV shows.</p>
            <p className="mb-5">Whether you're looking for trending movies, popular TV shows, or detailed information about your favorite actors, MovieApp has got you covered.</p>
            <p className="mb-5">Our team is passionate about movies and TV shows, and we are dedicated to bringing you the most up-to-date and accurate information.</p>
            <p className="mb-5">Thank you for choosing MovieApp. We hope you enjoy your time here and discover something new and exciting every day!</p>
          </div>
        </motion.div>

        <motion.h2 className="text-2xl font-bold text-white mt-10 mb-5" variants={itemVariants}>Our Team</motion.h2>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" variants={itemVariants}>
          {[{ name: "Jobanjeet singh", role: "Founder & CEO" }, { name: "Jane Smith", role: "Lead Developer" }, { name: "Emily Johnson", role: "UI/UX Designer" }].map((member, index) => (
            <motion.div key={index} className="bg-[rgba(42,41,50,0.5)] p-5 rounded-lg border-2 border-zinc-700 hover:border-[#6556CD] transition-all duration-300 backdrop-blur-sm" variants={cardVariants} initial="initial" whileHover="hover">
              <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
              <p className="text-zinc-400">{member.role}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action Section */}
        <motion.div className="mt-10 p-10 bg-[rgba(42,41,50,0.5)] rounded-lg border-2 border-zinc-700 hover:border-[#6556CD] transition-all duration-300 backdrop-blur-sm" variants={itemVariants}>
          <h2 className="text-2xl font-bold text-white mb-5">Join Our Community</h2>
          <p className="text-zinc-400 mb-5">Be part of our growing community of movie enthusiasts. Follow us on social media and stay updated with the latest news and updates.</p>
          <div className="flex gap-5">
            <button className="bg-[#6556CD] text-white px-6 py-2 rounded-lg hover:bg-[#7c6cd6] transition-all duration-300">Follow Us</button>
            <button className="bg-transparent border-2 border-[#6556CD] text-[#6556CD] px-6 py-2 rounded-lg hover:bg-[#6556CD] hover:text-white transition-all duration-300">Contact Us</button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default About;
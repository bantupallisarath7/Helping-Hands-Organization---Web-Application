const About = () => {
  return (
    <section className="bg-white py-16 px-6 text-center">
      <h2 className="text-3xl font-bold text-red-900 mb-6">About Us</h2>
      <div className="max-w-4xl mx-auto text-gray-700 space-y-6 text-left">
        <p>
          <strong>Helping Hands Organization (HHO)</strong> is a student-led nonprofit initiative based at <strong>RGUKT Ongole</strong>, committed to supporting students facing financial hardship due to health emergencies, educational needs, or personal crises.
        </p>

        <p>
          Founded on the principles of empathy, transparency, and community-driven action, HHO empowers students to launch verified fundraising campaigns. Funds are raised through strategically placed donation boxes across campus and online contributions, with every rupee accounted for and publicly documented.
        </p>

        <p>
          Our mission is to create a sustainable support system where students help fellow students whether it's through financial aid, mentorship, or organizing awareness events. We believe that small acts of kindness can create a ripple effect of impact.
        </p>

        <p>
          From medical emergencies to academic support, HHO has helped hundreds of students overcome challenges and continue their educational journey with dignity and hope.
        </p>
      </div>

      <div className="mt-12 max-w-3xl mx-auto text-left">
        <h3 className="text-2xl font-bold text-red-900 mb-4 text-center">Get in Touch</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700">
          <div>
            <h4 className="text-red-900 font-semibold mb-2">Address</h4>
            <p>
              Santhanutalapadu, 523225<br />
              Andhra Pradesh, India
            </p>
          </div>
          <div>
            <h4 className="text-red-900 font-semibold mb-2">Phone</h4>
            <p>+91 79819 37656</p>
          </div>
          <div>
            <h4 className="text-red-900 font-semibold mb-2">Email</h4>
            <p>
              <a href="mailto:hho@rguktong.ac.in" className="hover:text-red-900 hover:underline">
                hho@rguktong.ac.in
              </a>
            </p>
          </div>
        </div>
      </div>

    </section>
  );
};

export default About;
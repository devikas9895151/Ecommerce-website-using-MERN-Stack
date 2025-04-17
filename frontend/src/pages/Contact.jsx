import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div>
      {/* Section Title */}
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={' US'} />
      </div>

      {/* Contact Info and Image */}
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="Contact" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>54709 Ettimadai <br /> Suite 350, Tamil Nadu</p>
          <p className='text-gray-500'>Tel: 8282 234 556 <br /> Email: admin@Fabrica.com</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Fabrica</p>
          <p className='text-gray-500'>We’re hiring! <a href='/careers' className='text-blue-600 underline'>Explore Jobs</a></p>
        </div>
      </div>

      {/* Embedded Google Map */}
      <div className="mb-20 text-center px-4">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Find Us Here</h3>
        <iframe
          className="w-full h-64 rounded-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.024087473953!2d76.90072607414688!3d10.9068022579564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859afdc4dd4d7%3A0xd3a90b320d8d02a!2sEttimadai%2C%20Tamil%20Nadu%20641105!5e0!3m2!1sen!2sin!4v1712217896543!5m2!1sen!2sin" 
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;

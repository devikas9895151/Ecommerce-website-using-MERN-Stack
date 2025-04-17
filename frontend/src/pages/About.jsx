import React, { useEffect, useState } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';

const StatCounter = () => {
  const [users, setUsers] = useState(0);
  const [producers, setProducers] = useState(0);
  const [orders, setOrders] = useState(0);

  useEffect(() => {
    const animateValue = (setter, min, max, speed) => {
      let count = min;
      const step = Math.floor((max - min) / 40);
      const interval = setInterval(() => {
        count += step;
        if (count >= max) {
          count = max;
          clearInterval(interval);
        }
        setter(count);
      }, speed);
    };

    animateValue(setUsers, 80000, 100000, 40);
    animateValue(setProducers, 200, 500, 60);
    animateValue(setOrders, 5000, 25000, 30);
  }, []);

  return (
    <div className="my-16">
      <div className="text-2xl text-center font-bold text-gray-800">OUR IMPACT</div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center text-gray-800 mt-10">
        <div className="p-6 border rounded-xl shadow hover:shadow-md transition duration-700 ease-in-out">
          <p className="text-3xl font-bold text-purple-700">{users.toLocaleString()}+</p>
          <p className="mt-2 text-lg">Happy Users</p>
        </div>
        <div className="p-6 border rounded-xl shadow hover:shadow-md transition duration-700 ease-in-out">
          <p className="text-3xl font-bold text-purple-700">{producers.toLocaleString()}+</p>
          <p className="mt-2 text-lg">Trusted Producers</p>
        </div>
        <div className="p-6 border rounded-xl shadow hover:shadow-md transition duration-700 ease-in-out">
          <p className="text-3xl font-bold text-purple-700">{orders.toLocaleString()}+</p>
          <p className="mt-2 text-lg">Orders Delivered</p>
        </div>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <div>
      {/* ABOUT US SECTION */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={' US'} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt="about"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Fabrica was born out of a passion for innovation and a desire to revolutionize how people shop online.
          </p>
          <p>
            Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission at Fabrica is to empower customers with choice, convenience, and confidence.
          </p>
        </div>
      </div>

      {/* STAT COUNTER SECTION */}
      <StatCounter />

      {/* WHY CHOOSE US SECTION */}
      <div className="text-xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Support:</b>
          <p>We pride ourselves on offering top-notch support every step of the way.</p>
        </div>
      </div>
    </div>
  );
};

export default About;


import {
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  CreditCard,
  DollarSign,
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10">
      <div className="container mx-auto px-4 md:flex md:justify-between md:items-start">
        {/* Brand Section */}
        <div className="mb-8 md:mb-0">
          <h2 className="text-2xl font-bold text-blue-600">FitLife</h2>
          <p className="mt-2 text-gray-600">
            Your ultimate platform to track calories, book doctor appointments, and stay fit.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#" aria-label="Facebook">
              <Facebook className="w-6 h-6 text-blue-600 hover:text-blue-800" />
            </a>
            <a href="#" aria-label="Twitter">
              <Twitter className="w-6 h-6 text-blue-400 hover:text-blue-600" />
            </a>
            <a href="#" aria-label="Youtube">
              <Youtube className="w-6 h-6 text-red-600 hover:text-red-800" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <Linkedin className="w-6 h-6 text-blue-500 hover:text-blue-700" />
            </a>
          </div>
        </div>

        {/* Links Section */}
        <div className="mb-8 md:mb-0">
          <h3 className="text-lg font-semibold text-gray-800">Useful Links</h3>
          <ul className="mt-4 space-y-2">
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Track Calories</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Book Doctors</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Fitness Tips</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Community Forum</a></li>
          </ul>
        </div>

        {/* Subscribe Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Subscribe to Our Newsletter</h3>
          <p className="mt-2 text-gray-600">
            Get the latest fitness tips and updates right in your inbox.
          </p>
          <div className="mt-4 flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Payment Methods Section */}
      <div className="mt-10 border-t border-gray-300 pt-6">
        <div className="container mx-auto px-4 md:flex md:justify-between md:items-center">
          <p className="text-gray-600">&copy; 2025 FitLife. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <CreditCard className="w-6 h-6 text-gray-600" aria-label="Visa" />
            <DollarSign className="w-6 h-6 text-gray-600" aria-label="Razorpay" />
            <img
              src="/paypal-icon.svg"
              alt="PayPal"
              className="w-6 h-6 object-contain"
            />
            <img
              src="/stripe-icon.svg"
              alt="Stripe"
              className="w-6 h-6 object-contain"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

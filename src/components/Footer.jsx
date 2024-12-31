// src/components/Footer.js

const Footer = () => {
  return (
    <footer className="shadow-inner bg-blue-400 text-white py-4 ">
      <div className="max-w-7xl mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} My Website. All Rights Reserved.
        </p>
        <p className="text-sm">Created with ❤️ by Quill</p>
      </div>
    </footer>
  );
};

export default Footer;

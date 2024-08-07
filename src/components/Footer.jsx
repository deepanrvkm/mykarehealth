import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-700 pt-8 pb-16 px-4">
      <div className="container mx-auto">
        <p className="text-gray-100 font-thin text-sm">
          &copy; {currentYear} mykarehealth.com. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
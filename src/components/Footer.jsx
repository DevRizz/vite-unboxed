import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <footer>
        <div>&copy; {currentYear}. All Right's Reserved.</div>
    </footer>
  )
}

export default Footer
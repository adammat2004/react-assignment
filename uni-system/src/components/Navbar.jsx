import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-row gap-8 p-6 text-2xl font-semibold'>
        <div><Link to={'/'}>Home</Link></div>
        <div><Link to={'/degrees'}>Degree</Link></div>
        <div><Link to={'/cohorts'}>Cohort</Link></div>
        <div><Link to={'/modules'}>Modules</Link></div>
        <div><Link to={'/students'}>Students</Link></div>
        <div><Link to={'/create-grade'}>Grades</Link></div>
    </div>
  )
}

export default Navbar
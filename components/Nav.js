import React, {useContext} from "react"
import Link from "next/link"
import { AuthContext } from '../appState/AuthProvider'

const navStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80px',
    background: 'blue'
}
const ulStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '70%'
}
const liStyle = {
    listStyle: "none"
}
const aStyle = {
    color: 'white',
    fontSize: '23px',
    fontWeight: 'bold',
    textDecoration: 'none',
    fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif",
}
const Nav = () => {
  const { user } = useContext(AuthContext)
  console.log(user);
  
  return(
  <nav style={navStyle}>
    <ul style={ulStyle}>
      <li style={liStyle}>
        <Link href="/">
          <a style={aStyle}>Home</a>
        </Link>
      </li>
      <li style={liStyle}>
        <Link href="/products">
          <a style={aStyle}>Products</a>
        </Link>
      </li>
      {user && 
        <>
          <li style={liStyle}>
            <Link href="/cart">
              <a style={aStyle}>Cart</a>
            </Link>
          </li>
          <button>Sign Out</button>
        </>}
        {!user && 
        <>
          <li style={liStyle}>
            <Link href="/signin">
              <a style={aStyle}>Sign In</a>
            </Link>
          </li>
          <li style={liStyle}>
            <Link href="/signup">
              <a style={aStyle}>Sign Up</a>
            </Link>
          </li>
        </>}
    </ul>
  </nav>
)}

export default Nav
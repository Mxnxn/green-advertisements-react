import React, { useState } from 'react';

const Navbar = (props) => {

    const [openMenu, setOpenMenu] = useState(false);

    return ( <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <a class="navbar-brand" href="/">GREEN ADVERTISERS</a>
    <button class="navbar-toggler" onClick={()=>setOpenMenu(!openMenu)} type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class={openMenu ? "collapse navbar-collapse show ":"collapse navbar-collapse"} id="navbarColor01">
        <ul class="navbar-nav mr-auto">
        {/* <li class="nav-item">
            <a class="nav-link" href="#">Login
            </a>
        </li> */}
        <li class="nav-item active">
            <a class="nav-link" href="#">Clients
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Hoarding</a>
        </li>
        </ul>
        
    </div>
</nav> );
}
 
export default Navbar;
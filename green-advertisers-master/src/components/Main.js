import React from 'react';
import Navbar from './Navbar';
import {Edit, Plus, Trash} from "react-feather";

const Main = (props) => {
    return ( 
        <>
            <Navbar/>
            <div className="jumbotron">
            <div className="row px-3 d-flex">
                        <div class="form-group ml-auto">
                    <label for="exampleInputEmail1 ">Search</label>
                    <input type="email" class="form-control border border-primary" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Phone/Name"/>
                </div>
                </div>
                <div className="row px-3 d-flex">
                    <h1>Clients</h1>
                    <button className="btn btn-outline-primary ml-auto mb-2"><Plus size="12"/> Add</button>
                </div>
                <div className="row overflow-auto px-3">
                <table className="table table-hover border">
                    <thead>
                        <th scope="col">Sr.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Email</th>
                        <th scope="col">Hoarding</th>
                        <th scope="col">Action</th>

                    </thead>
                    <tbody>
                    <tr class="table-light">
                        <th scope="row">1</th>
                        <td>Vandit Soni</td>
                        <td>9825505771</td>
                        <td>manangraphics@hotmail.com</td>
                        <td>4</td>
                        <td><button className="btn btn-sm btn-warning" style={{borderRadius:10}}><Edit size="12"/></button>
                        <button className="btn btn-sm btn-danger ml-2" style={{borderRadius:10}}><Trash size="12"/></button></td>
                        </tr>
                        <tr class="table-light">
                        <th scope="row">1</th>
                        <td>Vandit Soni</td>
                        <td>9825505771</td>
                        <td>manangraphics@hotmail.com</td>
                        <td>4</td>
                        <td><button className="btn btn-sm btn-warning" style={{borderRadius:10}}><Edit size="12"/></button>
                        <button className="btn btn-sm btn-danger ml-2" style={{borderRadius:10}}><Trash size="12"/></button></td>
                        </tr><tr class="table-light">
                        <th scope="row">1</th>
                        <td>Vandit Soni</td>
                        <td>9825505771</td>
                        <td>manangraphics@hotmail.com</td>
                        <td>4</td>
                        <td><button className="btn btn-sm btn-warning" style={{borderRadius:10}}><Edit size="12"/></button>
                        <button className="btn btn-sm btn-danger ml-2" style={{borderRadius:10}}><Trash size="12"/></button></td>
                        </tr><tr class="table-light">
                        <th scope="row">1</th>
                        <td>Vandit Soni</td>
                        <td>9825505771</td>
                        <td>manangraphics@hotmail.com</td>
                        <td>4</td>
                        <td><button className="btn btn-sm btn-warning" style={{borderRadius:10}}><Edit size="12"/></button>
                        <button className="btn btn-sm btn-danger ml-2" style={{borderRadius:10}}><Trash size="12"/></button></td>
                        </tr><tr class="table-light">
                        <th scope="row">1</th>
                        <td>Vandit Soni</td>
                        <td>9825505771</td>
                        <td>manangraphics@hotmail.com</td>
                        <td>4</td>
                        <td><button className="btn btn-sm btn-warning" style={{borderRadius:10}}><Edit size="12"/></button>
                        <button className="btn btn-sm btn-danger ml-2" style={{borderRadius:10}}><Trash size="12"/></button></td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
        </>
      );
}
 
export default Main;
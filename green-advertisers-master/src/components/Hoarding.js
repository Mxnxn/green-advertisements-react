import React from 'react';  
import {Edit, Plus, Trash} from "react-feather";

const Hoarding = (props) => {
    return ( 
        <div className="jumbotron">
                <div className="row px-3 d-flex">
                        <div class="form-group ml-auto">
                    <label for="exampleInputEmail1 ">Search</label>
                    <input type="email" class="form-control border border-primary" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Location"/>
                </div>
                </div>
                <div className="row px-3 d-flex">
                    <h1>Hoardings</h1>
                    <button className="btn btn-outline-primary ml-auto mb-2"><Plus size="12"/> Add</button>
                </div>
                <div className="row overflow-auto px-3">
                <table className="table table-hover border ">
                    <thead>
                        <tr>
                        <th scope="col">Sr.</th>
                        <th scope="col">Size</th>
                        <th scope="col">Location</th>
                        <th scope="col">Assigned</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="table-light">
                            <td>1.</td>
                            <td>30'x30'</td>
                            <td>Nawab Crossing, Bodeli</td>
                            <td>to Vandit Soni</td>
                            <td><button className="btn btn-sm btn-warning" style={{borderRadius:10}}><Edit size="12"/></button>
                        <button className="btn btn-sm btn-danger ml-2" style={{borderRadius:10}}><Trash size="12"/></button></td>
                        </tr>
                        <tr class="table-light">
                            <td>2.</td>
                            <td>10'x40'</td>
                            <td>Alkapuri</td>
                            <td>to Vandit Soni</td>
                            <td><button className="btn btn-sm btn-warning" style={{borderRadius:10}}><Edit size="12"/></button>
                        <button className="btn btn-sm btn-danger ml-2" style={{borderRadius:10}}><Trash size="12"/></button></td>
                        </tr> <tr class="table-light">
                            <td>3.</td>
                            <td>30'x30'</td>
                            <td>Karnjan</td>
                            <td>to Vandit Soni</td>
                            <td><button className="btn btn-sm btn-warning" style={{borderRadius:10}}><Edit size="12"/></button>
                        <button className="btn btn-sm btn-danger ml-2" style={{borderRadius:10}}><Trash size="12"/></button></td>
                        </tr>
                        <tr class="table-light">
                            <td>4.</td>
                            <td>30'x30'</td>
                            <td>Vasna</td>
                            <td>to Vandit Soni</td>
                            <td><button className="btn btn-sm btn-warning" style={{borderRadius:10}}><Edit size="12"/></button>
                        <button className="btn btn-sm btn-danger ml-2" style={{borderRadius:10}}><Trash size="12"/></button></td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
     );
}
 
export default Hoarding;
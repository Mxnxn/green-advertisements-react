import React from 'react';

const Login = (props) => {
    return ( <div className="bs-docs-section ">
                <div className="col-lg-4 jumbotron mx-auto mt-4 h-100 shadow" >
                    <h1 class="">Login</h1>
                    <div class="form-group mt-4">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control border" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control border" id="exampleInputPassword1" placeholder="Password"/>
                        <small id="emailHelp" class="form-text text-muted">We respect your privacy.</small>
                    </div>
                    <div className="lead">
                        <button className="btn btn-primary">Login</button>
                    </div>
                </div>
            </div> 
        );
}
 
export default Login;
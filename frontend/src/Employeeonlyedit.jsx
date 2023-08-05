import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

function backpage(){
	Navigate('/employeedetail/'+id);
}

function Employeeonlyedit() {

	const [data, setData] = useState({
		name: '',
		email: '',
		address: '',
		salary: '',
	})
	const navigate = useNavigate()

	const { id } = useParams();

	useEffect(() => {
		axios.get('http://localhost:8081/get/' + id)
			.then(res => {
				setData({
					...data, name: res.data.Result[0].name,
					email: res.data.Result[0].email,
					address: res.data.Result[0].address,
					salary: res.data.Result[0].salary
				})
			})
			.catch(err => console.log(err));
	}, [])

	const handleSubmit = (event) => {
		event.preventDefault();
		axios.put('http://localhost:8081/update/' + id, data)
			.then(res => {
				if (res.data.Status === "Success") {
					alert('✅ Your Detail Updated Successfullly');
				}
			})
			.catch(err => console.log(err));
	}
	return (
		<div className='d-flex flex-column align-items-center pt-4'>
			<h2>Update Employee</h2>
			<form class="row g-3 w-50" onSubmit={handleSubmit}>
				<div class="col-12">
					<label for="inputName" class="form-label">Name</label>
					<input type="text" class="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
						onChange={e => setData({ ...data, name: e.target.value })} value={data.name} />
				</div>
				<div class="col-12">
					<label for="inputEmail4" class="form-label">Email</label>
					<input type="email" class="form-control" id="inputEmail4" placeholder='Enter Email' autoComplete='off'
						onChange={e => setData({ ...data, email: e.target.value })} value={data.email} />
				</div>
				<div class="col-12">
					<label for="inputAddress" class="form-label">Address</label>
					<input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" autoComplete='off'
						onChange={e => setData({ ...data, address: e.target.value })} value={data.address} />
				</div>
				<div class="col-12">
					<button type="submit" class="btn btn-primary">Update</button>
				</div>
			</form>
			<button type="button" onClick={backpage}  class="btn btn-dark mr-3">Back</button>

		</div>
	)
}


export default Employeeonlyedit
import { FC, useState } from "react";
import { RolesData } from "../utils/model";
import axios from "axios";
import { API_URL } from "../utils/api";

interface IForm {
	roles: RolesData[];
	setView: (x: boolean) => void;
	callback: () => void;
}

interface IFormData {
	name: string;
	email: string;
	selectedRoles: any[];
}

export const Forms: FC<IForm> = ({ roles, setView, callback }) => {
	const [formData, setFormData] = useState<IFormData>({
		name: "",
		email: "",
		selectedRoles: [],
	});
	const [errors, setErrors] = useState<any>({});

	const [submitted, setSubmitted] = useState<boolean>(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.persist();
		const { value, checked } = e.target;
		if (checked) {
			setFormData({
				...formData,
				selectedRoles: [...formData.selectedRoles, value],
			});
		} else {
			const checkIndex = formData.selectedRoles.indexOf(value);
			formData.selectedRoles.splice(checkIndex, 1);
			setFormData({
				...formData,
				selectedRoles: [...formData.selectedRoles],
			});
		}
	};
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			[name]: value,
		});
	};
	const validateForm = () => {
		let isValid = true;
		const newErrors: any = {};
		if (!formData.name) {
			newErrors.name = "Name is required";
			isValid = false;
		}
		if (!formData.email) {
			newErrors.email = "Email is required";
			isValid = false;
		}
		if (formData.selectedRoles.length === 0) {
			newErrors.selectedRoles = "Roles is required";
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();

		if (validateForm()) {
			setSubmitted(true); // Set a submitted flag

			if (submitted) {
				axios
					.post(`${API_URL}/user`, { ...formData })
					.then((res) => {
						callback();
					})
					.catch((errors) => console.log(errors))
					.finally(() => setView(false));
			}
		} else {
			console.log(errors);
		}
	};
	return (
		<div>
			<div className="w-full max-w-md mx-auto">
				<div className="text-xl mb-5">Create user</div>
				<form
					className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
					onSubmit={(e) => handleSubmit(e)}>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Name
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="name"
							type="text"
							name="name"
							placeholder="Name"
							onChange={(e) => handleInputChange(e)}
						/>
						{errors.name && (
							<div className="error text-red-500 text-sm mt-2">
								{errors.name}
							</div>
						)}
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Email
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="email"
							type="email"
							name="email"
							placeholder="Email"
							onChange={(e) => handleInputChange(e)}
						/>
						{errors.email && (
							<div className="error text-red-500 text-sm mt-2">
								{errors.email}
							</div>
						)}
					</div>
					<div className="mb-4">
						{roles.map((item: RolesData, index: number) => {
							return (
								<div className="flex items-center">
									<input
										id="checked-checkbox"
										type="checkbox"
										value={item.id}
										className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
										name="selectedRoles[]"
										onChange={(e) => handleChange(e)}
									/>
									<label className="ms-2 text-sm font-medium text-gray-900 ">
										{item.name}
									</label>
								</div>
							);
						})}
						{errors.selectedRoles && (
							<div className="error text-red-500 text-sm mt-2">
								{errors.selectedRoles}
							</div>
						)}
					</div>
					<div className="flex items-center justify-between">
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="submit">
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

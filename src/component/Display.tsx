import React, { useEffect, useState } from "react";
import { RolesData, UserData } from "../utils/model";
import axios from "axios";
import { API_URL } from "../utils/api";
import { Table } from "./Table";
import { Forms } from "./Forms";

export const Display = () => {
	const [data, setData] = useState<UserData[]>([]);
	const [roles, setRoles] = useState<RolesData[]>([]);
	const [view, setView] = useState<boolean>();

	const handleGetData = () => {
		axios
			.get(`${API_URL}/users`)
			.then((res) => {
				setData(res.data);
			})
			.catch(function (error) {
				console.log(error);
			})
			.finally(function () {
				// always executed
			});
	};

	const handleGetRoles = () => {
		axios
			.get(`${API_URL}/roles`)
			.then((res) => {
				setRoles(res.data);
			})
			.catch(function (error) {
				console.log(error);
			})
			.finally(function () {
				// always executed
			});
	};

	useEffect(() => {
		handleGetData();
		handleGetRoles();
	}, []);
	return (
		<div>
			{view ? (
				<Forms roles={roles} setView={setView} callback={handleGetData} />
			) : (
				<Table item={data} setView={setView} />
			)}
		</div>
	);
};

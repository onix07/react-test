import React, { FC } from "react";
import { UserData, UserRoles } from "../utils/model";

interface ITable {
	item: UserData[];
	setView: (x: boolean) => void;
}
export const Table: FC<ITable> = ({ item, setView }) => {
	return (
		<div className="relative overflow-x-auto">
			<div className="text-xl mb-5">Manage User</div>
			<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="px-6 py-3">
							Name
						</th>
						<th scope="col" className="px-6 py-3">
							Email
						</th>
						<th scope="col" className="px-6 py-3">
							Roles
						</th>
					</tr>
				</thead>
				<tbody>
					{item.map((item: UserData) => {
						return (
							<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
								<td
									scope="row"
									className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
									{item.name}
								</td>
								<td className="px-6 py-4">{item.email}</td>
								<td className="px-6 py-4">
									{item.roles.map((roles: UserRoles) => {
										return <span className="block">{roles.name}</span>;
									})}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<div className="mt-5">
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					type="button"
					onClick={() => setView(true)}>
					Create User
				</button>
			</div>
		</div>
	);
};

export interface UserData {
	id: number;
	name: string;
	email: string;
	created_at?: string;
	updated_at?: string;
	roles: UserRoles[];
}

export interface UserRoles {
	id: number;
	name: string;
	created_at?: string;
	updated_at?: string;
}

export interface RolesData {
	id: number;
	name: string;
	created_at?: string;
	updated_at?: string;
}

import { Meta, Role, User, UserFiltersProps, UserTableProps } from "../../../services/typesHS";
import { tableColumns } from "./usersUtils";
import { useUserService } from "./usersService";
import styles from "./users.module.css";
import React, { useState } from "react";

const roles = ['ADMINISTRADOR', 'CLIENTE', 'VETERINARIO', 'RECEPCIONISTA'];

const statusOptions = [
    { value: 'all', label: 'Todos los estados' },
    { value: 'active', label: 'Activo' },
    { value: 'inactive', label: 'Inactivo' }
];

export const UserFilters = ({
    searchTerm,
    roleFilter,
    statusFilter,
    onSearchChange,
    onRoleFilterChange,
    onStatusFilterChange
}: UserFiltersProps) => (
    <section className={styles.filters}>
        <aside className={styles.searchBar}>
            <i className={`fa-solid fa-magnifying-glass ${styles.searchIcon}`}></i>
            <input
                type="text"
                placeholder="Buscar por nombre o email..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
            />
        </aside>

        <aside className={styles.selectFilters}>
            <select
                value={roleFilter}
                onChange={(e) => onRoleFilterChange(e.target.value)}
                className={styles.filterSelect}
            >
                <option value="ALL">Todos los roles</option>
                {roles.filter(role => role !== 'ALL').map(role => (
                    <option key={role} value={role}>
                        {role.charAt(0) + role.slice(1).toLowerCase()}
                    </option>
                ))}
            </select>

            <select
                value={statusFilter}
                onChange={(e) => onStatusFilterChange(e.target.value)}
                className={styles.filterSelect}
            >
                {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </aside>
    </section>
);

export const UserTable = ({ users, setUsersData }: UserTableProps) => {

    const { confirmDelete, confirmUpdate } = useUserService();
    const changeUserStatus = (user: User) => confirmUpdate(user);

    const [userSelected, setUserSelected] = useState<User>({
        name: "Johan sebastian", lastName: "Ussa rubio", documentType: "CC", documentNumber: "", address: "",
        email: "johanuss0405@correo.com", cellPhone: "", password: "", role: "ADMINISTRADOR"
    });
    const [metaSelected, setMetaSelected] = useState<Meta>({
        creationDate: "2025-06-05T20:35:25.075", ipAddress: "", source: "", lastUpdate: ""
    });
    const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(true);

    const deleteUser = async (user: User) => {
        const idUser = await confirmDelete(user);
        if (idUser) {
            setUsersData(prevUsers => prevUsers?.filter(u => u.data.documentNumber !== idUser));
        }
    };

    const handleEditUser = (user: User, meta: Meta) => {
        setIsModalEditOpen(prev => !prev);
        setUserSelected(user);
        setMetaSelected(meta);
    }

    return (
        <section className={styles.tableContainer}>
            <table className={styles.userTable}>
                <thead>
                    <tr>
                        {tableColumns.map(column => (<th key={column}>{column}</th>))}
                    </tr>
                </thead>
                <tbody>
                    {users?.map(({ data: user, meta }) => (
                        <tr key={`${user.documentType}-${user.documentNumber}`}>
                            <td>
                                <aside className={styles.userInfo}>
                                    <button className={styles.avatar}>
                                        <UserAvatar user={user} />
                                    </button>
                                    <div className={styles.userDetails}>
                                        <span className={styles.userName}>
                                            {user.name.split(' ')[0]} {user.lastName.split(' ')[0]}
                                        </span>
                                        <span className={styles.userDate}>
                                            Registro: {new Date(meta.creationDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                </aside>
                            </td>
                            <td style={{ fontWeight: 600 }}>{user.documentType}.</td>
                            <td>{user.documentNumber}</td>
                            <td>
                                <span className={`${styles.roleBadge} ${styles[user.role.toLowerCase()]}`}>
                                    {user.role.charAt(0) + user.role.slice(1).toLowerCase()}
                                </span>
                            </td>
                            <td>{user.cellPhone}</td>
                            <td>{user.email}</td>
                            <td>
                                <span className={`${styles.status} ${user.active ? styles.active : styles.inactive}`}>
                                    {user.active ? 'Activo' : 'Inactivo'}
                                </span>
                            </td>
                            <td>
                                <aside className={styles.actions}>
                                    <button
                                        className={`${styles.btn} ${styles.edit}`}
                                        onClick={() => handleEditUser(user, meta)}
                                    >
                                        <i className="fa-regular fa-pen-to-square" />
                                    </button>
                                    <button
                                        className={`${styles.btn} ${styles.delete}`}
                                        onClick={() => deleteUser(user)}
                                    >
                                        <i className="fa-regular fa-trash-can" />
                                    </button>
                                    <button
                                        className={`${styles.btn} ${styles.toggleStatus}`}
                                        onClick={() => changeUserStatus(user)}
                                    >
                                        <i className="fa-solid fa-power-off" />
                                    </button>
                                </aside>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isModalEditOpen && <EditUserModal user={userSelected} meta={metaSelected} setCloseModal={setIsModalEditOpen} />}
        </section>
    );
}

export const UserAvatar = ({ user }: { user: User }) => {

    if (user.image) return (<img src={user.image} alt={user.name} />);

    const initials = user.name.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase();
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#A37AFC', '#FFA07A'];
    const color = colors[initials.charCodeAt(0) % colors.length];

    return (
        <div className={`${styles.initialsAvatar}`} style={{ backgroundColor: color }}>
            {initials}
        </div>
    );
}

interface EditUserModalProps {
    user: User;
    meta: Meta;
    setCloseModal: (close: boolean) => void;
}

const EditUserModal = ({ user, meta, setCloseModal }: EditUserModalProps) => {

    const setSelectedRole = (newRole: Role) => {
        if (user) user = { ...user, role: newRole }
    }

    const handleUpdate = (event: React.FormEvent) => {
        event.preventDefault();
        setCloseModal(false)
        console.log(user);
    }

    return (
        <main className={styles.overlay}>
            <section className={styles.modal}>
                <section className={styles.backgroundModalEdit} />
                <section className={styles.imgDataUser}>
                    <UserAvatar user={user} />
                    <section className={styles.sectionMetaUser}>
                        <h2>{user.name} {user.lastName}</h2>
                        <span>{user.email}</span>
                        <aside className={styles.asideMeta}>
                            <p><span className={styles.metaUser}>Fecha registro</span>: {meta.creationDate}</p>
                            <p>
                                <span className={styles.metaUser}>Ult. actualización</span>:
                                {meta.lastUpdate ? meta.lastUpdate : " ---"}
                            </p>
                        </aside>
                    </section>
                </section>
                <form>
                    <button className={styles.closeButton} onClick={() => setCloseModal(false)}>X</button>
                    <InputEdit label="Tipo de Documento" value={user?.documentType} />
                    <InputEdit label="Número de Documento" value={user?.documentNumber} />
                    <InputEdit label="Teléfono" value={user?.cellPhone} />
                    <InputEdit label="Dirección" value={user?.address} />
                    <InputEdit label="Estado" value={user?.active ? "Activo" : "Inactivo"} />
                    <aside className={styles.fieldGroup}>
                        <label>Rol</label>
                        <select
                            required
                            defaultValue={user?.role}
                            onChange={(e) => setSelectedRole(e.target.value as Role)}
                        >
                            <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                            <option value="VETERINARIO">VETERINARIO</option>
                            <option value="RECEPCIONISTA">RECEPCIONISTA</option>
                            <option value="CLIENTE">CLIENTE</option>
                        </select>
                    </aside>
                    <aside className={styles.buttonGroup}>
                        <button className={styles.cancelButton} onClick={() => setCloseModal(false)}>Cancelar</button>
                        <button className={styles.updateButton} onClick={handleUpdate}>Actualizar</button>
                    </aside>
                </form>
            </section>
        </main>
    );
}

interface InputEditProps {
    label: string;
    value: string | undefined;
    isEditable?: boolean;
}

const InputEdit = ({ label, value, isEditable = true }: InputEditProps) => (
    <aside className={styles.fieldGroup}>
        <label>{label}</label>
        <input value={value} disabled={isEditable} />
    </aside>
);
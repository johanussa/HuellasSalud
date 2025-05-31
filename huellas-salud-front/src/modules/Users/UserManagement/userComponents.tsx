import { GetUserData, User, UserFiltersProps } from "../../../services/typesHS";
import styles from "./users.module.css";
import { tableColumns } from "./usersUtils";

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

export const UserTable = ({ users }: { users: GetUserData[] | undefined }) => {

    const toggleUserStatus = (userId: string) => {
        console.log(`Cambiando estado del usuario con documento: ${userId}`);
    };

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
                                    <div className={styles.avatar}>
                                        <UserAvatar user={user} />
                                    </div>
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
                                    <button className={`${styles.btn} ${styles.edit}`}>
                                        <i className="fa-regular fa-pen-to-square"></i>
                                    </button>
                                    <button className={`${styles.btn} ${styles.delete}`}>
                                        <i className="fa-regular fa-trash-can"></i>
                                    </button>
                                    <button
                                        className={`${styles.btn} ${styles.toggleStatus}`}
                                        onClick={() => toggleUserStatus(user.documentNumber)}
                                    >
                                        <i className="fa-solid fa-power-off"></i>
                                    </button>
                                </aside>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

const UserAvatar = ({ user }: { user: User }) => {

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
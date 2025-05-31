import { useEffect, useMemo, useState } from "react"
import { GetUserData } from "../../../services/typesHS";
import { useGetUsers } from "./usersService";
import { UserFilters, UserTable } from "./userComponents";
import styles from "./users.module.css";

const Users = () => {

  const [usersData, setUsersData] = useState<GetUserData[] | undefined>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { handleGetUsers, loading } = useGetUsers();

  useEffect(() => {
    const fetchData = async () => {
      const data = await handleGetUsers();
      setUsersData(data);
      console.log(data);
    };

    fetchData();
  }, []);

  const filteredUsers = useMemo(() => {
    return usersData?.filter(({ data: user }) => {

      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase())
        || user.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole = roleFilter === 'ALL' || user.role === roleFilter;
      const matchesStatus = statusFilter === 'all'
        || (statusFilter === 'active' && user.active)
        || (statusFilter === 'inactive' && !user.active);

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [usersData, searchTerm, roleFilter, statusFilter]);

  if (loading) return (<div style={{ marginTop: "125px" }}>Cargando usuarios...</div>);

  return (
    <main className={styles.mainContainer}>
      <section className={styles.container}>
        <h1 className={styles.headerTitle}>Usuarios Registrados</h1>
        <UserFilters
          searchTerm={searchTerm}
          roleFilter={roleFilter}
          statusFilter={statusFilter}
          onSearchChange={setSearchTerm}
          onRoleFilterChange={setRoleFilter}
          onStatusFilterChange={setStatusFilter}
        />
        <UserTable users={filteredUsers} />
      </section>
    </main>
  )
}

export default Users;
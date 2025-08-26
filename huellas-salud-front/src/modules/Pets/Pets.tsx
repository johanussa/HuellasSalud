import { useEffect, useMemo, useState } from "react";
import { sexOptions, species, statusOptions } from "../Users/UserManagement/usersUtils";
import { SearchBar } from "../Users/UserManagement/userComponents";
import { usePetService } from "./petService";
import { Meta, Pet, PetCardProps, PetData } from "../../helper/typesHS";
import defaultPetImage from "../../assets/simba.webp";
import styles from "./pets.module.css";
import { useNavigate } from "react-router-dom";

const Pets = () => {

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sexFilter, setSexFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [speciesFilter, setSpeciesFilter] = useState<string>("ALL");
  const [petsData, setPetsData] = useState<PetData[] | undefined>([]);

  const { loading, handleGetPets } = usePetService();

  useEffect(() => {
    const fetchPetData = async () => {
      const data = await handleGetPets();
      setPetsData(data);
    };
    fetchPetData();
  }, []);

  const filteredPets = useMemo(() => {
    return petsData?.filter(({ data: pet }) => {

      const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase())
        || pet.idOwner.includes(searchTerm.toLowerCase())
        || pet.breed.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSpecies = speciesFilter === 'ALL' || pet.species === speciesFilter;

      const matchesSex = sexFilter === 'ALL'
        || (sexFilter === 'MACHO' && pet.sex === 'MACHO')
        || (sexFilter === 'HEMBRA' && pet.sex === 'HEMBRA')
        || (sexFilter === "INDETERMINADO" && pet.sex === "INDETERMINADO");

      const matchesStatus = statusFilter === 'ALL'
        || (statusFilter === 'ACTIVE' && pet.isActive)
        || (statusFilter === 'INACTIVE' && !pet.isActive);

      return matchesSearch && matchesSpecies && matchesSex && matchesStatus;
    });
  }, [petsData, searchTerm, speciesFilter, sexFilter, statusFilter]);

  if (loading) return (<div style={{ marginTop: "125px" }}>Cargando mascotas...</div>);

  return (
    <main className={styles.petsContainer}>
      <section className={styles.sectionPets}>
        <h1 className={styles.headerTitle}>Panel de administración - Mascotas</h1>
        <PetsFilters
          searchTerm={searchTerm}
          sexFilter={sexFilter}
          speciesFilter={speciesFilter}
          statusFilter={statusFilter}
          setSearchTerm={setSearchTerm}
          setSexFilter={setSexFilter}
          setSpeciesFilter={setSpeciesFilter}
          setStatusFilter={setStatusFilter}
        />
        <PetCard pets={filteredPets} setPetsData={setPetsData} />
      </section>
    </main>
  );
}

const PetCard = ({ pets, setPetsData }: PetCardProps) => {

  const navigate = useNavigate();

  const goToPetDetail = (idPet: String) => {
    navigate(`/mascotas/${idPet}`);
  };


  if (!pets || pets.length === 0) return (<h2>No hay mascotas registradas</h2>);

  const { confirmUpdate, confirmDelete } = usePetService();

  const changePetStatus = async (pet: Pet, meta: Meta) => {    
    if (await confirmUpdate(pet)) meta.lastUpdate = new Date().toString();
  }

  const deletePet = async (pet: Pet) => {
    const idPet = await confirmDelete(pet);
    if (idPet) setPetsData(prev => prev?.filter(p => p.data.idPet !== idPet));
  };

  return (
    <main className={styles.cardPetsContainer}>
      {pets && pets?.map(({ data: pet, meta }) => (
        <section className={styles.card} key={pet.idPet} onClick={() => goToPetDetail(pet.idPet)}>
          <aside className={styles.cardImageContainer}>
            <img
              src={getPetImage(pet)}
              alt={pet.name}
              className={styles.cardImage}
            />
            <span className={`${styles.statusIndicator} ${pet.isActive ? styles.active : styles.inactive}`}>
              {pet.isActive ? 'Activo' : 'Inactivo'}
            </span>
          </aside>
          <aside className={styles.cardContent}>
            <section className={styles.actions}>
              <button
                title="Eliminar"
                className={`${styles.btn} ${styles.delete}`}
                onClick={() => deletePet(pet)}
              >
                <i className="fa-regular fa-trash-can" />
              </button>
              <button
                title="Cambiar Estado"
                className={`${styles.btn} ${styles.toggleStatus}`}
                onClick={() => changePetStatus(pet, meta)}
              >
                <i className="fa-solid fa-arrows-rotate" />
              </button>
            </section>
            <h3 className={styles.petName}>{pet.name}</h3>
            <div className={styles.petInfo}>
              <span className={styles.petSpecies}>{pet.species}</span>
              <span className={styles.petSex}>{pet.sex}</span>
              {pet.sterilized && <span className={styles.sterilized}>✂</span>}
            </div>
            <div className={styles.petDetails}>
              <p><strong>Id propietario:</strong> {pet.idOwner}</p>
              <p><strong>Edad:</strong> {pet.age}</p>
              <p><strong>Raza:</strong> {pet.breed || 'Sin definir'}</p>
              <p><strong>Peso:</strong> {pet.weight}</p>
              <p><strong>Fecha registro:</strong> {new Date(meta.creationDate).toLocaleDateString()}</p>
            </div>
          </aside>
        </section>
      ))}
    </main>
  );
};

const getPetImage = (pet: Pet) => {
  if (pet.mediaFile) {
    return `data:${pet.mediaFile.contentType};base64,${pet.mediaFile.attachment}`;
  }
  return defaultPetImage;
}

interface PetsFiltersProps {
  searchTerm: string;
  sexFilter: string;
  speciesFilter: string;
  statusFilter: string;
  setSearchTerm: (term: string) => void;
  setSexFilter: (filter: string) => void;
  setStatusFilter: (filter: string) => void;
  setSpeciesFilter: (filter: string) => void;
}

const PetsFilters = ({
  searchTerm,
  sexFilter,
  speciesFilter,
  statusFilter,
  setSearchTerm,
  setSexFilter,
  setStatusFilter,
  setSpeciesFilter
}: PetsFiltersProps) => (
  <section className={styles.filters}>
    <SearchBar
      placeholder="Buscar por nombre, raza o Id propietario..."
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
    />
    <aside className={styles.selectFilters}>
      <button className={styles.btnCreateUser} onClick={() => { }}>Registrar mascota</button>
      <select
        value={speciesFilter}
        onChange={(e) => setSpeciesFilter(e.target.value)}
        className={styles.filterSelect}
      >
        <option value="ALL">Todas las especies</option>
        {species.filter(species => species !== 'ALL').map(species => (
          <option key={species} value={species}>
            {species.charAt(0) + species.slice(1).toLowerCase()}
          </option>
        ))}
      </select>
      <select
        value={sexFilter}
        onChange={(e) => setSexFilter(e.target.value)}
        className={styles.filterSelect}
      >
        {sexOptions.map(sex => (
          <option key={sex.value} value={sex.value}>
            {sex.label}
          </option>
        ))}
      </select>
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
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

export default Pets;
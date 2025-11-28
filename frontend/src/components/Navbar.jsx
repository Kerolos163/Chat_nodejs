import { useAuthStore } from "../store/useStoreAuth";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();

  return <header>Navbar</header>;
};

export default Navbar;

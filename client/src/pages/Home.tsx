import { useNavigate } from "react-router-dom";
import UserForm from "../componets/UsersForm";
import { useAuthData } from "../utils/useAuthData";

export default function Home() {
  const navigate = useNavigate();
  const { data: user, isLoading } = useAuthData();

  if (!user && isLoading) {
    navigate("login");
  }
  return <UserForm />;
}

import { useNavigate } from "react-router";
import { useCurrentUserStore } from "../util/store/currentUserStore";

export default function Home() {
  const navigate = useNavigate();
  const { setCurrentUser } = useCurrentUserStore();

  const handleSimulatedLogin = () => {
    setCurrentUser({
      id: 2,
      name: "Test User",
      email: "test@example.com",
    });

    navigate("/project");
  };

  return (
    <div className="text-orange-500">
      <h1>Home</h1>
      <button
        onClick={handleSimulatedLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Simulate Login
      </button>
    </div>
  );
}

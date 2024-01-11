import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import EditUserForm from "./EditUserForm";
import DeleteUserModal from "./DeleteUserModal";

const UserDetailPage = () => {
  const params = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:4000/users/${params.id}`);
      return res.data;
    },
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  // console.table(data);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div>{data.username}</div>
      <div>{data.email}</div>
      <div className="mb-10">{data.password}</div>
      <div className="flex gap-5">
        <EditUserForm id={params.id} username={data.username} email={data.email} password={data.password} />
        <DeleteUserModal id={params.id} />
      </div>
    </div>
  );
};

export default UserDetailPage;

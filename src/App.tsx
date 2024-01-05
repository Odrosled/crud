import { useQuery } from "@tanstack/react-query";
import "./App.css";
import axios from "axios";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Button from "./components/Button";
import { useState } from "react";
import { ModeToggle } from "./components/mode-toggle";
import NewUserForm from "./components/NewUserForm";
import { Link } from "react-router-dom";

function App() {
  const [pageNumber, setPageNumber] = useState(1);

  const { isLoading, error, data } = useQuery({
    queryKey: ["users", pageNumber],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:4000/users?page=${pageNumber}`);
      return res.data;
    },
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const buttons = Array.from({ length: data.meta.pageCount }, (_, i) => i + 1);

  return (
    <>
      <NewUserForm />
      <ModeToggle />
      {/* USERS DATA TABLE */}
      <Table>
        <TableCaption>A list of users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">userID</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Reg. Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((user: any) => {
            return (
              <TableRow key={user.userId}>
                <TableCell className="font-medium">{user.userId}</TableCell>
                <Link to={`${user.userId}`}>
                  <TableCell>{user.username}</TableCell>
                </Link>
                <TableCell>{user.email}</TableCell>
                <TableCell className="text-right">{user.registeredAt}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="flex justify-around">
        {data.meta.hasPrevPage && <Button onClick={() => setPageNumber(pageNumber - 1)} color="bg-violet-700" text="<" />}
        {data.meta.hasNextPage && <Button onClick={() => setPageNumber(pageNumber + 1)} color="bg-violet-700" text=">" />}
      </div>
      <div className="flex gap-2">
        {buttons.map((btn) => (
          <button key={btn} onClick={() => setPageNumber(btn)} className={`${data.meta.currentPage === btn ? "bg-blue-400 text-white" : "bg-white text-black"}`}>
            {btn}
          </button>
        ))}
      </div>
    </>
  );
}

export default App;

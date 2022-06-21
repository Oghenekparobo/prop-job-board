import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Loading from "./loading";

const Setup = () => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  const loading = status === "loading";

  if (loading) return <Loading/>;

  
  if (!session && !session.user.name) {
    router.push("/");
    return null
  }


  if (session && session.user.name) {
    router.push("/");
  }

  return (
    <div className="bg-orange-400 h-screen px-20">
      <div className="wrapper">
        <div className=" flex justify-center text-2xl text-white font-light pt-28">
          <h1 className="border-b border-t w-52 text-center rounded-full p-4 shadow">
            Add Your Name
          </h1>
        </div>

        <div className="flex justify-center pt-20">
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              await fetch("/api/setup", {
                body: JSON.stringify({ name, company }),
                headers:{
                    "Content-Type": "application/json"
                },
                method: "POST"
              });

              session.user.name = name;
              session.user.company = company;
              router.push("/");
            }}
          >
            <div className="setup">
              <input
                type="text"
                className="w-96 bg-transparent outline-none text-white transition ease-in-out delay-50 font-bold px-10 py-4 transition ease-in-out delay-150 rounded hover:-translate-y-1 hover:scale-110 hover:border-b hover:border-white duration-300"
                placeholder="Soro soke werey"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <input
                type="submit"
                className="pl-6 hover:bg-white hover:text-orange-500 transition ease-in-out delay-150 hover:px-8 hover:py-2 rounded"
                value="Add"
              />
            </div>
            <div className="text-center flex gap-2 justify-center items-center">
              <label htmlFor="checkbox" className="gap-2 font-light">
                hi indicate if you wan be boss
              </label>
              <input
                type="checkbox"
                name="company"
                checked={company}
                onChange={(e) => {
                  setCompany(true);
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Setup;

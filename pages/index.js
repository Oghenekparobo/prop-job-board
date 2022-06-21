import prisma from "lib/prisma";
import { getJobs, getUser } from "lib/data";
import Jobs from "./components/jobs";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loading from "./loading";
import Link from "next/link";

export default function Home({ jobs, user }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const loading = status === "loading";

  if (loading) return <Loading />;

  if (session && !session.user.name) {
    router.push("/setup");
  }

  return (
    <div className="p-10 h-screen bg-gray-100">
      {!session ? (
        <div className="flex justify-end p-2">
          <a
            href="/api/auth/signin"
            className="bg-green-500 shadow text-white font-bold py-2 px-6 rounded"
          >
            Login
          </a>
        </div>
      ) : (
        <div className="flex justify-end p-2">
          <h4
            href=""
            className="bg-green-500 shadow text-white font-bold py-2 px-6 rounded"
          >
            {session.user.name}
          </h4>
        </div>
      )}

      {session && (
        <>
          <p className="mb-10 text-2xl font-normal">
            Welcome, {user.name}
            {user.company && (
              <span className="bg-black text-white uppercase text-sm p-2">
                Company
              </span>
            )}
          </p>
          {user.company ? (
            <>
              <div className="p-6">
                <Link href={`/new`}>
                  <button className="border px-8 py-2 mt-5 font-bold rounded-full bg-black text-white border-black ">
                    click here to post a new job
                  </button>
                </Link>
                <button className="ml-5 border px-8 py-2 mt-5 font-bold rounded-full bg-black text-white border-black ">
                  see all the jobs you posted
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="p-6">
                <button className=" border px-8 py-2 mt-5 font-bold rounded-full bg-black text-white border-black ">
                  see all the jobs you applied to
                </button>
              </div>
            </>
          )}
        </>
      )}
      <div className="bg-red-400 shadow text-end p-6">
        <a href="" className="bg-white py-2 px-6 text-center font-bold rounded">
          Find a Job
        </a>
      </div>
      <div className="grid grid-cols-4 gap-3 pt-10">
        {jobs.map((job, index) => (
          <Jobs job={job} key={index} />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  let jobs = await getJobs(prisma);
  jobs = JSON.parse(JSON.stringify(jobs));

  if (!session) {
    return {
      props: { jobs },
    };
  }

  let user = await getUser(session.user.id, prisma);
  user = JSON.parse(JSON.stringify(user));

  return {
    props: {
      jobs,
      user,
    },
  };
}

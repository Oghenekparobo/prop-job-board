import prisma from "lib/prisma";
import { getJob, alreadyApplied } from "lib/data";
import Link from "next/link";
import { getSession } from "next-auth/react";

const Job = ({ job, applied }) => {
  return (
    <div className="bg-black h-screen">
      <div className="text-center">
        <Link href={`/`}>
          <a href="" className=" text-sm font-bold underline text-white">
            back
          </a>
        </Link>
      </div>

      {applied ? (
        <div className="mt-20 flex justify-center ">
          <Link href={`/dashboard`}>
            <button className=" border  px-8 py-2 mt-0  font-bold rounded-full bg-black text-white ">
              You already applied!
            </button>
          </Link>
        </div>
      ) : (
        <div className="mt-20 flex justify-center ">
          <Link href={`/job/${job.id}/apply`}>
            <button className=" border  px-8 py-2 mt-0  font-bold rounded-full bg-black text-white ">
              Apply to this job
            </button>
          </Link>
        </div>
      )}
      <div className="bg-red-400 shadow text-center p-6">
        <a href="" className="bg-white py-2 px-6 text-center font-bold rounded">
          {job.author.name}
        </a>
      </div>

      <div className="flex text-white  justify-center pt-10">
        <div className="card border  border-red-500 shadow-2xl px-10 py-4 w-96">
          <div className="title">
            <Link href={`/job/${job.id}`}>
              <a className="font-bold"> {job.title}</a>
            </Link>
          </div>
          <div className="author">
            <Link href={`/company/${job.author.id}`}>
              <a className="font-semibold">posted by {job.author.name} </a>
            </Link>
          </div>
          <div className="desc ">
            <p className="text-clip font-thin"> {job.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  let job = await getJob(context.params.id, prisma);
  job = JSON.parse(JSON.stringify(job));
  let applied = await alreadyApplied(
    session.user.id,
    context.params.id,
    prisma
  );

  applied = JSON.parse(JSON.stringify(applied));

  return {
    props: {
      job,
      applied,
    },
  };
}

export default Job;

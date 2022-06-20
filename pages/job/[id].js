import prisma from "lib/prisma";
import { getJob,getCompany } from "lib/data";
import Link from "next/link";

const Job = ({ job }) => {
  return (
    <div className="bg-black h-screen">
      <div className="text-center p-4 m-4">
        <Link href={`/`}>
          <a href="" className="mb-10 text-sm font-bold underline text-white">
            back
          </a>
        </Link>
      </div>
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
  let job = await getJob(context.params.id, prisma);
  job = JSON.parse(JSON.stringify(job));
  return {
    props: {
      job,
    },
  };
}

export default Job;

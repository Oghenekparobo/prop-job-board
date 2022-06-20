import { getCompanyJobs } from "lib/data";
import { getCompany } from "lib/data";
import prisma from "lib/prisma";
import Link from "next/link";


export default function Company({ jobs, company }) {
  return (
    <div className=" bg-black h-screen">
      <div className="text-center p-4">
        <Link href={`/`}>
          <a href="" className="mb-10 text-sm font-bold underline text-white">
            back
          </a>
        </Link>
      </div>
      <div className="bg-red-400 shadow text-center p-6">
        <a href="" className="bg-white py-2 px-6 text-center font-bold rounded">
          {company.name}
        </a>
      </div>

      <div className="text-white">
          <div className="card  shadow-xl px-8 py-4">
              <div className="title">
                  <Link href= {`/job/${jobs.id}`}>
                  <a className="font-bold"> {jobs.title}</a>
                  </Link>
              </div>
              <div className="desc ">
                  <p className="text-clip font-thin"> {jobs.description}</p>
              </div>
          </div>
        </div>


    </div>
  );
}

export async function getServerSideProps({ params }) {
  let company = await getCompany(params.id, prisma);
  company = JSON.parse(JSON.stringify(company));
  let jobs = await getCompanyJobs(params.id, prisma);
  jobs = JSON.parse(JSON.stringify(jobs));
  return {
    props: {
      company,
      jobs,
    },
  };
}

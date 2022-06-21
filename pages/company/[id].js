import { getCompanyJobs } from "lib/data";
import { getCompany } from "lib/data";
import prisma from "lib/prisma";
import Link from "next/link";
import Jobs from "pages/components/jobs";


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
        profile of  {company.name} {jobs.description}
        </a>
      </div>

      {
        jobs.map((job , index) =>{ 
          <Jobs job={job} key={index} />
        })
      }

    </div>
  );
}

export async function getServerSideProps({ params }) {
	let company = await getCompany(params.id, prisma)
  let jobs = await getCompanyJobs(params.id, prisma)
  company = JSON.parse(JSON.stringify(company))
  jobs = JSON.parse(JSON.stringify(jobs))

  return {
    props: {
      jobs,
      company,
    },
  }
}
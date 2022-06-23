import { getJobsPosted, getUser} from "lib/data";
import { getApplications } from "lib/data";
import prisma from "lib/prisma";
import { getSession, useSession } from "next-auth/react";
import Job from "./components/job";
import Loading from "./loading";
import Link from "next/link";

const Dashboard = ({ user, jobs, applications }) => {
  const { data: session, status } = useSession();
  if (status === "loading") return <Loading />;

  return (
    <div className="bg-orange-400 h-screen">
      <Link href={`/`}>
        <a className=" cursor ml-4 bg-white text-center rounded text-orange-400 px-4 py-2">
          Home
        </a>
      </Link>

      <div className="text-center p-4 ">
        <h2 className="text-4xl font-bold text-white p-4">Dashboard</h2>
        {user.company && (
          <span className="bg-black text-white uppercase text-sm p-2 ">
            Company
          </span>
        )}
         {session && (
          <p className=' text-2xl font-light text-light'>
            {user.company ? 'all the jobs you posted' : 'your applications'}
          </p>
        )}
      </div>
      {user.company ? (
  <Job jobs={jobs} isDashboard={true} />
  
) : (
  <>
    {applications.map((application, application_index) => {
      return (
        <div key={application_index} className=' flex justify-center'>
          <div className='pl-16 pr-16  w-1/2'>
            <Link href={`/job/${application.job.id}`}>
              <a className='text-xl font-bold underline'>
                {application.job.title}
              </a>
            </Link>
            <h2 className='text-base font-normal'>
              {application.coverletter}
            </h2>
          </div>
        </div>
      )
    })}
  </>
)}
<div>
  {jobs.map((job, index) => (
    <div key={index}>
      <Job job={job} isDashboard={true} />

      <div className='mb-4 mt-20'>
        <div className='pl-16 pr-16 -mt-6'>
          {job.applications.length === 0 ? (
            <p className='mb-10 text-2xl font-normal'>
              No applications so far 😞
            </p>
          ) : (
            <p className='mb-10 text-2xl font-normal'>
              {job.applications.length} applications
            </p>
          )}

					{job.applications?.map((application, application_index) => (
            <div key={index + '-' + application_index}>
              <h2 className='text-base font-normal mt-3'>
                <span className='text-base font-bold mt-3 mr-3'>
                  {application.author.name}
                </span>
                {application.author.email}
              </h2>
              <p className='text-lg font-normal mt-2 mb-3'>
                {application.coverletter}
              </p>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  ))}
</div>
    </div>
  );
};

export async function getServerSideProps(context) {
    const session = await getSession(context)
    let user = await getUser(session.user.id, prisma)
    user = JSON.parse(JSON.stringify(user))
    
  
    let jobs = []
    let applications = []
  
    if (user.company) {
      jobs = await getJobsPosted(user.id, prisma)
      jobs= JSON.parse(JSON.stringify(jobs))
    } else {
      applications = await getApplications(user.id, prisma)
      applications = JSON.parse(JSON.stringify(applications))
    }
  
    return {
      props: {
        user,
        jobs,
        applications,
      },
    }
  }

export default Dashboard;

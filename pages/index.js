import prisma from "lib/prisma"
import { getJobs } from "lib/data"
import Jobs from "./components/jobs"

export default function Home({jobs}) {
  return (
   <div className="p-10 h-screen bg-gray-100">
     <div className="bg-red-400 shadow text-end p-6">
       <a href="" className="bg-white py-2 px-6 text-center font-bold rounded">Find a Job</a>
     </div>
     <div className="grid grid-cols-4 gap-3 pt-10">
       {
         jobs.map((job, index) => (
           <Jobs job={job} key={index}/>
         ))
       }
     </div>
   </div>
  )
}

export async function getServerSideProps(context){ 
  let jobs = await getJobs(prisma)
  jobs = JSON.parse(JSON.stringify(jobs))

  return {
    props:{
      jobs,
    }
  }

}

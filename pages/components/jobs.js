import Link from "next/link";

const Jobs = ({ job, isDashboard }) => {
  return (
    <div className="">
      <div className="card  shadow-xl px-8 py-4">
      {isDashboard && job.published && (
          <span className="bg-black text-white uppercase text-sm p-2 mr-5">
            ✅ Published
          </span>
        )}
        {isDashboard && !job.published && (
          <span className="bg-black text-white uppercase text-sm p-2 mr-5">
            ❌ Unpublished
          </span>
        )}
        <div className="title">
          <Link href={`job/${job.id}`}>
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
  );
};

export default Jobs;

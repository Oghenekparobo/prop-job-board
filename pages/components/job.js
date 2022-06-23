import Jobs from "./jobs";

const Job = ({jobs , isDashboard}) => {
    return ( 
        <div className="">
            {jobs.map((job, index) => (
          <Jobs job={job} key={index} isDashboard={isDashboard} />
        ))}
        </div>
     );
}
 
export default Job;
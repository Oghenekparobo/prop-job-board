// utilities to generate fake data and clear database

export default function () {
  return (
    <div className="bg-purple-500 h-screen">
      <h1 className="text-white text-center p-4 shadow text-xl pt-5 border-b border-indigo-500">
        UTILITIES
      </h1>

      <div className="flex text-white justify-evenly pt-10">
        <div className="clear-database border p-2 rounded-full ">
          <button
            onClick={async () => {
              await fetch("/api/utils", {
                body: JSON.stringify({
                  task: "clean_database",
                }),
                headers: {
                  "Content-Type": "application/json",
                },
                method: "POST",
              });
            }}
          >
            Clean database
          </button>
        </div>

        <div className="generate_users_and_jobs border p-2 rounded-full relative top-8">
          <button
           
            onClick={async () => {
              await fetch("/api/utils", {
                body: JSON.stringify({
                  task: "generate_users_and_jobs",
                }),
                headers: {
                  "Content-Type": "application/json",
                },
                method: "POST",
              });
            }}
          >
            Generate users and some jobs
          </button>
        </div>

        <div className="generate_job border p-2 rounded-full relative top-16">
          <button
          
            onClick={async () => {
              await fetch("/api/utils", {
                body: JSON.stringify({
                  task: "generate_one_job",
                }),
                headers: {
                  "Content-Type": "application/json",
                },
                method: "POST",
              });
            }}
          >
            Generate a new job
          </button>
        </div>
      </div>
    </div>
  );
}

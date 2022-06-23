import { useState } from "react";
import {  useRouter } from "next/router";

const New = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();
  return (
    <div className="bg-orange-400 flex justify-center items-center h-screen">
      <div className="wrapper text-white">
        <h2 className="text-white text-center text-xl font-semi-bold uppercase shadow p-4 rounded-full border-white border-r border-l  ">
          Post a new Job
        </h2>
        <form
          className="form"
          onSubmit={async (e) => {
            e.preventDefault();

            await fetch("/api/job", {
              body: JSON.stringify({
                title,
                description,
                salary,
                location,
              }),
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
            });
            router.push("dashboard");
          }}
        >
          <div className="title pb-4 pt-20">
            <input
              type="text"
              className="form-control"
              placeholder="job-title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="description">
            <textarea
              name=""
              className="form-control"
              cols="30"
              rows="2"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="job-description"
            ></textarea>
          </div>
          <div className="salary pb-4">
            <input
              type="text"
              className="form-control"
              placeholder="job-salary"
              value={salary}
              onChange={(e) => {
                setSalary(e.target.value);
              }}
            />
          </div>
          <div className="location pb-4">
            <input
              type="text"
              className="form-control"
              placeholder="location"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
          </div>

          <div className="submit text-center">
            <input
              type="submit"
              className="bg-white text-orange-400 font-bold px-8 py-2 rounded text-xl"
              value="Post"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default New;

import { useState } from "react";
import { useRouter } from "next//router";
import { useSession, getSession } from "next-auth/react";
import Link from "next/link";

import { getJob } from "lib/data";
import prisma from "lib/prisma";
import Loading from "pages/loading";

export default function Apply({ job }) {
  const [coverletter, setCoverletter] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <Loading />;

  if (!session) return null;

  return (
    <div className=" bg-orange-400 h-screen">
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          await fetch("/api/application", {
            body: JSON.stringify({
              coverletter,
              job: job.id,
            }),
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
          });

          router.push("/dashboard");
        }}
      >
        <div className="flex flex-col w-1/2 mx-auto">
          <div className="">
            <div className="text-center p-4">
              <Link href={`/job/${job.id}`}>
                <a
                  href=""
                  className="mb-10 text-sm font-bold text-white underline"
                >
                  back
                </a>
              </Link>
            </div>
            <div className="text-center p-4 m-4">
              <h2 className="mb-10 text-4xl font-light text-white">
                Apply to the job {job.title}
              </h2>
            </div>

            <div className="mb-4">
              <div className="pl-16 pr-16">
                <p className="text-base font-light text-gray-900 tracking-wide mt-3">
                  {job.description}
                </p>
                <div className="mt-4">
                  <h4 className="inline">Posted by</h4>
                  <div className="inline">
                    <div className="ml-3 -mt-6 inline">
                      <span>
                        <Link href={`/company/${job.author.id}`}>
                          <a>
                            <span className="text-base font-medium color-primary underline">
                              {job.author.name}
                            </span>
                          </a>
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" pt-2  mr-1 ">
            <textarea
              className="border p-4 w-full text-lg font-medium bg-transparent outline-none color-primary "
              rows={6}
              cols={50}
              placeholder="Cover letter"
              value={coverletter}
              required
              onChange={(e) => setCoverletter(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <button className="border float-right px-8 py-2 mt-0 bg-white text-orange-400 font-bold rounded-full">
              Apply to this job
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export async function getServerSideProps(context) {
  let job = await getJob(context.params.id, prisma);
  job = JSON.parse(JSON.stringify(job));

  return {
    props: {
      job,
    },
  };
}

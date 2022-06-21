import prisma from "lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(501).end();
  }

  const session = await getSession({ req });
  if (!session) return res.status(401).json({ message: "not logged in" });

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });


  if(req.method == 'POST'){
      
  if (!req.body.user) {
    return res.status(400).json({ message: "user not found" });
  }

  if(!req.body.title) {
    return res.status(400).json({ message: "title not found" });
  }

  if (!req.body.description) {
    return res.status(400).json({ message: "description not found" });
  }

  if (!req.body.salary) {
    return res.status(400).json({ message: "salary not found" });
  }

  if (!req.body.location) {
    return res.status(400).json({ message: "location not found" });
  }


  await prisma.job.create({
      data:{
        title:req.body.title,
        description:req.body.description,
        salary:req.body.salary,
        location:req.body.location,
        author:{
            connect:{id: user.id},
        }


      }
  })

  res.status(200).end();

  }

}

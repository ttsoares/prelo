import { prisma } from "../../lib/prisma";

export default function Teste() {
  const objeto = { name: "Paulo", password: "1223", role: "BASIC" };

  async function create() {
    try {
      const resp = await fetch("http://localhost:3000/api/db/create", {
        body: JSON.stringify(objeto),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(console.log("OK"));
      return resp;
    } catch (error) {
      console.log(error);
    }
  }

  console.log(create());

  // async function create() {
  //   try {
  //     const user = await fetch("../api/db", {
  //       body: JSON.stringify(objeto),
  //       headers: {
  //         ContentType: "application/json",
  //       },
  //       method: "POST",
  //     });
  //     return user;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // console.log(create(objeto));

  return <div>index</div>;
}

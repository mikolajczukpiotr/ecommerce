import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";
async function getData() {
  console.log(process.env.BACKEND_URL, process.env.AUTHORIZATION_HEADER, "env");
  try {
    const res = await fetch(
      `https://correct-acoustics-cb3eb839ab.strapiapp.com/api/home?populate=*`,
      {
        headers: {
          Authorization: process.env.AUTHORIZATION_HEADER
            ? process.env.AUTHORIZATION_HEADER
            : "",
        },
      }
    );

    const data = await res.json();
    return data.data ? JSON.parse(JSON.stringify(data.data)) : [];
  } catch (error) {
    console.log("error inside get route", error);
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }

    return new Response("Internal Server Error", { status: 500 });
  }
}

export default async function Home() {
  // const data = await getData();
  // if (!data) return Error("Failed to fetch data");
  // if (!data) return null;
  return (
    <div className="flex flex-col w-full text-black">
      {/* <Image
        src={
          data.attributes.image.data[0]
            ? `${data.attributes.image.data[0].attributes.url}`
            : "https://dummyimage.com/400x400"
        }
        alt="content"
        width={800}
        height={400}
        className="w-full object-contain md:h-1/3 lg:h-fit object-center mb-6"
      />
      <div className="container mx-auto px-4 gap-12">
        <BlocksRenderer
          content={data.attributes.description}
          blocks={data.attributes.description.blocks}
        /> */}
      {/* </div> */}
    </div>
  );
}

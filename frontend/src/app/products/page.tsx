import Link from "next/link";
import React from "react";
import Image from "next/image";

async function getData() {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/products?populate=*`,
    {
      headers: {
        Authorization:
          "Bearer bb3a298afbd9a44258d6f847b94d4bb8b17a70dea41bcad27025a7b3d2d6493a2b74b5f40b55b8499f7d935a5e79c0dd937523690bdc3fccf276b0d0fc90712e2d652d17136a48f73c20858e3ac1c4b06519343155a03d73f3c774fc21c45825a3e864d833984693edbeb5b9969bfe3c54798ebc1ac2f4b745db5ac8dc83f8f5",
      },
    }
  );
  if (!res.ok) {
    console.log("Failed to fetch data");
  }

  const data = await res.json();
  return data.data ? JSON.parse(JSON.stringify(data.data)) : [];
}

export default async function Products() {
  const data = await getData();
  console.log(data, "data");
  if (!data) return Error("Failed to fetch data");
  return (
    <div className="uppercase">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-8 mx-auto">
          <div className="flex flex-wrap w-full mb-12">
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
              Filter
            </p>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:gird-cols-3 xl:grid-cols-4">
            {data.map((product: any) => {
              return (
                <Link
                  href={`product/${product.id}`}
                  className="h-full"
                  key={product.id}
                >
                  <div className="">
                    <img
                      className="h-96 rounded w-full object-cover object-center mb-6 transition-transform hover:scale-110"
                      src={
                        product.attributes.image.data
                          ? `${process.env.BACKEND_URL}${product.attributes.image.data[0].attributes.url}`
                          : "https://dummyimage.com/400x400"
                      }
                      objectFit="cover"
                      alt="content"
                      width={400}
                      height={400}
                    />
                    <div className="flex flex-col text-center">
                      <p className="text-lg text-center text-gray-900 font-light title-font mb-4">
                        {product.attributes.name}
                      </p>
                      <p>{product.attributes.price} PLN</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

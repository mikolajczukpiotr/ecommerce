import Link from "next/link";
import React from "react";
import Image from "next/image";

async function getData() {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/products?populate=*`,
    {
      headers: {
        Authorization: process.env.AUTHORIZATION_HEADER
          ? process.env.AUTHORIZATION_HEADER
          : "",
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
                    <Image
                      className="h-96 rounded w-full object-cover object-center mb-6 transition-transform hover:scale-110"
                      src={
                        product.attributes.image.data
                          ? `${product.attributes.image.data[0].attributes.url}`
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

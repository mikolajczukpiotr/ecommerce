import Link from "next/link";
import React from "react";

async function getData() {
  const res = await fetch("http://localhost:1337/api/products?populate=*", {
    headers: {
      Authorization:
        "Bearer 3aa5b3833c80a431949cc2190b6ad19b1ca4836214b5cd660167477d598d7ccd4b539b6dd5b76f592723c0a46957b1331c00e1060a7c25ac040ca27a667342fc114516d1a430294261cce22312994166132eea06150f9dc16ca0f34cd08657f59f1e279692374ef90b2a67acb1b56dd18671ad309f624609cf1cf41917238df6",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Products() {
  const data = await getData();
  console.log(data);
  return (
    <div className="uppercase">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-8 mx-auto">
          <div className="flex flex-wrap w-full mb-12">
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
              Filtruj
            </p>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:gird-cols-3 xl:grid-cols-4">
            {data.data.map((product) => {
              console.log(product.attributes.image.data[0].attributes);
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
                          ? `http://localhost:1337${product.attributes.image.data[0].attributes.url}`
                          : "https://dummyimage.com/400x400"
                      }
                      object-fit="cover"
                      alt="content"
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

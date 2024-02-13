import AddToCart from "@/components/AddToCard";
import ImageSlider from "@/components/ImageSlider";
import React from "react";

async function getData(id: number) {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/products/${id}?populate=*`,
    {
      headers: {
        Authorization:
          "Bearer bb3a298afbd9a44258d6f847b94d4bb8b17a70dea41bcad27025a7b3d2d6493a2b74b5f40b55b8499f7d935a5e79c0dd937523690bdc3fccf276b0d0fc90712e2d652d17136a48f73c20858e3ac1c4b06519343155a03d73f3c774fc21c45825a3e864d833984693edbeb5b9969bfe3c54798ebc1ac2f4b745db5ac8dc83f8f5",
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data.data ? JSON.parse(JSON.stringify(data.data)) : [];
}

export default async function Product({ params }: { params: { id: number } }) {
  const data = await getData(params.id);
  console.log(data, "data");

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <ImageSlider urls={data.attributes.image} />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {data.attributes.name}
            </h1>

            <p className="leading-relaxed">
              Fam locavore kickstarter distillery. Mixtape chillwave tumeric
              sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo
              juiceramps cornhole raw denim forage brooklyn. Everyday carry +1
              seitan poutine tumeric. Gastropub blue bottle austin listicle
              pour-over, neutra jean shorts keytar banjo tattooed umami
              cardigan.
            </p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5" />
            <div className="flex flex-col gap-3">
              <span className="title-font font-medium text-2xl text-gray-900">
                {data.attributes.price} PLN
              </span>
              <AddToCart product={data} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

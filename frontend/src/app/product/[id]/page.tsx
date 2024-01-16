import AddToCart from "@/components/AddToCard";
import React from "react";

async function getData(id: number) {
  const res = await fetch(
    `http://localhost:1337/api/products/${id}?populate=*`,
    {
      headers: {
        Authorization:
          "Bearer 3aa5b3833c80a431949cc2190b6ad19b1ca4836214b5cd660167477d598d7ccd4b539b6dd5b76f592723c0a46957b1331c00e1060a7c25ac040ca27a667342fc114516d1a430294261cce22312994166132eea06150f9dc16ca0f34cd08657f59f1e279692374ef90b2a67acb1b56dd18671ad309f624609cf1cf41917238df6",
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Product({ params }: { params: { id: number } }) {
  const data = await getData(params.id);
  console.log(data.data.attributes.availableSizes);

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src="https://dummyimage.com/400x400"
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {data.data.attributes.name}
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
                $58.00
              </span>
              <AddToCart product={data.data.attributes} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

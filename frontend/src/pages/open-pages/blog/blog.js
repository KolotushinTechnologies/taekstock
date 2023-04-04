// Import Engine
import React from "react";

//Import Image
import blogimage from "../../../img/BMW-3-Series-Exterior.webp";

// Create Function For Blog Page
const BlogPage = () => {
  return (
    <section className="other-container">
      <h1 className="text-[--primary-color] text-[40px] mb-3">Блог</h1>
      <div className="w-full h-[500px] rounded-2xl">
        <img
          src={blogimage}
          className="w-full h-full object-cover rounded-2xl"
          alt=""
        />
      </div>
      <p className="text-white text-[22px] mt-[50px]">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus harum
        tempora ratione mollitia cum? Adipisci unde ratione nisi qui, dolorum
        nihil consectetur ipsa, officiis iste delectus eaque quam mollitia totam
        quaerat libero dicta velit animi, hic quo fuga voluptatum deleniti!
      </p>
    </section>
  );
};

// Export Blog Page
export default BlogPage;

import { React, useState, useEffect } from "react";
import SingleCard from "../ProductCard/SingleCard/SingleCard";
// import { BiLoaderCircle } from "react-icons/bi";
import PaginationCompo from "../ProductCard/PaginationCompo";
import { MdOutlineArrowRight } from "react-icons/md";
const FoodCategories = () => {
  const [category, setCategory] = useState("Seafood");

  //pagination stuff-----------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(8);

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleFilter = (index) => {
    setCategory(index);
  };
  useEffect(() => {
    const fetchFoods = async () => {
      setLoading(true);

      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      const json = await response.json();
      setFoods(json.meals);
      // .then((res) => res.json())
      // .then((data) => setFoods(data.meals));
      setLoading(false);
    };
    fetchFoods();
    setCurrentPage(1);
  }, [category]);
  console.log(category);

  // Get Current Posts
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentFoods = foods.slice(indexOfFirstPost, indexOfLastPost);
  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container px-7 mx-auto">
      {/* <div className="my-5 flex justify-center">
        <div className="w-96">
          <p className="text-red-500 font-bold text-sm text-center tracking-wider">
            FRESH FROM OUR VENDORS
          </p>
          <h3 className="font-bold text-3xl  text-center">
            We Offer People Best Way To Eat Best Foods
          </h3>
        </div>
      </div> */}

      {/* -------------filter/query buttons ------------- */}

      {/* ----------------------------------------------------------------------------------------- */}
      {/* <div className="flex justify-center ">
        <div className="flex bg-red-50 p-3 rounded-3xl  mb-4">
          <h3 className="font-bold ">Here are all</h3>
          <h3 className="font-bold border-b-2 mx-2 border-red-500 text-red-500 ">
            {country}
          </h3>
          <h3 className="font-bold">foods from us</h3>
        </div>
      </div> */}
      {/* --------------------------------------- */}
      <div className="grid md:grid-cols-[1fr,_2fr] gap-4">
        <div>
          <div className="food-category mb-8">
            <h2 className="text-xl font-bold pb-4 border-b-2 border-dashed">
              Categories
            </h2>

            <ul className="category-list-group">
              <li
                className="category-list"
                onClick={() => handleFilter("Chicken")}
              >
                <span
                  className={
                    category === "Chicken"
                      ? "flex items-center list-content-active"
                      : "flex items-center list-content"
                  }
                >
                  <MdOutlineArrowRight />
                  Chicken
                </span>
              </li>
              <li
                className="category-list"
                onClick={() => handleFilter("Pasta")}
              >
                <span
                  className={
                    category === "Pasta"
                      ? "flex items-center list-content-active"
                      : "flex items-center list-content"
                  }
                >
                  <MdOutlineArrowRight />
                  Pasta
                </span>
              </li>
              <li
                className="category-list"
                onClick={() => handleFilter("Dessert")}
              >
                <span
                  className={
                    category === "Dessert"
                      ? "flex items-center list-content-active"
                      : "flex items-center list-content"
                  }
                >
                  <MdOutlineArrowRight />
                  Dessert
                </span>
              </li>
            </ul>
          </div>

          <div className="filter-by-price mb-8">
            <h2 className="text-xl font-bold pb-4 border-b-2 border-dashed">
              Filter by Price
            </h2>
          </div>

          <div className="best-deals mb-8">
            <h2 className="text-xl font-bold pb-4 border-b-2 border-dashed">
              Today's best deals
            </h2>
            {foods
              .filter((item, index) => index < 4)
              .map((food) => (
                <div
                  key={food.idMeal}
                  className="best-deals grid grid-cols-[1fr,_2fr] gap-4 border-b-2"
                >
                  <div>
                    <img
                      className="rounded-full object-cover p-2.5 w-44 mx-auto"
                      src={food.strMealThumb}
                      alt={food.strMeal}
                    />
                  </div>
                  <div className="mt-10">
                    <h3 className="text-xl font-bold"> {food.strMeal}</h3>
                    <p className="font-bold text-red-400">$ 9.99</p>
                  </div>
                </div>
              ))}
            {/*  */}
          </div>
        </div>
        {/*------------- product showcase section ------------ */}
        <div className="grid grid-cols sm:grid-cols md:grid-cols-2 lg:grid-cols-2 gap-7">
          {currentFoods.map((food) => (
            <SingleCard
              key={food.idMeal}
              food={food}
              loading={loading}
            ></SingleCard>
          ))}
          <div className="flex justify-center">
            <PaginationCompo
              postPerPage={postPerPage}
              totalPosts={foods.length}
              paginate={paginate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCategories;

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/Cart/UserCart.jsx";
import axios from "axios";

export default function Customize() {
  const apiBase = import.meta.env.VITE_API_URL;
  const [candyOptions, setCandyOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedCandies, setSelectedCandies] = useState([]);

  useEffect(() => {
    const fetchCandies = async () => {
      try {
        const res = await axios.get(`${apiBase}/products?limit=100`);

        if (res.data.success) {
          const filtered = res.data.data.filter((candy) => {
            const category = candy.category ? candy.category.toUpperCase() : "";
            return category !== "SPECIALSET" && category !== "PACKAGE";
          });
          setCandyOptions(filtered);
        }
      } catch (err) {
        console.error("Error fetching candies:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCandies();
  }, [apiBase]);

  const candySection = useRef(null);

  const navigate = useNavigate();
  const { addToCart } = useCart();

  const packages = [
    {
      id: "bag",
      name: "Bag",
      candyLimit: 2,
      price: 200,
      image: "/bag.png",
      description: " Pick up to 2 candy types  🍭🍭 ",
    },
    {
      id: "bowl",
      name: "Bowl",
      candyLimit: 4,
      price: 300,
      image: "/bowl.png",
      description: "Pick up to 4 candy types  🍭🍭",
    },
    {
      id: "jar",
      name: "Jar",
      candyLimit: 8,
      price: 400,
      image: "/jar.png",
      description: "Pick up to 8 candy types  🍭🍭",
    },
  ];

  function handleSelectPackage(pkg) {
    setSelectedSize(pkg);
    setSelectedCandies([]);

    setTimeout(() => {
      candySection.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  function handleAddCandy(candy) {
    if (selectedCandies.length < selectedSize.candyLimit) {
      const cartId = crypto.randomUUID();
      setSelectedCandies([...selectedCandies, { ...candy, cartId }]);
    }
  }

  function handleRemoveCandy(cartId) {
    setSelectedCandies(selectedCandies.filter((c) => c.cartId !== cartId));
  }

  function handleCancel() {
    setSelectedSize(null);
    setSelectedCandies([]);

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, 100);
  }

  function handleCheckout() {
    addToCart({
      _id: `custom-${crypto.randomUUID()}`,
      name: `Sweet Bundle - ${selectedSize.name} 🍬`,
      imageUrl: selectedSize.image,
      price: selectedSize.price,
      details: {
        size: selectedSize.name,
        candies: selectedCandies.map((c) => c.name),
      },
      isCustom: true,
      quantity: 1,
    });
    navigate("/shoppingcart");
  }

  const isCartFull = selectedCandies.length >= (selectedSize?.candyLimit || 0);

  return (
    <div className="min-h-screen bg-pink-50/30">
      <div className="px-6 lg:pr-[420px] pb-20 lg:pb-20 pb-[280px]">
        <div className="text-center my-12">
          <h1 className="text-[28px] md:text-[42px] text-gray-800 drop-shadow font-bold">
            🍭 Build Sweet Bundle 🍭
          </h1>
        </div>

        <section className="max-w-6xl mx-auto my-16">
          <h2 className="text-2xl md:text-3xl text-center mb-8 font-bold text-gray-800">
            Step 1: Select your sweet size! 🍭
          </h2>

          <div className="flex gap-4 md:gap-5 justify-center flex-wrap">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => handleSelectPackage(pkg)}
                className={`
                  w-44 md:w-52 p-4 md:p-5 rounded-3xl bg-white cursor-pointer
                  transition-all duration-300 text-center shadow-sm
                  hover:scale-105 hover:shadow-md
                  ${selectedSize?.id === pkg.id ? "ring-4 ring-cyan-400" : ""}
                `}
              >
                <div className="bg-gray-50 rounded-2xl aspect-square flex items-center justify-center mb-3 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-800 mb-1">{pkg.name}</h3>
                <p className="text-xs md:text-sm text-gray-700 mb-2">
                  {pkg.description}
                </p>
                <p className="text-lg md:text-xl font-bold text-gray-800 mb-3">
                  ฿{pkg.price}
                </p>
                <button
                  className="w-full px-4 py-2 rounded-xl bg-cyan-200 text-gray-800 hover:bg-cyan-300 text-xs md:text-sm font-medium transition-colors"
                >
                  {selectedSize?.id === pkg.id ? "Select this" : "Pack this! 📦"}
                </button>
              </div>
            ))}
          </div>
        </section>

        {selectedSize && (
          <section ref={candySection} className="max-w-6xl mx-auto my-16">
            <h2 className="text-2xl md:text-3xl text-center mb-10 font-bold text-gray-800">
              Step 2: Create your sweet mix! 🍭 ({selectedCandies.length}/
              {selectedSize.candyLimit})
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 max-w-4xl mx-auto">
              {candyOptions.map((candy) => (
                <div
                  key={candy._id}
                  className="bg-white rounded-3xl p-4 md:p-5 shadow-sm flex flex-col h-full"
                >
                  <div className="bg-gray-50 rounded-2xl aspect-square flex items-center justify-center mb-3 overflow-hidden">
                    <img
                      src={candy.imageUrl}
                      alt={candy.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="text-center flex-1 flex flex-col">
                    <p className="text-gray-800 font-bold text-sm md:text-base leading-snug mb-1">
                      {candy.name}
                    </p>
                    <p className="text-xs md:text-sm text-gray-700 mb-3">฿{candy.price}</p>

                    <button
                      disabled={isCartFull}
                      onClick={() => handleAddCandy(candy)}
                      className="
                        mt-auto w-full
                        px-4 py-2 md:py-2.5 rounded-xl 
                        bg-cyan-200 text-gray-800
                        hover:bg-cyan-300
                        cursor-pointer text-xs md:text-sm font-medium
                        disabled:bg-gray-200 disabled:text-gray-400
                        transition-colors
                      "
                    >
                      {isCartFull ? "Sweet enough! 🎁" : "I want this!🍭"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      
      <aside className="hidden lg:flex fixed right-0 top-0 bottom-0 w-[400px] bg-white shadow-[-4px_0_10px_rgba(0,0,0,0.1)] flex-col z-50 border-l border-pink-200">
        <div className="bg-gradient-to-r from-pink-300 to-pink-400 p-5 text-white">
          <h2 className="text-2xl font-bold">My Candy Box 🎁🍬</h2>
        </div>

        <div className="flex-1 p-5 overflow-y-auto">
          {!selectedSize ? (
            <p className="text-center text-gray-400 italic">
              Pick a box to start! 🍬
            </p>
          ) : (
            <>
              <div className="bg-pink-50 p-4 rounded-2xl mb-2 flex items-center gap-4 border border-pink-200">
                <div className="bg-white/70 rounded-xl p-2">
                  <img
                    src={selectedSize.image}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{selectedSize.name}</h3>
                  <p className="text-sm text-gray-600">
                    Up to {selectedSize.candyLimit} candy types
                  </p>
                </div>
                <span className="ml-auto text-xl font-bold text-pink-600">
                  ฿{selectedSize.price}
                </span>
              </div>

              <button
                onClick={handleCancel}
                className="w-full mb-4 py-2 rounded-xl border border-pink-400 text-pink-600 font-bold hover:bg-pink-100 cursor-pointer transition-colors"
              >
                Restart box 📦
              </button>

              <h3 className="font-bold mb-2 text-gray-800">
                Selected Candies ({selectedCandies.length}/{selectedSize.candyLimit})
              </h3>

              <div className="space-y-2">
                {selectedCandies.map((candy) => (
                  <div
                    key={candy.cartId}
                    className="flex items-center gap-3 bg-pink-50 p-2 rounded-xl border border-pink-100"
                  >
                    <div className="bg-white/70 rounded-lg p-1">
                      <img
                        src={candy.imageUrl}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <span className="flex-1 text-sm text-gray-700">{candy.name}</span>
                    <button
                      onClick={() => handleRemoveCandy(candy.cartId)}
                      className="bg-pink-200 w-8 h-8 rounded-lg hover:bg-pink-300 cursor-pointer transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>

              <button
                disabled={selectedCandies.length !== selectedSize.candyLimit}
                onClick={handleCheckout}
                className="
                  w-full mt-6 py-3 rounded-xl
                  text-white font-bold text-lg
                  bg-gradient-to-r from-pink-400 to-pink-500
                  hover:from-pink-500 hover:to-pink-600
                  disabled:from-gray-300 disabled:to-gray-300
                  cursor-pointer transition-all
                "
              >
                {selectedCandies.length === selectedSize.candyLimit
                  ? `My Sweet Box is Ready! 🎁 – ฿${selectedSize.price} `
                  : `Add ${selectedSize.candyLimit - selectedCandies.length} more sweets`}
              </button>
            </>
          )}
        </div>
      </aside>

      
      {selectedSize && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-pink-200 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] z-50">
          <div className="bg-gradient-to-r from-pink-300 to-pink-400 px-4 py-2 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/30 rounded-lg p-1.5">
                <img
                  src={selectedSize.image}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-sm">{selectedSize.name}</h3>
                <p className="text-xs">
                  {selectedCandies.length}/{selectedSize.candyLimit} sweets
                </p>
              </div>
            </div>
            <span className="text-lg font-bold">฿{selectedSize.price}</span>
          </div>

          <div className="p-3 max-h-[180px] overflow-y-auto">
            {selectedCandies.length === 0 ? (
              <p className="text-center text-gray-400 text-sm py-4">
                Start picking your sweets! 🍬
              </p>
            ) : (
              <div className="space-y-2">
                {selectedCandies.map((candy) => (
                  <div
                    key={candy.cartId}
                    className="flex items-center gap-2 bg-pink-50 p-2 rounded-xl border border-pink-100"
                  >
                    <div className="bg-white/70 rounded-lg p-1">
                      <img
                        src={candy.imageUrl}
                        className="w-7 h-7 object-contain"
                      />
                    </div>
                    <span className="flex-1 text-sm text-gray-700">{candy.name}</span>
                    <button
                      onClick={() => handleRemoveCandy(candy.cartId)}
                      className="bg-pink-200 w-7 h-7 rounded-lg hover:bg-pink-300 cursor-pointer text-sm transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-3 pt-0 flex gap-2">
            <button
              onClick={handleCancel}
              className="flex-1 py-2.5 rounded-xl border-2 border-pink-400 text-pink-600 font-bold hover:bg-pink-100 cursor-pointer text-sm transition-colors"
            >
              Restart box 📦
            </button>
            <button
              disabled={selectedCandies.length !== selectedSize.candyLimit}
              onClick={handleCheckout}
              className="
                flex-[2] py-2.5 rounded-xl
                text-white font-bold text-sm
                bg-gradient-to-r from-pink-400 to-pink-500
                hover:from-pink-500 hover:to-pink-600
                disabled:from-gray-300 disabled:to-gray-300
                cursor-pointer transition-all
              "
            >
              {selectedCandies.length === selectedSize.candyLimit
                ? `My Sweet Box is Ready!  – ฿${selectedSize.price} 🎁`
                : `Add ${selectedSize.candyLimit - selectedCandies.length} more`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

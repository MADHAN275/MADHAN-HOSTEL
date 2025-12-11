"use client";

import { motion } from "framer-motion";

const menuData = [
  {
    day: "Monday",
    breakfast: "Idli, Sambar, Chutney, Boiled Egg / Egg Podimas",
    lunch: "Rice, Sambar, Potato Poriyal, Rasam, Curd, Chicken Gravy",
    snacks: "Sundal, Egg Puff",
    dinner: "Chapati, Kurma, Egg Curry",
  },
  {
    day: "Tuesday",
    breakfast: "Pongal, Vada, Chutney, Omelette",
    lunch: "Rice, Kara Kulambu, Cabbage Poriyal, Rasam, Buttermilk, Fish Fry",
    snacks: "Puff, Chicken Puff",
    dinner: "Lemon Rice, Appalam, Kesari, Egg Curry",
  },
  {
    day: "Wednesday",
    breakfast: "Poori, Masala, Chicken Saalna",
    lunch: "Rice, Dal, Beetroot Poriyal, Rasam, Curd, Chicken Fry",
    snacks: "Bonda / Pakoda, Egg Bonda",
    dinner: "Veg Biryani, Onion Raita, Chicken 65",
  },
  {
    day: "Thursday",
    breakfast: "Dosa, Sambar, Chutney, Omelette",
    lunch: "Rice, Vatha Kulambu, Beans Poriyal, Rasam, Buttermilk, Egg Masala",
    snacks: "Murukku / Mixture, Egg Roll",
    dinner: "Chapati, Channa Masala, Chicken Kurma",
  },
  {
    day: "Friday",
    breakfast: "Upma, Coconut Chutney, Banana, Egg Bhurji",
    lunch: "Rice, Mor Kulambu, Carrot Poriyal, Rasam, Curd, Fish Curry",
    snacks: "Bajji, Chicken Sandwich",
    dinner: "Tomato Rice, Appalam, Egg Curry",
  },
  {
    day: "Saturday",
    breakfast: "Idiyappam, Coconut Milk, Chicken Stew",
    lunch: "Sambar, Poriyal, Kootu, Rasam, Papad, Payasam, Chicken Curry",
    snacks: "Samosa, Chicken Samosa",
    dinner: "Chapati / Rice, Mixed Veg, Egg Curry / Chicken Gravy",
  },
  {
    day: "Sunday",
    breakfast: "Masala Dosa, Sambar, Chutney, Omelette",
    lunch: "Rice, Sambar, Poriyal, Rasam, Curd, Chicken Gravy + Fry",
    snacks: "Sweet Corn / Fruits, Egg Puff",
    dinner: "Idli / Dosa, Chutney, Chicken Gravy",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function MessMenu() {
  return (
    <div className="p-8 w-full max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
          MESS MENU
        </h1>
        <p className="text-xl text-gray-400">DECEMBER SPECIAL</p>
        <div className="mt-2 inline-block px-4 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium">
          Veg & Non-Veg Available
        </div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {menuData.map((dayMenu) => (
          <motion.div
            key={dayMenu.day}
            variants={item}
            className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative p-6 space-y-4">
              <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2 group-hover:text-purple-400 transition-colors">
                {dayMenu.day}
              </h2>

              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Breakfast</div>
                  <p className="text-sm text-gray-300 leading-relaxed">{dayMenu.breakfast}</p>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-semibold text-pink-400 uppercase tracking-wider">Lunch</div>
                  <p className="text-sm text-gray-300 leading-relaxed">{dayMenu.lunch}</p>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-semibold text-orange-400 uppercase tracking-wider">Evening Snacks</div>
                  <p className="text-sm text-gray-300 leading-relaxed">{dayMenu.snacks}</p>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Dinner</div>
                  <p className="text-sm text-gray-300 leading-relaxed">{dayMenu.dinner}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

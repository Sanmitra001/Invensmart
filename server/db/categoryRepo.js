import db from "../connection/db.js";

import redisClint from "../connection/redisConnect.js";

const addCategory = async (CategoryName, Description) => {
  const [rows] = await db.execute(
    "INSERT INTO categories(CategoryName , Description) VALUES(?,?)",
    [CategoryName, Description]
  );
  const [output] = await db.query(
    "SELECT * FROM categories WHERE CategoryID = ?",
    [rows.insertId]
  );
  //  output
  const newCatagory = {
    CategoryName: output[0].CategoryName,
    description: output[0].Description,
  };

  // set the cashe and update
  await redisClint.set(
    `categoryCache:${rows.insertId}`,
    JSON.stringify(newCatagory),
    {
      EX: 900, // Expiration time in seconds
    }
  );
  return rows.insertId;
};

const getCtagoryById = async (id) => {
  const cacheKey = `categoryCache:${id}`;

  // Check if data is in Redis cache
  const cachedData = await redisClint.get(cacheKey);
  // If data is in cache, return it

  if (cachedData) {
    console.log("Fetching from cache...");
    return JSON.parse(cachedData);
  }
  const userdata = await getUserFromDb(id);

  if (userdata) {
    await redisClint.set(cacheKey, JSON.stringify(userdata), {
      EX: 900, // Expiration time in seconds
    });
    console.log("Fetching from database and storing in cache...");
  }
  return userdata;
};

async function getUserFromDb(id) {
  const [rows] = await db.execute(
    "SELECT * from  categories where CategoryID= ?",
    [id]
  );
  return rows.length > 0 ? rows[0] : null;
}

export default {
  addCategory,
  getCtagoryById,
};

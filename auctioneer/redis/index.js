import { createClient } from "redis";

const getRedisClient = async () => {
  const redisClient = createClient({ url: "redis://redis:6379" });
  redisClient.on("connect", () => console.log("Redis Client connected!"));
  redisClient.on("error", (err) => console.log("Redis Client Error", err));
  await redisClient.connect();
  return redisClient;
};

const redisClient = await getRedisClient();
export default redisClient;

// import { residential } from "./routes/fetchRoutes";

// export const searchProperties = async (inputValue) => {
//   const response = await fetch(
//     residential.search.replaceAll("$value", inputValue),
//     {
//       method: "GET",
//       headers: {
//         Authorization: process.env.BEARER_TOKEN_FOR_API,
//       },
//     }
//   );
//   const searchedProperties = await response.json();
//   console.log(searchProperties);
//   return searchedProperties.results;
// };

export const authFetch = async (url) => {
  try {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2ZW5kb3IvdHJyZWIvNTYyNiIsImF1ZCI6IkFtcFVzZXJzUHJkIiwicm9sZXMiOlsiQW1wVmVuZG9yIl0sImlzcyI6InByb2QuYW1wcmUuY2EiLCJleHAiOjI1MzQwMjMwMDc5OSwiaWF0IjoxNzM0NzEzNzEyLCJzdWJqZWN0VHlwZSI6InZlbmRvciIsInN1YmplY3RLZXkiOiI1NjI2IiwianRpIjoiZTQ5ZmYyNjY5N2E5YWFlZSIsImN1c3RvbWVyTmFtZSI6InRycmViIn0.6qvzbyO-NvwTKwKj2mD4dZvtuJeQrDUU8xmanTuZFnQ`,
      },
      // cache: "no-store",
    };
    const response = await fetch(url, options);
    return response;
  } catch (err) {
    console.log(err);
  }
};

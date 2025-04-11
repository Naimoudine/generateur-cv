import { CV } from "./pages/Resumes/Resumes";

export const saveCv = async (cv: CV) => {
  console.log(cv);
  const response = await fetch(`http://localhost:5000/api/cv/${cv.id}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(cv),
  });

  const data = await response.json();

  if (response.status !== 201 && response.status !== 200) {
    throw new Error(data.message || "Failed to save Cv");
  }

  return data;
};

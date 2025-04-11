import { CV } from "./pages/Resumes/Resumes";

export const getAllCv = async () => {
  const response = await fetch(`http://localhost:5000/api/cv`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch all cv");
  }
  return data;
};

export const getCvById = async (id: number) => {
  const response = await fetch(`http://localhost:5000/api/cv/${id}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch all cv");
  }
  console.log(data);

  return data;
};

export const saveCv = async (cv: CV) => {
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

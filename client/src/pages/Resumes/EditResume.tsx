import { useState } from "react";
import ResumeForm, { FormDataType } from "../../components/Form/ResumeForm";
import { templates } from "../../components/templates/templates";

export default function EditResume() {
  const [test, setTest] = useState({});

  const fecthGenerateCv = async (userData: FormDataType) => {
    try {
      const response = await fetch(`http://localhose:5000/cv/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error("Failed to generate cv" || response?.error);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
      }
    }
  };

  const handleGetUserData = (userData: FormDataType) => {
    setTest(userData);
  };

  const TemplateComponent = templates["template1"];

  return (
    <div className="flex gap-4 h-full">
      <ResumeForm
        handleForm={fecthGenerateCv}
        handleGetUserData={handleGetUserData}
      />
      <div className="w-1/2 bg-gray-200 p-4 h-full">
        <TemplateComponent userData={test} />
      </div>
    </div>
  );
}

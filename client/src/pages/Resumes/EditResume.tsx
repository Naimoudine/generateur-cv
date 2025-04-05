import { useEffect, useState } from "react";
import ResumeForm from "../../components/Form/ResumeForm";
import { templates } from "../../components/templates/templates";
import { useFormData } from "@/hooks/useFormData";

export default function EditResume() {
  const [loading, setLoading] = useState<boolean>(false);

  const { formData } = useFormData();

  const TemplateComponent = templates["template1"];

  const fetchGenerateCv = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/cv/generate`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ templateName: "original", userData: formData }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate cv");
      }

      setLoading(false);

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "generated.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      return null;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  useEffect(() => {
    console.log(loading);
  }, [loading]);
  return (
    <div className="flex gap-4 h-full">
      <ResumeForm generateCv={fetchGenerateCv} loading={loading} />
      <div className="w-1/2 bg-gray-200 p-4 h-full overflow-y-scroll">
        <TemplateComponent formData={formData} />
      </div>
    </div>
  );
}

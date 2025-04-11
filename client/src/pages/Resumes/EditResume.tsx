import { useEffect, useRef, useState } from "react";
import ResumeForm from "../../components/Form/ResumeForm";
import { templates } from "../../components/templates/templates";
import { useFormData } from "@/hooks/useFormData";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { getCvById, saveCv } from "@/api";
import { CV } from "./Resumes";

export default function EditResume() {
  const [loading, setLoading] = useState<boolean>(false);

  const { formData, setFormData } = useFormData();
  const formDataRef = useRef(formData);

  const cv = useLoaderData() as CV;

  const TemplateComponent = templates["template1"];

  const fetchGenerateCv = async () => {
    try {
      setLoading(true);
      console.log(import.meta.env.API_URL);
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
    if (cv?.content) {
      setFormData(cv.content);
    }
  }, [cv]);

  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await saveCv({ ...cv, content: formDataRef.current });
      } catch (error) {
        console.error("Auto-save failed:", error);
      }
    }, 300000);

    return () => clearInterval(interval);
  }, [cv.id]);

  return (
    <div className="flex gap-4 h-full">
      <ResumeForm
        generateCv={fetchGenerateCv}
        loading={loading}
        cv={cv}
        ref={formDataRef}
      />
      <div className="w-1/2 bg-gray-200 p-4 h-full overflow-y-scroll">
        <TemplateComponent formData={formData} height="h-[1123px]" />
      </div>
    </div>
  );
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;

  if (!id) {
    throw new Response("Missing CV ID", { status: 400 });
  }

  const numericId = Number(id);

  if (isNaN(numericId)) {
    throw new Response("Invalid CV ID", { status: 400 });
  }

  const cv = await getCvById(numericId);
  return cv;
};

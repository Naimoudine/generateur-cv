import ResumeForm from "../../components/Form/ResumeForm";
import { templates } from "../../components/templates/templates";
import { useFormData } from "@/hooks/useFormData";

export default function EditResume() {
  const { formData } = useFormData();

  const TemplateComponent = templates["template1"];

  // const fetchGenerateCv = () => {
  //   try {
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       throw new Error(error.message);
  //     }
  //   }
  // };

  return (
    <div className="flex gap-4 h-full">
      <ResumeForm />
      <div className="w-1/2 bg-gray-200 p-4 h-full overflow-y-scroll">
        <TemplateComponent formData={formData} />
      </div>
    </div>
  );
}

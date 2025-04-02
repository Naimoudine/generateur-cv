import { FormDataType } from "@/components/Form/ResumeForm";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import Input from "../Input";
import { useRef } from "react";

type Props = {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
};

export default function Skills({ formData, setFormData }: Props) {
  const skillRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-4 mt-2">
      <div className="flex flex-wrap gap-4 items-center">
        {formData.skills.map((skill) => (
          <div
            key={skill}
            className="flex gap-2 items-center border border-gray-200 rounded-sm w-fit px-2 py-1"
          >
            <p>{skill}</p>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => {
                setFormData((prevForm) => ({
                  ...prevForm,
                  skills: prevForm.skills.filter((s) => s !== skill),
                }));
              }}
            >
              <Trash />
            </Button>
          </div>
        ))}
      </div>
      <div className="flex items-end justify-between gap-8">
        <Input label="Compétence" id="skill" type="text" ref={skillRef} />
        <Button
          type="button"
          onClick={() => {
            const skillValue = skillRef.current?.value ?? "";
            if (
              skillValue.trim() &&
              !formData.skills.some(
                (s) => s.toLowerCase() === skillRef.current?.value.toLowerCase()
              )
            ) {
              setFormData((prevForm) => ({
                ...prevForm,
                skills: [...(prevForm.skills || []), skillValue],
              }));
            }
            if (skillRef.current) {
              skillRef.current.value = ""; // Reset the value of the input
            }
          }}
        >
          Ajouter
        </Button>
      </div>
    </div>
  );
}

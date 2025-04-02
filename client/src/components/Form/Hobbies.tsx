import { useRef } from "react";
import Input from "../Input";
import { FormDataType } from "@/components/Form/ResumeForm";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

type Props = {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
};

export default function Hobbies({ formData, setFormData }: Props) {
  const hobbyRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-4 mt-2">
      <div className="flex flex-wrap gap-4 items-center">
        {formData.hobbies.map((hobby) => (
          <div
            key={hobby}
            className="flex gap-2 items-center border border-gray-200 rounded-sm w-fit px-2 py-1"
          >
            <p>{hobby}</p>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => {
                setFormData((prevForm) => ({
                  ...prevForm,
                  hobbies: prevForm.hobbies.filter((h) => h !== hobby),
                }));
              }}
            >
              <Trash />
            </Button>
          </div>
        ))}
      </div>
      <div className="flex items-end justify-between gap-8">
        <Input
          label="Centre d'intérêt"
          id="hobbie"
          type="text"
          ref={hobbyRef}
        />
        <Button
          type="button"
          onClick={() => {
            const hobbyValue = hobbyRef.current?.value ?? "";
            if (
              hobbyValue.trim() &&
              !formData.hobbies.some(
                (h) => h.toLowerCase() === hobbyRef.current?.value.toLowerCase()
              )
            ) {
              setFormData((prevForm) => ({
                ...prevForm,
                hobbies: [...prevForm.hobbies, hobbyValue],
              }));
            }
            if (hobbyRef.current) {
              hobbyRef.current.value = ""; // Reset the value of the input
            }
          }}
        >
          Ajouter
        </Button>
      </div>
    </div>
  );
}

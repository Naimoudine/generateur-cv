import { useRef } from "react";
import Input from "../Input";
import { FormDataType } from "@/components/Form/ResumeForm";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

type Props = {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
};

export default function Languages({ formData, setFormData }: Props) {
  const languageRef = useRef<HTMLInputElement>(null);
  const languageLvlRef = useRef<HTMLSelectElement>(null);

  return (
    <div className="flex flex-col gap-4 mt-2">
      <div className="flex flex-wrap gap-4 items-center">
        {formData.languages.map((el, i) => (
          <div
            key={i}
            className="flex gap-2 items-center border border-gray-200 rounded-sm w-fit px-2 py-1"
          >
            <p>
              {el.language}{" "}
              <span className="text-gray-500/80 font-semibold">
                {el.level.toUpperCase()}
              </span>
            </p>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => {
                setFormData((prevForm) => ({
                  ...prevForm,
                  languages: prevForm.languages.filter((l) => l !== el),
                }));
              }}
            >
              <Trash />
            </Button>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between gap-8">
        <Input label="Langue" id="Language" ref={languageRef} />
        <div className="w-1/2">
          <select
            className="w-full"
            name="level"
            id="level"
            ref={languageLvlRef}
          >
            <option value="">Niveau</option>
            <option value="a1">A1</option>
            <option value="a2">A2</option>
            <option value="b1">B1</option>
            <option value="b2">B2</option>
            <option value="c1">C1</option>
            <option value="c2">C2</option>
            <option value="native">Maternelle</option>
          </select>
        </div>
        <Button
          type="button"
          onClick={() => {
            const languageValue = languageRef.current?.value ?? "";
            const languageLvlValue = languageLvlRef.current?.value ?? "";
            if (
              languageValue.trim() &&
              !formData.languages.some(
                (el) =>
                  el.language.toLowerCase() ===
                  languageRef.current?.value.toLowerCase()
              )
            ) {
              setFormData((prevForm) => ({
                ...prevForm,
                languages: [
                  ...prevForm.languages,
                  {
                    language: languageValue,
                    level: languageLvlValue,
                  },
                ],
              }));
            }
            if (languageRef.current) {
              languageRef.current.value = ""; // Reset the value of the input
            }
          }}
        >
          Ajouter
        </Button>
      </div>
    </div>
  );
}

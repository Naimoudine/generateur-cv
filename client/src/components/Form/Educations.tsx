import { EducationType, useFormData } from "@/hooks/useFormData";
import Input from "../Input";
import { Button } from "../ui/button";
import { Pen, Trash } from "lucide-react";

type Props = {
  educations: EducationType[];
  education: EducationType;
  handleEducationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  saveEducation: () => void;
  editEducation: (id: number) => void;
  editId: number;
};

export default function Educations({
  educations,
  education,
  handleEducationChange,
  saveEducation,
  editEducation,
  editId,
}: Props) {
  const { deleteEducation } = useFormData();

  return (
    <div className="flex flex-col gap-4 mt-2">
      {educations.map((el) => (
        <div
          key={el.id}
          className="flex items-center justify-between px-4 py-2 border-2 border-gray-600 rounded-sm"
        >
          <p>{el.title}</p>

          <div className="flex items-center gap-4">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => {
                if (el.id) deleteEducation(el.id);
              }}
            >
              <Trash />
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => {
                if (el.id) editEducation(el.id);
              }}
            >
              <Pen />
            </Button>
          </div>
        </div>
      ))}
      <div className="flex flex-col gap-4 mt-2">
        <Input
          label="Titre"
          id="title"
          value={education?.title}
          onChange={handleEducationChange}
        />
        <div className="flex items-center justify-between gap-8">
          <Input
            label="Etablissement"
            id="establishment"
            type="text"
            value={education?.establishment}
            onChange={handleEducationChange}
          />
          <Input
            label="Ville"
            id="city"
            type="text"
            value={education?.city}
            onChange={handleEducationChange}
          />
        </div>
        <div className="flex items-center justify-between gap-8">
          <Input
            label="Date de début"
            id="debutDate"
            type="month"
            value={education?.debutDate}
            onChange={handleEducationChange}
          />
          <Input
            label="Date de fin"
            id="endDate"
            type="month"
            value={education?.endDate}
            onChange={handleEducationChange}
          />
        </div>
        <Input
          label="Description"
          id="description"
          textarea
          value={education?.description}
          onChange={handleEducationChange}
        />
        <Button type="button" onClick={saveEducation}>
          {editId ? "Editer" : "Ajouter"}
        </Button>
      </div>
    </div>
  );
}

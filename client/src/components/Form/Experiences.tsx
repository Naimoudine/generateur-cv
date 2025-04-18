import { ExperienceType, useFormData } from "@/hooks/useFormData";
import Input from "../Input";
import { Button } from "../ui/button";
import { Pen, Trash } from "lucide-react";

type Props = {
  experiences: ExperienceType[];
  experience: ExperienceType;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  saveExperience: () => void;
  editExperience: (id: number) => void;
  experienceId: number;
};
export default function Experiences({
  experiences,
  experience,
  onChange,
  saveExperience,
  editExperience,
  experienceId,
}: Props) {
  const { deleteExperience } = useFormData();

  return (
    <div className="flex flex-col gap-4 mt-2">
      {experiences.map((el) => (
        <div
          key={el.id}
          className="flex items-center justify-between px-4 py-2 border-2 border-gray-400 rounded-sm"
        >
          <p>{el.job}</p>
          <div className="flex items-center gap-4">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => {
                if (el.id) deleteExperience(el.id);
              }}
            >
              <Trash />
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => {
                if (el.id) editExperience(el.id);
              }}
            >
              <Pen />
            </Button>
          </div>
        </div>
      ))}
      <div className="flex flex-col gap-4 mt-2">
        <Input
          label="Poste"
          id="job"
          type="text"
          value={experience?.job}
          onChange={onChange}
        />
        <div className="flex items-center justify-between gap-8">
          <Input
            label="Employeur"
            id="employer"
            type="text"
            value={experience?.employer}
            onChange={onChange}
          />
          <Input
            label="Ville"
            id="city"
            type="text"
            value={experience?.city}
            onChange={onChange}
          />
        </div>
        <div className="flex items-center justify-between gap-8">
          <Input
            label="Date de début"
            id="debutDate"
            type="month"
            value={experience?.debutDate}
            onChange={onChange}
          />
          <Input
            label="Date de fin"
            id="endDate"
            type="month"
            value={experience?.endDate}
            onChange={onChange}
          />
        </div>
        <Input
          label="Description"
          id="description"
          textarea
          value={experience.description}
          onChange={onChange}
        />
        <Button type="button" onClick={saveExperience}>
          {experienceId ? "Editer" : "Ajouter"}
        </Button>
      </div>
    </div>
  );
}

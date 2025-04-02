import Educations from "@/components/Form/Educations";
import Experiences from "@/components/Form/Experiences";
import Hobbies from "@/components/Form/Hobbies";
import Languages from "@/components/Form/Languages";
import Personal from "@/components/Form/Personal";
import Profil from "@/components/Form/Profil";
import Skills from "@/components/Form/Skills";
import { Button } from "@/components/ui/button";
import { useFormData } from "@/hooks/useFormData";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const sections = [
  { id: "personal", title: "Information personnelles" },
  { id: "profile", title: "Profil" },
  { id: "experiences", title: "Experience professionnelle" },
  { id: "education", title: "Formation" },
  { id: "skills", title: "Compétences" },
  { id: "languages", title: "Langues" },
  { id: "hobbies", title: "Centre d'intérêts" },
];

export default function ResumeForm() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const {
    formData,
    setFormData,
    handleChange,
    educationId,
    education,
    handleEducationChange,
    saveEducation,
    editEducation,
    experienceId,
    experience,
    handleExperienceChange,
    saveExperience,
    editExperience,
  } = useFormData();

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <form className="w-1/2 px-4 overflow-x-hidden">
      {sections.map((section) => (
        <div key={section.id} className="border-b border-gray-200 py-4 px-8">
          <article className="flex items-center justify-between">
            <h2>{section.title}</h2>
            <Button
              variant="outline"
              size="icon"
              type="button"
              onClick={() => toggleSection(section.id)}
            >
              {openSection === section.id ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </article>
          {openSection === section.id && (
            <div className="flex flex-col gap-4">
              {section.id === "personal" && (
                <Personal
                  personal={formData.personal}
                  onChange={handleChange}
                />
              )}
              {section.id === "profile" && (
                <Profil profil={formData.profile} onChange={handleChange} />
              )}
              {section.id === "experiences" && (
                <Experiences
                  experiences={formData.experiences}
                  experience={experience}
                  onChange={handleExperienceChange}
                  saveExperience={saveExperience}
                  editExperience={editExperience}
                  experienceId={experienceId!}
                />
              )}
              {section.id === "education" && (
                <Educations
                  educations={formData.educations}
                  education={education}
                  handleEducationChange={handleEducationChange}
                  saveEducation={saveEducation}
                  editEducation={editEducation}
                  editId={educationId!}
                />
              )}
              {section.id === "skills" && (
                <Skills formData={formData} setFormData={setFormData} />
              )}
              {section.id === "languages" && (
                <Languages formData={formData} setFormData={setFormData} />
              )}
              {section.id === "hobbies" && (
                <Hobbies formData={formData} setFormData={setFormData} />
              )}
            </div>
          )}
        </div>
      ))}
      <div className="mt-4 flex justify-end mb-4">
        <Button
          className="w-fit"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          submit
        </Button>
      </div>
    </form>
  );
}

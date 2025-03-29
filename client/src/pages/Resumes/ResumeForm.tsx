import Educations from "@/components/Form/Educations";
import Experiences from "@/components/Form/Experiences";
import Hobbies from "@/components/Form/Hobbies";
import Languages from "@/components/Form/Languages";
import Personal from "@/components/Form/Personal";
import Profil from "@/components/Form/Profil";
import Skills from "@/components/Form/Skills";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRef, useState } from "react";

export type EducationType = {
  id?: number | undefined;
  title: string;
  establishment: string;
  city: string;
  debutDate: string;
  endDate: string;
  description: string;
};

export type ExperienceType = {
  id?: number | undefined;
  job: string;
  employer: string;
  city: string;
  debutDate: string;
  endDate: string;
  description: string;
};

export type FormDataType = {
  personal: {
    firstname: string;
    lastname: string;
    email: string;
    address: string;
    phone: string;
    jobTitle: string;
    city: string;
    zip: number | undefined;
  };
  profile: string;
  experiences: ExperienceType[];
  educations: EducationType[];
  skills: string[];
  languages: { language: string; level: string }[];
  hobbies: string[];
};

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
  const [formData, setFormData] = useState<FormDataType>({
    personal: {
      firstname: "",
      lastname: "",
      email: "",
      address: "",
      phone: "",
      jobTitle: "",
      city: "",
      zip: undefined,
    },
    profile: "",
    experiences: [],
    educations: [],
    skills: [],
    languages: [],
    hobbies: [],
  });
  const [education, setEducation] = useState<EducationType>({
    title: "",
    establishment: "",
    city: "",
    debutDate: "",
    endDate: "",
    description: "",
  });
  const [experience, setExperience] = useState({
    job: "",
    employer: "",
    city: "",
    debutDate: "",
    endDate: "",
    description: "",
  });
  const [educationId, setEducationId] = useState<number | null>(null);
  const [experienceId, setExperienceId] = useState<number | null>(null);

  const educationRef = useRef<EducationType>({
    title: "",
    establishment: "",
    city: "",
    debutDate: "",
    endDate: "",
    description: "",
  });

  const experienceRef = useRef<ExperienceType>({
    job: "",
    employer: "",
    city: "",
    debutDate: "",
    endDate: "",
    description: "",
  });

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  const handleChange = (section: string, field: string, value: string) => {
    if (section === "profile") {
      console.log(value);
      setFormData({ ...formData, ["profile"]: value });
    } else {
      setFormData({
        ...formData,
        [section]: { ...formData[section], [field]: value },
      });
    }
  };

  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEducation((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    educationRef.current[e.target.name as keyof EducationType] = e.target.value;
  };

  const saveEducation = () => {
    if (educationId !== null) {
      setFormData((prevForm) => ({
        ...prevForm,
        educations: prevForm.educations.map((edu) =>
          edu.id === educationId ? { ...education, id: educationId } : edu
        ),
      }));

      setEducationId(null);
    } else {
      setFormData((prevForm) => ({
        ...prevForm,
        educations: [
          ...prevForm.educations,
          { ...education, id: Math.random() },
        ],
      }));
    }

    setEducation({
      title: "",
      establishment: "",
      city: "",
      debutDate: "",
      endDate: "",
      description: "",
    });
  };

  const editEducation = (id: number) => {
    const foundEducation = { ...formData.educations.find((e) => e.id === id) };
    if (foundEducation) {
      setEducation(foundEducation as EducationType);
      setEducationId(id);
    }
  };

  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExperience((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    experienceRef.current[e.target.name as keyof ExperienceType] =
      e.target.value;
  };

  const saveExperience = () => {
    if (experienceId !== null) {
      setFormData((prevForm) => ({
        ...prevForm,
        experiences: prevForm.experiences.map((exp) =>
          exp.id === experienceId ? { ...experience, id: experienceId } : exp
        ),
      }));

      setExperienceId(null);
    } else {
      setFormData((prevForm) => ({
        ...prevForm,
        experiences: [
          ...prevForm.experiences,
          { ...experienceRef.current, id: Math.random() },
        ],
      }));
    }

    setExperience({
      job: "",
      employer: "",
      city: "",
      debutDate: "",
      endDate: "",
      description: "",
    });
  };

  const editExperience = (id: number) => {
    const foundExperience = {
      ...formData.experiences.find((e) => e.id === id),
    };
    if (foundExperience) {
      setExperience(foundExperience as ExperienceType);
      setExperienceId(id);
    }
  };

  return (
    <form className="w-1/2">
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
      <div className="mt-4 flex justify-end">
        <Button
          className="w-fit"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            console.log(formData);
          }}
        >
          submit
        </Button>
      </div>
    </form>
  );
}

import { createContext, useContext, useRef, useState, ReactNode } from "react";

export type EducationType = {
  id?: number;
  title: string;
  establishment: string;
  city: string;
  debutDate: string;
  endDate: string;
  description: string;
};

export type ExperienceType = {
  id?: number;
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

interface FormDataContextType {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  handleChange: (section: string, field: string, value: string) => void;
  handleEducationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  educationId: number | null;
  education: EducationType;
  saveEducation: () => void;
  editEducation: (id: number) => void;
  experienceId: number | null;
  experience: ExperienceType;
  handleExperienceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  saveExperience: () => void;
  editExperience: (id: number) => void;
}

export const FormDataContext = createContext<FormDataContextType | undefined>(
  undefined
);

export const FormDataProvider = ({ children }: { children: ReactNode }) => {
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

  const [experience, setExperience] = useState<ExperienceType>({
    job: "",
    employer: "",
    city: "",
    debutDate: "",
    endDate: "",
    description: "",
  });

  const [educationId, setEducationId] = useState<number | null>(null);
  const [experienceId, setExperienceId] = useState<number | null>(null);

  const educationRef = useRef<EducationType>(education);
  const experienceRef = useRef<ExperienceType>(experience);

  const handleChange = (section: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]:
        section === "profile"
          ? value
          : {
              ...(prev[section as keyof FormDataType] as Record<string, any>),
              [field]: value,
            },
    }));
  };

  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name in education) {
      setEducation((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Mise à jour du ref en forçant TypeScript à accepter le bon type
      educationRef.current[name as keyof EducationType] = value as never;
    }
  };

  const saveEducation = () => {
    setFormData((prevForm) => ({
      ...prevForm,
      educations:
        educationId !== null
          ? prevForm.educations.map((edu) =>
              edu.id === educationId ? { ...education, id: educationId } : edu
            )
          : [...prevForm.educations, { ...education, id: Math.random() }],
    }));
    setEducationId(null);
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
    const foundEducation = formData.educations.find((e) => e.id === id);
    if (foundEducation) {
      setEducation(foundEducation);
      setEducationId(id);
    }
  };

  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name in experience) {
      setExperience((prev) => ({
        ...prev,
        [name]: value,
      }));

      experienceRef.current[name as keyof ExperienceType] = value as never;
    }
  };

  const saveExperience = () => {
    setFormData((prevForm) => ({
      ...prevForm,
      experiences:
        experienceId !== null
          ? prevForm.experiences.map((exp) =>
              exp.id === experienceId
                ? { ...experience, id: experienceId }
                : exp
            )
          : [...prevForm.experiences, { ...experience, id: Math.random() }],
    }));
    setExperienceId(null);
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
    const foundExperience = formData.experiences.find((e) => e.id === id);
    if (foundExperience) {
      setExperience(foundExperience);
      setExperienceId(id);
    }
  };

  const formDataCtx: FormDataContextType = {
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
  };

  return (
    <FormDataContext.Provider value={formDataCtx}>
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormData = () => {
  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error(
      "useFormData doit être utilisé à l'intérieur d'un FormDataProvider"
    );
  }
  return context;
};

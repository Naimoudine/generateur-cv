import CustomBtn from "@/components/CustomBtn";
import { templates } from "@/components/templates/templates";
import { useFormData } from "@/hooks/useFormData";
import { useState } from "react";
import { Link } from "react-router-dom";

export interface CV {
  id: number;
  title: string;
}

export default function Resumes() {
  const [cvs, setCvs] = useState<CV[]>([]);

  const handleCreateCv = () => {
    if (cvs.length < 3) {
      setCvs((prevState) => [
        ...prevState,
        { id: Math.random(), title: "New cv" },
      ]);
    }
  };

  const handeUpdateCv = (cv: CV, e: React.ChangeEvent<HTMLInputElement>) => {
    setCvs((prevState) => {
      const updateCvs = [...prevState];
      const currCvIndex = updateCvs.findIndex((c) => c.id === cv.id);
      if (currCvIndex > -1) {
        updateCvs[currCvIndex].title = e.target.value;
      }
      return updateCvs;
    });
  };

  const TemplateComponent = templates["template1"];
  const { formData } = useFormData();

  return (
    <section>
      <h2 className="mb-8">Curriculum Vitae</h2>
      <div className="flex flex-wrap items-center gap-16 ">
        <CustomBtn
          mode="dashed"
          className="border-gray-300"
          height="56"
          width="40"
          createBtn={handleCreateCv}
        >
          Créer un nouveau cv +
        </CustomBtn>
        {cvs.map((cv) => (
          <article>
            <Link to={`${cv.id}/edit`}>
              {/* <div className="h-56 w-40 shadow-xl rounded-sm mb-2" /> */}
              <TemplateComponent
                formData={formData}
                height="h-56"
                width="w-40"
                className="shadow-xl rounded-sm mb-2"
              />
            </Link>
            <input
              type="text"
              name="title"
              id="title"
              value={cv.title}
              onChange={(e) => handeUpdateCv(cv, e)}
            />
          </article>
        ))}
      </div>
    </section>
  );
}

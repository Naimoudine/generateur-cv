import { getAllCv, saveCv } from "@/api";
import CustomBtn from "@/components/CustomBtn";
import { templates } from "@/components/templates/templates";
import { FormDataType } from "@/hooks/useFormData";
import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

export interface CV {
  id?: number;
  title?: string;
  content?: FormDataType | null;
}

export default function Resumes() {
  const [cvs, setCvs] = useState<CV[]>([]);

  const fetchedCvs = useLoaderData() as CV[];

  const handleCreateCv = () => {
    if (cvs.length < 3) {
      setCvs((prevState) => [
        ...prevState,
        { id: Math.random(), title: "New cv", content: null },
      ]);
    }
  };

  const handeUpdateCv = (cv: CV, e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("event", e.target.value);
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

  useEffect(() => {
    if (fetchedCvs.length) {
      setCvs(fetchedCvs);
    }
  }, [fetchedCvs]);

  useEffect(() => {
    if (cvs.length) {
      const lastAdded = cvs[cvs.length - 1];

      const save = async () => {
        try {
          if (lastAdded) {
            await saveCv(lastAdded);
          }
        } catch (error) {
          console.error(error);
        }
      };

      save();
    }
  }, [cvs]);

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
          <article key={cv.id}>
            <Link to={`${cv.id}/edit`}>
              {/* <div className="h-56 w-40 shadow-xl rounded-sm mb-2" /> */}
              <TemplateComponent
                formData={cv.content!}
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

export const loader = async () => {
  try {
    const allCv = await getAllCv();
    return allCv;
  } catch (error) {
    console.error(error);
  }
};

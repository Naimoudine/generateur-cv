import { FormDataType } from "@/components/Form/ResumeForm";

type Props = {
  userData: FormDataType;
};

export default function OriginalTemplate({ userData }: Props) {
  const {
    personal,
    profile,
    experiences,
    educations,
    skills,
    languages,
    hobbies,
  } = userData;
  return (
    <div className="bg-white p-1 p-4">
      <h1 className="text-3xl font-bold text-blue-600">
        {personal?.firstname} {personal?.lastname}
      </h1>
      <p className="text-sm text-gray-700">
        <strong>Email:</strong> {personal?.email}
      </p>
      <p className="text-sm text-gray-700">
        <strong>Téléphone:</strong> {personal?.phone}
      </p>
      <p className="text-sm text-gray-700">
        <strong>Adresse:</strong> {personal?.address}
      </p>
      <p className="text-sm text-gray-700">
        <strong>Ville:</strong> {personal?.city}
      </p>
      <div className="mt-4">
        <p className="text-gray-700">
          <strong>{personal?.jobTitle}</strong>
        </p>
        <p className="text-gray-700">{profile}</p>
      </div>
      <div className="mt-4">
        <h2 className="text-lg text-gray-800">Expérience professionnelle</h2>
        <div className="border-l-4 border-blue-500 pl-4 mt-2">
          <div className="mb-4">
            <ul className="flex flex-col gap-2">
              {experiences?.map((experience) => (
                <li key={experience?.id}>
                  <h3 className="font-semibold">
                    {experience?.job} - {experience?.employer},{" "}
                    {experience?.city}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {experience?.debutDate} - {experience?.endDate}
                  </p>
                  <p className="text-sm text-gray-700">
                    {experience?.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-800">Formation</h2>
        <div className="border-l-4 border-blue-500 pl-4 mt-2">
          <div className="mb-4">
            <ul className="flex flex-col gap-2">
              {educations?.map((education) => (
                <li key={education?.id}>
                  <h3 className="font-semibold">
                    {education?.title} - {education?.establishment},{" "}
                    {education?.city}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {education?.debutDate} - {education?.endDate}
                  </p>
                  <p className="text-sm text-gray-700">
                    {education?.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-800">Compétences</h2>
        <ul className="flex flex-wrap gap-2 mt-2">
          {skills?.map((skill) => (
            <li
              key={skill}
              className="bg-blue-100 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h2 className="font-semibold text-gray-800">Langues</h2>
        <ul className="flex flex-wrap gap-2 mt-2">
          {languages?.map((el) => (
            <li
              key={el?.language}
              className="bg-blue-100 px-3 py-1 rounded-full text-sm"
            >
              {el?.language} - {el?.level}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h2 className="font-semibold text-gray-800">Centre d'intérêts</h2>
        <ul className="flex flex-wrap gap-2 mt-2">
          {hobbies?.map((hobbie) => (
            <li
              key={hobbie}
              className="bg-blue-100 px-3 py-1 rounded-full text-sm"
            >
              {hobbie}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

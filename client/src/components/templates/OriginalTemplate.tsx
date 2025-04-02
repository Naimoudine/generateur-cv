import { FormDataType } from "@/hooks/useFormData";

type Props = {
  formData: FormDataType;
};

export default function OriginalTemplate({ formData }: Props) {
  const {
    personal,
    profile,
    experiences,
    educations,
    skills,
    languages,
    hobbies,
  } = formData;

  return (
    <div className="bg-white p-1 p-4 h-full rounded-sm">
      {(personal.firstname || personal.lastname) && (
        <h1 className="text-3xl font-bold text-blue-600">
          {personal?.firstname} {personal?.lastname}
        </h1>
      )}

      <div className="my-2">
        {personal.email && (
          <p className="text-sm text-gray-700">
            <strong>Email:</strong> {personal?.email}
          </p>
        )}
        {personal.phone && (
          <p className="text-sm text-gray-700">
            <strong>Téléphone:</strong> {personal?.phone}
          </p>
        )}
        {personal.address && (
          <p className="text-sm text-gray-700">
            <strong>Adresse:</strong> {personal?.address}
          </p>
        )}
        {(personal.city || personal.city) && (
          <p className="text-sm text-gray-700">
            <strong>Ville:</strong> {personal?.city} {personal?.zip}
          </p>
        )}

        <div className="mt-4">
          {personal.jobTitle && (
            <p className="text-gray-700">{personal?.jobTitle}</p>
          )}
          {profile && <p className="text-gray-700 mt-2">{profile}</p>}
        </div>
      </div>

      {experiences.length ? (
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Expérience professionnelle
          </h2>
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
      ) : undefined}

      {educations.length ? (
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
      ) : undefined}

      {skills.length ? (
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
      ) : undefined}

      {languages.length ? (
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-gray-800">Langues</h2>
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
      ) : undefined}

      {hobbies.length ? (
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Centre d'intérêts
          </h2>
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
      ) : undefined}
    </div>
  );
}

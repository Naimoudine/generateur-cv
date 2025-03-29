import Input from "../Input";

type Props = {
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
  onChange: (section: string, field: string, value: string) => void;
};

export default function Personal({ personal, onChange }: Props) {
  return (
    <div className="flex flex-col gap-4 mt-2">
      <div className="flex items-center justify-between gap-8">
        <Input
          label="Prénom"
          id="firstname"
          type="text"
          value={personal.firstname}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange("personal", e.target.name, e.target.value)
          }
        />
        <Input
          label="Nom"
          id="lastname"
          type="text"
          value={personal.lastname}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange("personal", e.target.name, e.target.value)
          }
        />
      </div>
      <Input
        label="Métier recherché"
        id="jobTitle"
        type="text"
        value={personal.jobTitle}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange("personal", e.target.name, e.target.value)
        }
      />
      <div className="flex items-center justify-between gap-8">
        <Input
          label="Email"
          id="email"
          type="email"
          value={personal.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange("personal", e.target.name, e.target.value)
          }
        />
        <Input label="Téléphone" id="phone" type="phone" />
      </div>
      <Input
        label="Adresse"
        id="address"
        type="text"
        value={personal.address}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange("personal", e.target.name, e.target.value)
        }
      />
      <div className="flex items-center justify-between gap-8">
        <Input
          label="Code postal"
          id="zip"
          type="number"
          value={personal.zip}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange("personal", e.target.name, e.target.value)
          }
        />
        <Input
          label="Ville"
          id="city"
          type="text"
          value={personal.city}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange("personal", e.target.name, e.target.value)
          }
        />
      </div>
    </div>
  );
}

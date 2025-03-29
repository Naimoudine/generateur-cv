import Input from "../Input";

type Props = {
  profil: string;
  onChange: (section: string, filed: string, value: string) => void;
};

export default function Profil({ profil, onChange }: Props) {
  return (
    <div className="flex flex-col gap-4 mt-2">
      <Input
        label="Description"
        id="profile"
        textarea
        value={profil}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChange("profile", e.target.name, e.target.value);
        }}
      />
    </div>
  );
}

import clsxm from "@/utils/clsxm";
import { useFormContext } from "react-hook-form";

interface Option {
  id: string;
  title: string;
  description?: string;
}

interface SelectorProps {
  title: string;
  classNameTitle: string;
  options: Option[];
  name: string;
  defaultChecked?: boolean;
}

const Selector: React.FC<SelectorProps> = ({
  title,
  classNameTitle,
  options,
  name,
  defaultChecked,
}) => {
  const { register } = useFormContext();
  return (
    <div className="flex flex-col gap-4">
      <h3 className={classNameTitle}>{title}</h3>
      <div className="flex flex-col gap-3">
        {options.map((option, index) => (
          <label
            key={option.id}
            className="flex items-center gap-4 p-3 border rounded-lg cursor-pointer hover:shadow-md"
          >
            <input
              type="radio"
              value={option.id}
              {...register(name, {
                required: `لطفاً ${title} را انتخاب کنید.`,
              })}
              className="form-radio hidden peer"
              defaultChecked={defaultChecked && index === 0} // اولین گزینه به طور پیش‌فرض انتخاب شده است
            />
            <div
              className={clsxm(
                "w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center peer-checked:bg-green-500",
              )}
            >
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div>
              <p className="font-semibold">{option.title}</p>
              {option.description && (
                <p className="text-sm text-gray-600">{option.description}</p>
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Selector;

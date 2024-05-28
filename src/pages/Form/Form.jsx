import Input from '../../components/UI/Input/Input';

import { useDispatch } from 'react-redux';
import { addCropToBlockChain, initCrop, setFormData } from '../../redux/Crop/Slice';
import Window from '../../components/Interface/Window/Window';

const Form = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ name: name, value: value }));
  };

  const handleSubmit = () => {
    console.log('Submitting...');
    dispatch(addCropToBlockChain());
  };

  return (
    <div className="flex flex-col gap-4 w-full h-fit">
      <Window label="Form">
        <div className="p-4 h-auto flex flex-col gap-6">
          <p className="text-main-100/90 w-full">
            Enter your Crop Information or
            <span
              onClick={() => dispatch(initCrop())}
              className="underline text-main-100 cursor-pointer hover:text-main-400 ml-1"
            >
              init it here
            </span>
          </p>
          <form className="grid grid-cols-4 gap-x-2 gap-y-5 ">
            <div className="col-span-3">
              <Input
                // className="col-span-2"
                required={true}
                name="cropType"
                type="text"
                label="Crop Name"
                onChange={handleChange}
              />
            </div>
            <div className="col-span-1">
              <Input
                // className="col-span-2"
                required={true}
                name="noOfCrops"
                type="number"
                label="No."
                onChange={handleChange}
              />
            </div>
            <div className="col-span-4">
              <Input
                // className="col-span-2"
                required={true}
                name="plantingDate"
                type="date"
                label="Planting Date"
                onChange={handleChange}
              />
            </div>
            <div className="col-span-4">
              <Input
                // className="col-span-2"
                required={true}
                name="harvestDate"
                type="number"
                label="No. month to harvest"
                onChange={handleChange}
              />
            </div>
            <div className="col-span-4">
              <Input
                // className="col-span-2"
                required={true}
                name="fertilizers"
                type="text"
                label="Fertilizers"
                onChange={handleChange}
              />
            </div>
            <div className="col-span-4">
              <Input
                // className="col-span-2"
                required={true}
                name="pesticides"
                type="text"
                label="Pesticides"
                onChange={handleChange}
              />
            </div>
            <div className="col-span-4">
              <Input
                // className="col-span-2"
                required={true}
                name="diseases"
                type="text"
                label="Diseases"
                onChange={handleChange}
              />
            </div>
            <div className="col-span-4">
              <Input
                // className="col-span-2"
                required={true}
                name="additionalInfo"
                type="text"
                label="Additional Information"
                onChange={handleChange}
              />
            </div>
          </form>
          <button
            onClick={handleSubmit}
            className="
                    bg-main-100 rounded-md w-fit px-5 py-1 self-end
                    text-lg font-semibold font-mono text-primary-500
                    focus:outline-none
                    hover:bg-primary-400 hover:text-main-100
                    "
          >
            Publish
          </button>
        </div>
      </Window>
    </div>
  );
};

export default Form;

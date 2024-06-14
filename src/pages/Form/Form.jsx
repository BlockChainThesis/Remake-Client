import Input from '../../components/UI/Input/Input';

import { useDispatch } from 'react-redux';
import { addCropToBlockChain, initCrop, setFormData } from '../../redux/Crop/Slice';
import Window from '../../components/Interface/Layout/Window/Window';

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
    <div className="flex h-fit w-full flex-col gap-4">
      <Window label="Form">
        <div className="flex h-auto flex-col gap-6 p-4">
          <p className="w-full text-main-100/90">
            Enter your Crop Information or
            <span onClick={() => dispatch(initCrop())} className="ml-1 cursor-pointer text-main-100 underline hover:text-main-400">
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
                    w-fit self-end rounded-md bg-main-100 px-5 py-1
                    font-mono text-lg font-semibold text-primary-500
                    hover:bg-primary-400
                    hover:text-main-100 focus:outline-none
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

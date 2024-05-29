import Input from '../../UI/Input/Input';

import { useDispatch, useSelector } from 'react-redux';
import { getCropInfo, updateCropInfo } from '../../../redux/Crop/Slice';
import Window from '../Layout/Window/Window';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatDate } from '../../../utils/func';

const Crop = () => {
  const { cropId } = useParams();
  const { data: singleCropData } = useSelector((state) => state.crop.singleCrop);

  const dispatch = useDispatch();

  const [cropInfo, setCropInfo] = useState({
    cropType: '',
    plantingDate: '',
    harvestDate: 0,
    fertilizers: '',
    pesticides: '',
    diseases: '',
    additionalInfo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCropInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    dispatch(updateCropInfo({ cropId, updateData: cropInfo }));
  };

  useEffect(() => {
    dispatch(getCropInfo(cropId));
  }, [dispatch, cropId]);

  useEffect(() => {
    if (singleCropData)
      setCropInfo({
        cropType: singleCropData.cropType,
        plantingDate: singleCropData.plantingDate && formatDate(singleCropData.plantingDate),
        harvestDate: singleCropData.harvestDate,
        fertilizers: singleCropData.fertilizers,
        pesticides: singleCropData.pesticides,
        diseases: singleCropData.diseases,
        additionalInfo: singleCropData.additionalInfo,
      });
  }, [singleCropData]);

  return (
    <div className="flex h-fit w-full flex-col gap-4">
      <Window label={`Update Crop ID:${cropId}`}>
        <div className="flex h-auto flex-col gap-6 p-4">
          <form className="mt-6 grid grid-cols-4 gap-x-2 gap-y-5">
            <div className="col-span-4">
              <Input
                // className="col-span-2"
                value={cropInfo.cropType || ''}
                required={true}
                name="cropType"
                type="text"
                label="Crop Name"
                onChange={handleChange}
              />
            </div>
            <div className="col-span-4">
              <Input
                // className="col-span-2"
                value={cropInfo.plantingDate}
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
                value={cropInfo.harvestDate || ''}
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
                value={cropInfo.fertilizers || ''}
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
                value={cropInfo.pesticides || ''}
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
                value={cropInfo.diseases || ''}
                required={true}
                name="diseases"
                type="text"
                label="Diseases"
                onChange={handleChange}
              />
            </div>
            <div className="col-span-4">
              <Input value={cropInfo.additionalInfo || ''} required={true} name="additionalInfo" type="text" label="Additional Information" onChange={handleChange} />
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
            Update
          </button>
        </div>
      </Window>
    </div>
  );
};

export default Crop;
